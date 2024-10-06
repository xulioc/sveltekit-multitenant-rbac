// routes/login/github/callback/+server.ts
import { github, lucia, signUp } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';

import { db } from '$lib/server/db';
import type { RequestEvent } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';

export async function GET(event: RequestEvent): Promise<Response> {
	console.log('GITHUB');

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		console.log('ERROR');
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		console.log('tokens > ', tokens);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const githubUserEmailsResponse = await fetch('https://api.github.com/user/emails', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUserEmails = await githubUserEmailsResponse.json();
		const userEmail = githubUserEmails.find((e) => e.primary && e.verified);

		console.log('githubUser > ', githubUser);
		console.log('githubUserEmail > ', githubUserEmails);
		console.log('userEmail > ', userEmail);

		// Replace this with your own DB client.
		// const existingUser = await db.table("user").where("github_id", "=", githubUser.id).get();
		const existingUser = await db.query.userTable.findFirst({
			where: (user, { eq }) => eq(user.githubId, githubUser.id)
		});

		console.log('existingUser > ', existingUser);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			// const userId = generateIdFromEntropySize(10); // 16 characters long
			const userId = generateIdFromEntropySize(15);

			const newUser = await signUp(userEmail.email, null, githubUser.id);

			console.log('newUser > ', newUser);

			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/dashboard'
			}
		});
	} catch (e) {
		console.log(e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GitHubUser {
	id: number;
	login: string;
}
