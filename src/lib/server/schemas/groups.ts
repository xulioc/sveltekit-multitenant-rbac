import { eq, relations, type InferSelectModel } from 'drizzle-orm';
import {
	boolean,
	json,
	pgTable,
	pgView,
	primaryKey,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';
import { userTable } from './auth';

export const group = pgTable('groups', {
	id: uuid('id').primaryKey().defaultRandom(),
	parent: uuid('parent_id'),
	name: text('name').notNull().unique(), // if name is unique then we have issue with softdelete
	logo: text('logo'),
	settings: json('settings').default({}),
	createdAt: timestamp('created_at').defaultNow(),
	createdBy: varchar('created_by').references(() => userTable.id),
	deleted: boolean('deleted').default(false)
});

export const groupView = pgView('groups').as((qb) =>
	qb.select().from(group).where(eq(group.deleted, false))
);

export type GroupSchema = InferSelectModel<typeof group>;

export const groupsRelations = relations(group, ({ one, many }) => ({
	parent: one(group, {
		fields: [group.parent],
		references: [group.id],
		relationName: 'subgroups'
	}),
	createdBy: one(userTable, {
		fields: [group.createdBy],
		references: [userTable.id]
	}),
	subgroups: many(group, { relationName: 'subgroups' })
}));

export const usersToGroups = pgTable(
	'users_groups',
	{
		userId: varchar('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' }),
		groupId: uuid('group_id')
			.notNull()
			.references(() => group.id, { onDelete: 'cascade' }),
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
	user: one(userTable, {
		fields: [usersToGroups.userId],
		references: [userTable.id],
		relationName: 'user'
	})
}));
