import { boolean, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('auth_users', {
	id: text('id').primaryKey(),
	email: varchar('email').unique(),
	password: text('password'),
	githubId: integer('github_id').unique(),
	verified: boolean('verified').notNull().default(false),
	token: text('token').unique(),
	super: boolean('super').default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	deleted: boolean('deleted').default(false)
});

export const sessionTable = pgTable('auth_sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof userTable.$inferInsert;
export type UpdateUser = Partial<typeof userTable.$inferInsert>;
export type Session = typeof sessionTable.$inferInsert;
