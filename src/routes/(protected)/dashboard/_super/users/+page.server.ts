import { deleteUser } from '$lib/server/auth';
import { getUsers } from '$lib/server/groups';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await getUsers();
	return { users };
};

export const actions: Actions = {
	delete: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		await deleteUser(data.id.toString());
	}
};
