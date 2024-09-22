import { getGroups } from '$lib/server/groups';
import { newGroupSchema } from '$lib/zodschemas/groups';
import type { Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groups = await getGroups();
	const newGroupForm = await superValidate(zod(newGroupSchema));
	return { groups, newGroupForm };
};

export const actions: Actions = {
	add: async () => {
		console.log('please use add in _admin');
	},

	delete: async () => {
		console.log('please use delete in _admin');
	}
};
