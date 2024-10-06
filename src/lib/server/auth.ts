import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import {
	PRIVATE_OAUTH_GITHUB_CLIENT_ID,
	PRIVATE_OAUTH_GITHUB_CLIENT_SECRET,
	PRIVATE_OAUTH_GOOGLE_CLIENT_ID,
	PRIVATE_OAUTH_GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub, Google } from 'arctic';
import { eq } from 'drizzle-orm';
import { generateId, Lucia } from 'lucia';
import { Argon2id } from 'oslo/password';
import type { PostgresError } from 'postgres';
import { db } from './db';
import { addGroup } from './groups';
import { sessionTable, userTable, type UpdateUser, type User } from './schemas';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (data) => {
		return {
			email: data.email,
			super: data.super
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: User;
	}
}

export const github = new GitHub(
	PRIVATE_OAUTH_GITHUB_CLIENT_ID,
	PRIVATE_OAUTH_GITHUB_CLIENT_SECRET
);
export const google = new Google(
	PRIVATE_OAUTH_GOOGLE_CLIENT_ID,
	PRIVATE_OAUTH_GOOGLE_CLIENT_SECRET,
	'/auth/oauth/google/callback'
);

export const signUp = async (
	email: string,
	password: string | null,
	githubId: number | null = null
) => {
	try {
		const userId = generateId(15);
		const hashedPassword = password ? await new Argon2id().hash(password) : null;
		let superUser = false;
		let verified = true;

		if ('PUBLIC_DEMO_MODE' in env && env.PUBLIC_DEMO_MODE == 'true') {
			superUser = true;
		}

		if ('PRIVATE_VERIFY_USER' in env && env.PRIVATE_VERIFY_USER == 'true') {
			verified = false;
		}

		const newUser = await db
			.insert(userTable)
			.values({
				id: userId,
				email,
				password: hashedPassword,
				githubId,
				verified,
				super: superUser
			})
			.returning();

		if (newUser.length === 0) {
			return { error: { message: 'User not created' } };
		}

		if (dev) console.log(newUser[0]);

		// create default organization for user with email as organization name
		const org = await addGroup(newUser[0], { name: newUser[0].email }, null);
		if (dev) console.log(org);

		return { id: newUser[0].id };
	} catch (e) {
		// console.log(e)
		if (e instanceof Error) {
			if ((e as PostgresError).code === '23505') {
				return { error: { message: 'User already exists' } };
			} else {
				return { error: { message: e.message } };
			}
		} else {
			return { error: { message: 'UNKNOWN ERROR' } };
		}
	}
};

export const signIn = async (email: string, password: string) => {
	// try {
	const user = await db.query.userTable.findFirst({
		where: (user, { eq }) => eq(user.email, email)
	});

	if (!user) {
		return { error: { message: 'User not found' } };
	}
	if (dev) console.log(user);

	if (!user.password) {
		return { error: { message: 'Password not set' } };
	}

	const validPassword = await new Argon2id().verify(user.password, password);

	if (!validPassword) {
		return { error: { message: 'Wrong Password' } };
	}

	// console.log('pass ok');

	// } catch (e) {
	//     console.log(e)
	//     // if (e instanceof LuciaError) {
	//     //     return { error: { message: e.message } };
	//     // } else {
	//     return { error: { message: 'UNKNOWN ERROR' } };
	//     // }
	// }

	return { id: user.id };
};

export const getUserByEmail = async (email: string) => {
	const user = await db.query.userTable.findFirst({
		where: (user, { eq }) => eq(user.email, email)
	});
	console.log(user);

	return user;
};

export const getUserByToken = async (token: string) => {
	const user = await db.query.userTable.findFirst({
		where: (user, { eq }) => eq(user.token, token)
	});
	console.log(user);

	return user;
};

export const updateUser = async (id: string, user: UpdateUser) => {
	const result = await db.update(userTable).set(user).where(eq(userTable.id, id)).returning();
	if (result.length === 0) {
		return null;
	} else {
		console.log('updated user > ', result[0]);
		return result[0];
	}
};

export const updateUserToken = async (id: string, user: UpdateUser) => {
	const result = await db.update(userTable).set(user).where(eq(userTable.id, id)).returning();
	if (result.length === 0) {
		return null;
	} else {
		console.log('updated user > ', result[0]);
		return result[0];
	}
};

export const deleteUser = async (userId: string) => {
	// mark user as deleted
	const res = await db.update(userTable).set({ deleted: true }).where(eq(user.id, userId));
	if (dev) console.log('deleteUser > ', res);
};
