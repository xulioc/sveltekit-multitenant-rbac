import { dev } from '$app/environment';
import { lucia } from '$lib/server/auth';
import { getGroupRoles, getMyFirstGroup } from '$lib/server/groups';
import { rbacHasAction, rbacHasPermission } from '$lib/server/rbac';
import { trackEvent } from '$lib/server/tracking';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandler: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		// DELETE GROUP COOKIE
		event.cookies.delete('group', { httpOnly: false, path: '/' });
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const accessHandler: Handle = async ({ event, resolve }) => {
	if (dev) console.log('HOOKS > ', event.request.method, event.route.id);

	if (event.route.id?.startsWith('/(protected)/')) {
		if (event.locals.user && event.locals.session) {
			// read group cookie
			event.locals.group = event.cookies.get('group');

			if (!event.locals.group) {
				// user has no group cookie so get first user group from database
				const group = await getMyFirstGroup(event.locals.user.id);
				event.locals.group = group?.groupId;

				// if user dont belong to any group then return error
				if (!event.locals.group) {
					return redirect(303, '/');
					// return error(403, 'User has no group.');
				}

				// save group in cookie
				event.cookies.set('group', event.locals.group, { httpOnly: false, path: '/' });
			}

			event.locals.roles = await getGroupRoles(event.locals.user.id, event.locals.group);

			// dont check permission for super user, give admin role and resolve
			if (event.locals.user?.super) {
				event.locals.roles = ['admin'];
				return resolve(event);
			}

			// if the user has no roles in this group return error
			if (!event.locals.roles.length) {
				// event.cookies.delete('group', { httpOnly: false, path: '/' });
				return error(403, 'User has no roles in this group.');
				// TODO REDIRECT TO A SAFE PLACE
			}

			// check route permission
			if (!rbacHasPermission(event.request.url, event.locals.roles)) {
				return error(403, 'User has no permission to access this route.');
			}

			// check action permission
			if (event.request.method == 'POST') {
				if (!rbacHasAction(event.request.url, event.locals.roles)) {
					return error(403, 'User has no permission to perform this action.');
				}
			}

			// track user event
			trackEvent(event, { event: { name: 'hook', payload: event } });
		} else {
			return error(403, 'Please login to access this page.');
		}
	}
	return resolve(event);
};

export const handle = sequence(authHandler, accessHandler);
