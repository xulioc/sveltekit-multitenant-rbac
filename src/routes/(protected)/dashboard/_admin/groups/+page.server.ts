import { addGroup, deleteGroup, getGroups } from '$lib/server/groups';
import { logger } from '$lib/server/utils';
import { editGroupSchema, newGroupSchema, type NewGroupSchema } from '$lib/zodschemas/groups';
import type { UserSchema } from '$lib/zodschemas/users';
import type { Actions } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const groups = await getGroups(event.locals.group);
	const newGroupForm = await superValidate(zod(newGroupSchema));
	const editGroupForm = await superValidate(zod(editGroupSchema));
	return { groups, newGroupForm, editGroupForm };
};

export const actions: Actions = {
	add: async (event) => {
		const form = await superValidate(event, zod(newGroupSchema));
		if (!form.valid) {
			logger.error('form not valid', form);
			return fail(400, { form });
		}

		const parent = event.locals.group || null;
		try {
			if (event.locals.user) {
				await addGroup(event.locals.user as UserSchema, form.data as NewGroupSchema, parent);
			} else {
				throw new Error('User is null');
			}
		} catch (e) {
			return message(form, (e as Error).message, { status: 403 });
		}

		return message(form, 'Group added succesfully');
	},

	edit: async (event) => {},

	delete: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		await deleteGroup(data.id.toString());
	}
};
