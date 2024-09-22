# Multitenancy

> Mutitencncy is a software architecture in which a single instance of software runs on a server and serves multiple tenants. Systems designed in such manner are "shared" (rather than "dedicated" or "isolated"). A tenant is a group of users who share a common access with specific privileges to the software instance. [Wikipedia](https://en.wikipedia.org/wiki/Multitenancy)

## Users, Groups and Organizations

Users are the main actors in a multitenant system. They are the ones who log in and use the system.

Users are defined in the database as a table with the following columns:

```javascript
// src/lib/server/schemas/auth.ts

export const user = pgTable('auth_users', {
	id: text('id').primaryKey(),
	email: varchar('email').unique(),
	password: text('password').notNull(),
	super: boolean('super').default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
```

Groups (aka tenants) are the main way to organize users in a multitenant system. Every user belongs to one or several groups.

Groups are defined in the database as a table with the following columns:

```javascript
// src/lib/server/schemas/groups.ts

export const group = pgTable('groups', {
	id: uuid('id').primaryKey().defaultRandom(),
	parent: uuid('parent_id'),
	name: text('name').notNull().unique(),
	logo: text('logo'),
	createdAt: timestamp('created_at').defaultNow(),
	createdBy: varchar('created_by').references(() => user.id),
	deleted: boolean('deleted').default(false)
});
```

Users may have diferent roles in different groups. For example, a user may be an admin in one group and a regular user in another group. The system checks the user's roles in each group and let him access data and excecute the actions that are allowed for his roles. [(RBAC)](https://github.com/xulioc/sveltekit-multitenant-rbac/blob/main/static/doc/RBAC.md)

Groups, users and roles are linked in a many-to-many relationship. This is done with a table that has two foreign keys, one for each table.

```javascript
// src/lib/server/schemas/groups.ts

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
```

Organizations are a special type of group. They are used to organize users in a hierarchical way. Organizations are groups with no parent `(parent=null)`.

## Data isolation

In a multitennant system, the data shares the same database, so every row must have a column that identifies the group. This column is used to filter the data that the user can see.

When reading data, the system checks the user's groups and filters the data that belongs to those groups.

For example when reading users that belongs to a group, the system will filter the data to only show the users that belong to the group.

```javascript
// src/lib/server/groups.ts

users = await db.query.usersToGroups.findMany({
	where: (ug, { eq }) => eq(ug.groupId, group)
});
```
