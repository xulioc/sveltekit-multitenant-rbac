import { dev } from '$app/environment';
import { getAllGroups, getGroup, getMyGroups } from '$lib/server/groups';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (dev) console.log('PROTECTED LAYOUT');

	// read all user groups to show in group select
	let userGroups;
	if (locals.user?.super) {
		userGroups = await getAllGroups();
	} else {
		userGroups = await getMyGroups(locals.user?.id || '');
	}

	// read current group
	const userGroup = await getGroup(locals.group || '');
	// console.log('userGroup > ', userGroup)

	return {
		user: locals.user,
		group: locals.group,
		roles: locals.roles,
		userGroups,
		userGroup
	};
};
