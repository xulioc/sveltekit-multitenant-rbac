import { getUserByToken, updateUser } from '$lib/server/auth';
import { userUpdatePasswordSchema } from '$lib/zodschemas/users';
import { redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	const updatePasswordForm = await superValidate(zod(userUpdatePasswordSchema));
	return { updatePasswordForm };
};

// https://github.com/delay/sveltekit-auth/blob/master/src/routes/auth/password/update-%5Btoken%5D/%2Bpage.server.ts
export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(userUpdatePasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const token = event.params.token as string;
			const user = await getUserByToken(token);

			if (user) {
				const newToken = crypto.randomUUID();
				const password = await new Argon2id().hash(form.data.password);
				// need to update with new token because token is also used for verification
				// and needs a new verification token in case user has not verified their account
				// and already forgot their password before verifying. Now they can get a new one resent.
				await updateUser(user.id, { token: newToken, password: password });
			} else {
				return message(form, {
					...{
						type: 'error',
						text: 'Token not found'
					}
				});
			}
		} catch (e) {
			console.error(e);
			return setError(
				form,
				'The was a problem resetting your password. Please contact support if you need further help.'
			);
		}
		redirect(302, '/auth/password/reset/success?passwordChanged');
	}
};
