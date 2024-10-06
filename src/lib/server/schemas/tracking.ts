import { relations, type InferSelectModel } from 'drizzle-orm';
import { bigserial, json, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { group, userTable } from '.';

export const tracking = pgTable('tracking', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	event: json('info'),
	createdAt: timestamp('created_at').defaultNow(),
	createdBy: varchar('created_by').references(() => userTable.id),
	groupId: uuid('group_id')
		.notNull()
		.references(() => group.id, { onDelete: 'cascade' })
});

export type TrackingSchema = InferSelectModel<typeof tracking>;

export const trackingRelations = relations(tracking, ({ one }) => ({
	createdBy: one(userTable, {
		fields: [tracking.createdBy],
		references: [userTable.id]
	})
}));
