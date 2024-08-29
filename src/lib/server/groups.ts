import { dev } from '$app/environment';
import type { NewGroupSchema } from '$lib/zodschemas/groups';
import type { UserSchema } from '$lib/zodschemas/users';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from './db';
import { group, usersToGroups } from './schemas';

// get group by id
export const getGroup = async (id: string) => {
	const group = await db.query.group.findFirst({
		where: (g, { eq }) => and(eq(g.deleted, false), eq(g.id, id))
	});
	return group;
};

// get first user group
export const getMyFirstGroup = async (userId: string) => {
	// query user groups
	const groups = await db.query.usersToGroups.findMany({
		where: (ug, { eq }) => eq(ug.userId, userId),
		with: { group: { with: { parent: true } } }
	});

	// find the first not deleted group
	const group = groups.find((g) => !g.group.deleted && !g.group.parent?.deleted);
	if (dev) console.log('getMyFirstGroup > ', group);

	return group;
};

// get user roles for a given user and group
export const getGroupRoles = async (userId: string, group: string) => {
	// query user roles in the group
	const res = await db.query.usersToGroups.findFirst({
		where: (ug, { eq }) => and(eq(ug.userId, userId), eq(ug.groupId, group))
	});

	if (res) {
		if (dev) console.log('getGroupRoles > ', res);
		return Object.values(res.roles as Array<string>);
	} else {
		return [] as Array<string>;
	}
};

// get all organization groups and return
export const getAllGroups = async () => {
	try {
		const groups = await db.query.group.findMany({
			where: (g, { eq }) => and(eq(g.deleted, false), isNull(g.parent)),
			with: { subgroups: { where: (s, { eq }) => eq(s.deleted, false) } }
		});

		const flatGroups: unknown[] = [];
		for (const g of groups) {
			flatGroups.push({
				id: g.id,
				org: null,
				name: g.name,
				label: g.name
			});
			for (const s of g.subgroups) {
				flatGroups.push({
					id: s.id,
					org: g.name,
					name: s.name,
					label: g.name + '>' + s.name
				});
			}
		}
		const orderedGroups = flatGroups.sort();
		if (dev) console.log('getAllGroups > ', orderedGroups);
		return orderedGroups;
	} catch {
		console.log('getAllGroups > ERROR');
		return null;
	}
};

// get groups for a given user
export const getMyGroups = async (userId: string) => {
	let tmp = await db.query.usersToGroups.findMany({
		where: (ug, { eq }) => eq(ug.userId, userId),
		columns: { roles: true },
		with: {
			group: {
				with: { parent: true },
				where: (g, { eq }) => eq(g.deleted, false)
			}
		}
	});

	// FIX THE QUERY TO AVOID DELETED GROUPS
	// console.log("MY GROUPS > ", tmp)
	tmp = tmp.filter((g) => g.group);
	// console.log("MY GROUPS > ", tmp)

	const groups = tmp
		.map((g) => {
			if (g.group) {
				let label;
				if (g.group?.parent) {
					label = g.group?.parent?.name + ' > ' + g.group?.name;
				} else {
					label = g.group?.name;
				}
				return {
					id: g.group?.id,
					org: g.group?.parent?.name,

					name: g.group?.name,
					roles: g.roles,
					label
				};
			} else {
				return null;
			}
		})
		.sort((a, b) => a.label - b.label); // b - a for reverse sort

	if (dev) console.log('getMyGroups > ', groups);
	return groups;
};

// get groups given a parent group
export const getGroups = async (parent: string | null = null) => {
	try {
		let groups;
		// if parent is null then look for organizations
		if (parent) {
			groups = await db.query.group.findMany({
				where: (group, { eq }) => and(eq(group.deleted, false), eq(group.parent, parent)),
				with: {
					createdBy: { columns: { email: true } },
					subgroups: {
						where: (group, { eq }) => eq(group.deleted, false),
						with: { createdBy: { columns: { email: true } } }
					}
				}
			});
		} else {
			groups = await db.query.group.findMany({
				where: (group, { eq }) => and(eq(group.deleted, false), isNull(group.parent)),
				with: {
					createdBy: { columns: { email: true } },
					subgroups: {
						where: (group, { eq }) => eq(group.deleted, false),
						with: {
							createdBy: { columns: { email: true } }
						}
					}
				}
			});
		}

		if (dev) console.log('getGroups > ', groups);
		return groups;
	} catch (e) {
		console.log('getGroups > ', (e as Error).message);
		return { error: (e as Error).message };
	}
};

// add group to a given user and parent
export const addGroup = async (
	user: UserSchema,
	newGroup: NewGroupSchema,
	parent: string | null
) => {
	let res;

	// console.log(user, newGroup, parent);

	// create group
	res = await db
		.insert(group)
		.values({
			parent: parent,
			name: newGroup.name,
			logo: newGroup.logo,
			createdBy: user.id
		})
		.returning({ id: group.id });

	const groupId = res[0].id;

	// give admin role to creator
	res = await db
		.insert(usersToGroups)
		.values({
			userId: user.id,
			groupId: groupId,
			roles: ['admin']
		})
		.returning();
	console.log(res);

	return {};
};

// mark group as deleted
export const deleteGroup = async (id: string) => {
	const res = await db.update(group).set({ deleted: true }).where(eq(group.id, id));
	if (dev) console.log('deleteGroup > ', res);
};

// get users for a given group
export const getUsers = async (group: string | null = null) => {
	let users: unknown[] = [];

	if (group) {
		// read group users
		// console.log('read group users');
		users = await db.query.usersToGroups.findMany({
			where: (ug, { eq }) => eq(ug.groupId, group),
			with: { user: { columns: { password: false } } }
		});
		users = users.map((g) => {
			return { id: g.user.id, email: g.user.email, roles: g.roles };
		});
	} else {
		// read all users
		// console.log('read all users');
		users = await db.query.user.findMany({
			where: (user, { eq }) => eq(user.deleted, false),
			columns: { password: false }
		});
	}

	if (dev) console.log('getUsers > ', users);
	return users;
};

// add user to current group
export const addUserToGroup = async (groupId: string, form) => {
	try {
		if (groupId) {
			const res = await db
				.insert(usersToGroups)
				.values({
					userId: form.data.id,
					groupId: groupId,
					roles: [] //no roles but belogs to group
				})
				.returning();
			if (dev) console.log('addUserToGroup > ', res);
		}
		return {};
	} catch (e) {
		console.log('addUserToGroup > ', (e as Error).message);
		return { error: { message: (e as Error).message } };
	}
};

// remove user from current group
export const removeUserFromGroup = async (form) => {
	try {
		const res = await db.delete(usersToGroups).where(eq(usersToGroups.userId, form.data.id));
		console.log(res);
		return {};
	} catch (e) {
		console.log('removeUserFromGroup > ', (e as Error).message);
		return { error: { message: (e as Error).message } };
	}
};

// eddir user roles in a group
export const editGroupRoles = async (user: string, group: string, roles: string[]) => {
	const res = await db
		.update(usersToGroups)
		.set({ roles })
		.where(and(eq(usersToGroups.userId, user), eq(usersToGroups.groupId, group)))
		.returning();
	if (dev) console.log('editGroupRoles > ', res);
	return {};
};
