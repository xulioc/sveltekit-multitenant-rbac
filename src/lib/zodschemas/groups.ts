import { z } from 'zod';

export const newGroupSchema = z.object({
	parent: z.string(),
	name: z
		.string({ required_error: 'Name is required' })
		.min(6, { message: 'Name must be at least 6 characters' })
		.trim(),
	logo: z.any()
});

export type NewGroupSchema = z.infer<typeof newGroupSchema>;
