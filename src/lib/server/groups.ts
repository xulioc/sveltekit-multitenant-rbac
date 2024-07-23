import { and, eq, isNull } from 'drizzle-orm';
import { db } from './db';
import { group, usersToGroups } from './schemas';

export const getMyFirstGroup = async (userId: string) => {
	const groups = await db.query.usersToGroups.findMany({
		where: (ug, { eq }) => eq(ug.userId, userId),
		with: {
			group: {
				with: { parent: true }
			}
		}
	});

	const group = groups.find((g) => !g.group.deleted && !g.group.parent?.deleted);
	console.log('getMyFirstGroup > ', group);
	return group;
};

export const getGroupRoles = async (userId: string, group: string) => {
	const res = await db.query.usersToGroups.findFirst({
		where: (ug, { eq }) => and(eq(ug.userId, userId), eq(ug.groupId, group))
	});
	// console.log(res)
	if (res) {
		return Object.values(res.roles as Array<string>);
	}

	return [] as Array<string>;
};

export const getAllGroups = async () => {
	try {
		const groups = await db.query.group.findMany({
			where: (g, { eq }) => and(eq(g.deleted, false), isNull(g.parent)),
			with: {
				subgroups: {
					where: (s, { eq }) => eq(s.deleted, false)
				}
			}
		});
		// console.log("GROUPS>", groups)
		const flatGroups: any[] = [];
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
		// console.log("GROUPS>", flatGroups)
		const orderedGroups = flatGroups.sort();
		// console.log("GROUPS>", orderedGroups)
		return orderedGroups;
	} catch {
		return null;
	}
};

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

	return groups;
};

export const getGroups = async (parent: string | null = null) => {
	try {
		let groups;
		// IF PARENT IS NULL THEN LOOK FOR ORGS
		if (parent) {
			groups = await db.query.group.findMany({
				where: (group, { eq }) => and(eq(group.deleted, false), eq(group.parent, parent)),
				with: {
					createdBy: {
						columns: { email: true }
					},
					subgroups: {
						where: (group, { eq }) => eq(group.deleted, false),
						with: {
							createdBy: {
								columns: { email: true }
							}
						}
					}
				}
			});
		} else {
			groups = await db.query.group.findMany({
				where: (group, { eq }) => and(eq(group.deleted, false), isNull(group.parent)),
				with: {
					createdBy: {
						columns: { email: true }
					},
					subgroups: {
						where: (group, { eq }) => eq(group.deleted, false),
						with: {
							createdBy: {
								columns: { email: true }
							}
						}
					}
				}
			});
		}

		// for (const g of groups) {
		// 	console.log('GROUP >', g)
		// 	console.log('SUB >', g.subgroups)
		// }

		return groups;
	} catch (e) {
		dbg(e.message);
		return { error: e.message };
	}
};

export const addGroup = async (user: any, newGroup: any, parent: string | null) => {
	let res;

	console.log(user, newGroup, parent);

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

	// res = await createBucket(groupId);
	// console.log('BUCKET>', res);

	return {};
};

export const deleteGroup = async (id: string) => {
	// MARK AS DELETED
	const res = await db.update(group).set({ deleted: true }).where(eq(group.id, id));
	// console.log(res);
};

export const getUsers = async (group: string | null = null) => {
	let users: any;

	if (group) {
		// READING GROUP USERS
		console.log('read group users');
		users = await db.query.usersToGroups.findMany({
			where: (ug, { eq }) => eq(ug.groupId, group),
			with: {
				user: {
					columns: {
						password: false
					}
				}
			}
		});
		console.log(users);
		users = users.map((g) => {
			return { id: g.user.id, email: g.user.email, roles: g.roles };
		});
	} else {
		// READING ALL USERS
		console.log('read all users');
		users = await db.query.user.findMany({
			columns: {
				password: false
			}
		});
		console.log(users);
	}
	// dbg(users)
	return users;
};

export const addUserToGroup = async (event, form) => {
	try {
		const res = await db
			.insert(usersToGroups)
			.values({
				userId: form.data.id,
				groupId: event.locals.group,
				roles: [] //no roles but belogs to group
			})
			.returning();
		console.log(res);
		return {};
	} catch (e) {
		// dbg(e.message);
		return { error: { message: e.message } };
	}
};

export const removeUserFromGroup = async (event, form) => {
	try {
		const res = await db.delete(usersToGroups).where(eq(usersToGroups.userId, form.data.id));
		console.log(res);
		return {};
	} catch (e) {
		dbg(e.message);
		return { error: { message: e.message } };
	}
};

export const editGroupRoles = async (user: string, group: string, roles: string[]) => {
	const res = await db
		.update(usersToGroups)
		.set({ roles })
		.where(and(eq(usersToGroups.userId, user), eq(usersToGroups.groupId, group)))
		.returning();
	console.log(res);
	return {};
};
