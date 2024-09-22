import { z } from 'zod';

export const editGroupSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(6, { message: 'Name must be at least 6 characters' })
		.trim(),
	settings: z.any()
});
export type EditGroupSchema = z.infer<typeof editGroupSchema>;

export const newGroupSchema = z.object({
	parent: z.string().nullable(),
	name: z
		.string({ required_error: 'Name is required' })
		.min(6, { message: 'Name must be at least 6 characters' })
		.trim(),
	logo: z.any()
});
export type NewGroupSchema = z.infer<typeof newGroupSchema>;
