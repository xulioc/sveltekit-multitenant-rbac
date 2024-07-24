import type { user } from '$lib/server/schemas';
import type { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';

export type UserSchema = InferSelectModel<typeof user>;

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

export type EditUserSchema = z.infer<typeof editUserSchema>;
