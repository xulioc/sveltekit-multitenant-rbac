import { github } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';

// https://lucia-auth.com/tutorials/github-oauth/sveltekit

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/dashboard');
	}

	const state = generateState();
	const url = await github.createAuthorizationURL(state, {
		scopes: ['user:email']
	});

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
};
