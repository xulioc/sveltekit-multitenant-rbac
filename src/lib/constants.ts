import { Building, CalendarSearch, Home, User, Users } from 'lucide-svelte';

export const ROLES = [
	{ rol: 'admin', label: 'Admin' },
	{ rol: 'editor', label: 'Editor' },
	{ rol: 'user', label: 'User' },
	{ rol: 'rol1', label: 'Rol 1' },
	{ rol: 'rol2', label: 'Rol 2' }
];

export const ROUTES_PERMISSION = [
	['/dashboard/_admin/', ['admin']],

	['/dashboard', ['admin', 'user']]
];

export const ACTIONS_PERMISSION = [
	['_admin/groups?/add', ['admin']],
	['_admin/groups?/delete', ['admin']],

	['_admin/users?/edit', ['admin']]
];

export const MENU = {
	user: [
		{
			label: 'Home',
			id: 'home',
			dest: '/dashboard',
			icon: Home
		}
	],
	admin: [
		{
			label: 'Users (Admin)',
			id: 'users',
			dest: '/dashboard/_admin/users',
			icon: User
		},
		{
			label: 'Groups (Admin)',
			id: 'groups',
			dest: '/dashboard/_admin/groups',
			icon: Users
		},
		{
			label: 'Tracking (Admin)',
			id: 'tracking',
			dest: '/dashboard/_admin/tracking',
			icon: CalendarSearch
		}
	],
	super: [
		{
			label: 'Users (Super)',
			id: 'users_super',
			dest: '/dashboard/_super/users',
			icon: Users
		},
		{
			label: 'Groups (Super)',
			id: 'groups',
			dest: '/dashboard/_super/groups',
			icon: Building
		}
		// {
		// 	label: 'Tools',
		// 	id: 'tools',
		// 	dest: '/dashboard/_super/_tools',
		// 	icon: Wrench
		// }
	]
};
