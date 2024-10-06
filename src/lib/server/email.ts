import { env } from '$env/dynamic/private';
import { APP_NAME, BASE_URL } from '$lib/constants';
import { Resend } from 'resend';

const resend = new Resend(env.PRIVATE_RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
	try {
		const response = await resend.emails.send({
			from: env.PRIVATE_RESEND_SENDER, // must be verified with Resend
			to: to,
			subject: subject,
			html: htmlContent
		});
		return response;
	} catch (e) {
		throw new Error((e as Error).message || 'Failed to send email');
	}
};

// https://github.com/delay/sveltekit-auth/blob/master/src/lib/config/email-messages.ts#L2

// Send an email to verify the user's address
export const sendVerificationEmail = async (email: string, token: string) => {
	const verifyEmailURL = `${BASE_URL}/auth/verify/email-${token}`;
	const htmlEmail = `<p>Please click this <a href="${verifyEmailURL}">link</a> to verify your email address for your ${APP_NAME} account.</p>  <p>You can also visit the link below.</p><p>${verifyEmailURL}</p><p>If you did not create this account, you can disregard this email.</p>`;
	const subject = `Please confirm your email address for ${APP_NAME}`;
	const resultSend = sendEmail(email, subject, htmlEmail);
	return resultSend;
};

// Send an email to welcome the new user
export const sendWelcomeEmail = async (email: string) => {
	const htmlEmail = `<p>Thanks for verifying your account with ${APP_NAME}.</p><p>You can now <a href="${BASE_URL}/auth/sign-in">sign in</a> to your account.</p>`;
	const subject = `Welcome to ${APP_NAME}`;
	const result = sendEmail(email, subject, htmlEmail);
	return result;
};

// Send an email to reset the user's password
export const sendPasswordResetEmail = async (to: string, token: string) => {
	const updatePasswordURL = `${BASE_URL}/auth/password/update-${token}`;
	const htmlEmail = `< p > Please click this < a href = "${updatePasswordURL}" > link < /a> to change your password for ${APP_NAME}.</p >
        <p>You can also visit the link below.< /p><p>${updatePasswordURL}</p > <p>If you did not request to change your password, you can disregard this email.</p>`;
	const subject = `Change your password for ${APP_NAME}`;
	const result = await sendEmail(to, subject, htmlEmail);
	console.log('updatePasswordURL > ', updatePasswordURL);
	return result;
};
