import { google } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { generateCodeVerifier, generateState } from 'arctic';

// https://lucia-auth.com/tutorials/github-oauth/sveltekit

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/dashboard');
	}

	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url: URL = await google.createAuthorizationURL(state, codeVerifier, {
		// optional
		scopes: ['user:email']
	});

	event.cookies.set('google_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10
	});

	event.cookies.set('google_code_verifier', codeVerifier, {
		secure: true, // set to false in localhost
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	redirect(302, url.toString());
};
