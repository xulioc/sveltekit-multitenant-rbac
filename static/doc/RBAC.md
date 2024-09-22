# Role Based Access Control (RBAC)

Role Based Acces Control (RBAC) is a method of restricting data access based on a person's role within an organization and the privileges associated with that role.

## Roles & Permissions

A role is a collection of permissions that are granted to a user. The system must be configured to allow the user to access the data that they need to perform their job.

Permissions are the actions that a user can perform on a resource. For example, a user may be able to create, read, update, or delete a resource.

## RBAC in Action

Roles are statically defined as constants. You can define as many roles as you need.

```javascript
// src/lib/constants.ts
export const ROLES = [
	{ rol: 'admin', label: 'Admin' },
	{ rol: 'editor', label: 'Editor' },
	{ rol: 'user', label: 'User' },
	{ rol: 'rol1', label: 'Rol 1' },
	{ rol: 'rol2', label: 'Rol 2' }
];
```

A user that belongs to a group has one or several roles. (Multitenancy)

Permission can be defined per route or per action. For every route or action you must define which roles are allowed to access it.

```javascript
// src/lib/constants.ts

export const ROUTES_PERMISSION = [
	['/dashboard/_admin/', ['admin']],

	['/dashboard', ['admin', 'user']]
];

export const ACTIONS_PERMISSION = [
	['_admin/groups?/add', ['admin']],
	['_admin/groups?/delete', ['admin']],

	['_admin/users?/edit', ['admin']]
];
```

Permissions are checked for every access to the backend using `hooks.server.ts`

```javascript
// src/hooks.server.ts

// check route permission
if (!rbacHasPermission(event.request.url, event.locals.roles)) {
	return error(403, 'User has no permission to access this route.');
}

// check action permission
if (event.request.method == 'POST') {
	if (!rbacHasAction(event.request.url, event.locals.roles)) {
		return error(403, 'User has no permission to perform this action.');
	}
}
```

## Superusers

A superuser is a user that has all the permissions of the system. They can do anything. To enable superuser privilleges, you must set the `super` column to `true` in the users table.

For secutiry reasonbs this can be done only in the database manualy.

If user is superuser, then no permissions are checked.

```javascript
// src/hooks.server.ts

// dont check permission for super user
if (event.locals.user?.super) return resolve(event);
```
