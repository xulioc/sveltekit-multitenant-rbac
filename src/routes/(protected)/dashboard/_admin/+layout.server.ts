import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// if (locals.user?.super || locals.roles.includes('admin')) {
	if (locals.roles.includes('admin')) {
		// console.log("you are admin")
		//
	} else {
		error(403);
	}
};
