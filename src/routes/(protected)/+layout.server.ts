import { dev } from '$app/environment';
import { getAllGroups, getMyGroups } from '$lib/server/groups';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (dev) console.log('PROTECTED LAYOUT');

	let userGroups;
	if (locals.user?.super) {
		userGroups = await getAllGroups();
	} else {
		userGroups = await getMyGroups(locals.user?.id || '');
	}

	return {
		user: locals.user,
		group: locals.group,
		roles: locals.roles,
		userGroups
	};
};
