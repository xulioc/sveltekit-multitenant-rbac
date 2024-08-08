import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('auth_users', {
	id: text('id').primaryKey(),
	email: varchar('email').unique(),
	password: text('password').notNull(),
	super: boolean('super').default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	deleted: boolean('deleted').default(false)
});

export const session = pgTable('auth_sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
