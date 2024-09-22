import { lucia, signIn } from '$lib/server/auth';
import { logger } from '$lib/server/utils';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signInSchema } from '../schemas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		// redirect user if already signed in
		redirect(302, '/dashboard');
	}

	const signInForm = await superValidate(zod(signInSchema));
	return { signInForm };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signInSchema));
		if (!form.valid) {
			logger.error('form not valid', form);
			return fail(400, { form });
		}
		const { email, password } = form.data;
		const res = await signIn(email, password);
		if (res?.error) {
			setError(form, 'email', '');
			setError(form, 'password', '');
			return message(form, {
				...{
					type: 'error',
					text: res.error.message
				}
			});
		}

		const session = await lucia.createSession(res.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/dashboard');
	}
};
