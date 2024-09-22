import { env } from '$env/dynamic/public';
import { deleteUser } from '$lib/server/auth';
import { getUsers } from '$lib/server/groups';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await getUsers();
	return { users };
};

export const actions: Actions = {
	delete: async (event) => {
		const data = Object.fromEntries(await event.request.formData());

		// disable deletion in demo mode
		if ('PUBLIC_DEMO_MODE' in env && env.PUBLIC_DEMO_MODE == 'true') {
			return fail(403, { message: 'DISABLED IN DEMO MODE' });
		}

		try {
			await deleteUser(data.id.toString());
		} catch (e) {
			return fail(403, { message: (e as Error).message });
		}
	}
};
