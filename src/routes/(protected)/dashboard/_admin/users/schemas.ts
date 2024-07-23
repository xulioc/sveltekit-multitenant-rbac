import { z } from 'zod';

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

export type EditUserSchema = typeof editUserSchema;
