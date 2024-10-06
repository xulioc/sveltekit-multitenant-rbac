import { z } from 'zod';

// https://github.com/delay/sveltekit-auth/blob/master/src/lib/config/zod-schemas.ts
export const userSchema = z.object({
	// firstName: z
	// 	.string({ required_error: 'First Name is required' })
	// 	.min(1, { message: 'First Name is required' })
	// 	.trim(),
	// lastName: z
	// 	.string({ required_error: 'Last Name is required' })
	// 	.min(1, { message: 'Last Name is required' })
	// 	.trim(),
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
		.trim(),
	//terms: z.boolean({ required_error: 'You must accept the terms and privacy policy' }),
	// role: z
	// 	.enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
	// 	.default('USER'),
	verified: z.boolean().default(false),
	// terms: z.literal<boolean>(true, {
	// 	errorMap: () => ({ message: "You must accept the terms & privacy policy" }),
	// }),
	token: z.string().optional(),
	receiveEmail: z.boolean().default(true)
	// createdAt: z.date().optional(),
	// updatedAt: z.date().optional()
});

export type UserSchema = typeof userSchema;

export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

export type UserUpdatePasswordSchema = typeof userUpdatePasswordSchema;

// export type UserSchema = InferSelectModel<typeof user>;

export const editUserSchema = z.object({
	id: z.string(),
	roles: z.array(z.string())
});

export const addUserSchema = z.object({
	id: z.string()
});

export const removeUserSchema = z.object({
	id: z.string()
});

export const inviteUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' })
});

export const newUserSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(6, { message: 'Name must be at least 6 characters' })
		.trim()
});

// export const userUpdatePasswordSchema = userSchema
// 	.pick({ password: true, confirmPassword: true })
// 	.superRefine(({ confirmPassword, password }, ctx) => {
// 		if (confirmPassword !== password) {
// 			ctx.addIssue({
// 				code: 'custom',
// 				message: 'Password and Confirm Password must match',
// 				path: ['password']
// 			});
// 			ctx.addIssue({
// 				code: 'custom',
// 				message: 'Password and Confirm Password must match',
// 				path: ['confirmPassword']
// 			});
// 		}
// 	});

export type NewUserSchema = typeof newUserSchema;

export type EditUserSchema = z.infer<typeof editUserSchema>;
