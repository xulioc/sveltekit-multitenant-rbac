import { addGroup, deleteGroup, getGroups } from '$lib/server/groups';
import { logger } from '$lib/server/utils';
import type { Actions } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { newGroupSchema } from './schemas';

export const load: PageServerLoad = async (event) => {
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
		let res;
		try {
			res = await addGroup(event.locals.user, form.data, parent);
		} catch (err: any) {
			// console.log(err);
			return message(form, err.message, {
				status: 403
			});
		}

		return message(form, 'Group added succesfully');

		// if (res.error) {
		// 	console.log(res.error.message);
		// 	return setError(form, null, res.error.message);
		// }
		// return message(form, 'Organization created succesfully');
	},

	delete: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		// console.log(data);
		await deleteGroup(data.id.toString());
	}
};
