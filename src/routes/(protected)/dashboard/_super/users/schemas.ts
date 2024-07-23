import { z } from 'zod';

export const newUserSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(6, { message: 'Name must be at least 6 characters' })
		.trim()
});

export type NewUserSchema = typeof newUserSchema;
