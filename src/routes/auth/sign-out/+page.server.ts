import { lucia } from '$lib/server/auth';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// DELETE GROUP COOKIE
		event.cookies.delete('group', { httpOnly: false, path: '/' });

		redirect(302, '/');
	}
};
