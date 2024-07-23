import { relations } from 'drizzle-orm';
import {
	boolean,
	json,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';
import { user } from './auth';

export const group = pgTable('groups', {
	id: uuid('id').primaryKey().defaultRandom(),
	parent: uuid('parent_id'),
	name: text('name').notNull().unique(),
	logo: text('logo'),
	createdAt: timestamp('created_at').defaultNow(),
	createdBy: varchar('created_by').references(() => user.id),
	deleted: boolean('deleted').default(false)
});

export const groupsRelations = relations(group, ({ one, many }) => ({
	parent: one(group, {
		fields: [group.parent],
		references: [group.id],
		relationName: 'subgroups'
	}),
	createdBy: one(user, {
		fields: [group.createdBy],
		references: [user.id]
	}),
	subgroups: many(group, { relationName: 'subgroups' })
}));

export const usersToGroups = pgTable(
	'users_groups',
	{
		userId: varchar('user_id')
			.notNull()
			.references(() => user.id),
		groupId: uuid('group_id')
			.notNull()
			.references(() => group.id),
		roles: json('roles')
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.groupId] })
	})
);

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
	group: one(group, {
		fields: [usersToGroups.groupId],
		references: [group.id],
		relationName: 'group'
	}),
	user: one(user, {
		fields: [usersToGroups.userId],
		references: [user.id],
		relationName: 'user'
	})
}));
