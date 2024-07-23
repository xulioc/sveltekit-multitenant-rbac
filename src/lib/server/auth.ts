import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { generateId, Lucia } from 'lucia';

import { Argon2id } from 'oslo/password';
import { db } from './db';
import { addGroup } from './groups';
import { session, user, type UserSchema } from './schemas';

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

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
		DatabaseUserAttributes: UserSchema;
	}
}

export const signUp = async (email: string, password: string) => {
	// try {

	const userId = generateId(15);
	const hashedPassword = await new Argon2id().hash(password);
	const newUser = await db
		.insert(user)
		.values({
			id: userId,
			email,
			password: hashedPassword
		})
		.returning();

	if (newUser.length === 0) {
		return { error: { message: 'User not created' } };
	}

	console.log(newUser[0]);

	const org = await addGroup(newUser[0], { name: newUser[0].email }, null);
	console.log(org);

	// }

	// } catch (e) {
	//     if (e instanceof LuciaError) {
	//         return { error: { message: e.message } };
	//     } else {
	//         return { error: { message: 'UNKNOWN ERROR' } };
	//     }
	// }
	return { id: newUser[0].id };
};

export const signIn = async (email: string, password: string) => {
	// try {
	const user = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.email, email)
	});

	if (!user) {
		return { error: { message: 'User not found' } };
	}
	console.log(user);

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
