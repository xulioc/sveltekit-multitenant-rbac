import { dev } from '$app/environment';
import { ACTIONS_PERMISSION, ROUTES_PERMISSION } from '$lib/constants';
import type { Roles } from '$lib/types';

// check if the given roles have permission for the given route
export const rbacHasPermission = (route: string, roles: Roles) => {
	if (dev) console.log('rbacHasPermission >', route, roles);
	const a = ROUTES_PERMISSION.find((a) => route.includes(a[0] as string));
	if (a) {
		// console.log('ROUTE FOUND >', a);
		// return roles.some((r) => a[1].includes(r)) || a[1].includes('all');
		return roles.some((r) => a[1].includes(r));
	}
	if (dev) console.log('RBAC ROUTE FORBIDDEN');
	return false;
};

// check if the given roles have permission for the given action
export const rbacHasAction = (action: string, roles: Roles) => {
	if (dev) console.log('rbacHasAction >', action, roles);
	const a = ACTIONS_PERMISSION.find((a) => action.includes(a[0] as string));
	if (a) {
		// console.log('ACTION FOUND >', a);
		return roles.some((r) => a[1].includes(r));
	}
	if (dev) console.log('RBAC ACTION FORBIDDEN');
	return false;
};
