import { addGroup, deleteGroup, getGroups } from '$lib/server/groups';
import { newGroupSchema, type NewGroupSchema, type UserSchema } from '$lib/server/schemas';
import { logger } from '$lib/server/utils';
import type { Actions } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groups = await getGroups();
	const newGroupForm = await superValidate(zod(newGroupSchema));
	return { groups, newGroupForm };
};

export const actions: Actions = {
	add: async (event) => {
		console.log('groups actions add');

		const form = await superValidate(event, zod(newGroupSchema));
		if (!form.valid) {
			logger.error('form not valid', form);
			return fail(400, { form });
		}

		const parent = form.data.parent == '' ? null : form.data.parent;
		try {
			await addGroup(event.locals.user as UserSchema, form.data as NewGroupSchema, parent);
		} catch (e) {
			return message(form, (e as Error).message, {
				status: 403
			});
		}

		return message(form, 'Group added succesfully');
	},

	delete: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		// console.log(data);
		await deleteGroup(data.id.toString());
	}
};
