import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user?.super) {
		//
	} else {
		error(403);
	}
};