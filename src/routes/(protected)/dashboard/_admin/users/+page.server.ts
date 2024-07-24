import { addUserToGroup, editGroupRoles, getUsers, removeUserFromGroup } from '$lib/server/groups';
import { fail, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, setError, superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';
import { addUserSchema, editUserSchema, removeUserSchema } from './schemas';

export const load: PageServerLoad = async (event) => {
	const addUserForm = await superValidate(zod(addUserSchema));
	const editUserForm = await superValidate(zod(editUserSchema));
	const users = await getUsers(event.locals.group);
	return { users, addUserForm, editUserForm };
};

export const actions: Actions = {
	add: async (event) => {
		console.log('add');
		const form = await superValidate(event, zod(addUserSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log(form);
		const res = await addUserToGroup(event.locals.group || '', form);
		// const res = null
		if (res.error) {
			console.log(res.error.message);
			return setError(form, null, res.error.message);
		}
		return message(form, 'User added succesfully');
	},

	edit: async (event) => {
		console.log('edit');
		const form = await superValidate(event, zod(editUserSchema));
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		}

		const res = await editGroupRoles(form.data.id, event.locals.group || '', form.data.roles);
		// const res = null
		if (res.error) {
			console.log(res.error.message);
			return setError(form, null, res.error.message);
		}
		return message(form, 'User saved succesfully');
	},

	remove: async (event) => {
		console.log('remove');
		const form = await superValidate(zod(removeUserSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log(form);
		const res = await removeUserFromGroup(form);
		if (res.error) {
			console.log(res.error.message);
			return setError(form, null, res.error.message);
		}
		return message(form, 'User removed succesfully');
	}
};
