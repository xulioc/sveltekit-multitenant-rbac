import { getUserByEmail, updateUserToken } from '$lib/server/auth';
import { sendPasswordResetEmail } from '$lib/server/email';
import { redirect } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { resetPasswordSchema } from '../../schemas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const resetPasswordForm = await superValidate(zod(resetPasswordSchema));
	return { resetPasswordForm };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(resetPasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await getUserByEmail(form.data.email);
			if (!user) {
				console.log('user not found');
				// setError(form, 'The email address does not have an account.');
				return message(form, {
					...{
						type: 'error',
						text: 'The email address does not have an account.'
					}
				});
			}
			console.log('reset user password');
			const token = crypto.randomUUID();
			await updateUserToken(user.id, { token: token });
			await sendPasswordResetEmail(user.email, token);
		} catch (e) {
			console.error(e);
			return setError(
				form,
				'The was a problem resetting your password. Please contact support if you need further help.'
			);
		}
		redirect(302, '/auth/password/reset/success?emailSent');
	}
};
