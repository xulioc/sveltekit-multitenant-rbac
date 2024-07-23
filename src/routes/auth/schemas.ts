import { z } from 'zod';

export const authSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim()
});

export const signInSchema = authSchema.pick({
	email: true,
	password: true
});

export const signUpSchema = authSchema
	.pick({ email: true, password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			// ctx.addIssue({
			// 	code: 'custom',
			// 	message: 'Password and Confirm Password must match',
			// 	path: ['password']
			// });
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

export const inviteSchema = authSchema.pick({
	email: true
});
