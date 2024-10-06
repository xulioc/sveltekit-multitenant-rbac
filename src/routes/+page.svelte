<script lang="ts">
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { Button } from '$lib/components/ui/button';

	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { SIGNUP_DISABLED } from '$lib/constants';
	import { LayoutGridIcon } from 'lucide-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import README from '../../README.md?raw';
</script>

<svelte:head>
	{#if 'PUBLIC_APP_NAME' in env}
		<title>{env.PUBLIC_APP_NAME}</title>
	{:else}
		<title>Svelte MultiTenant RBAC Dashboard</title>
	{/if}
	{#if 'PUBLIC_APP_DESCRIPTION' in env}
		<meta name="description" content={env.PUBLIC_APP_DESCRIPTION} />
	{/if}
</svelte:head>

<div class="flex h-full flex-col">
	<header class="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 py-4">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a
				href="/"
				class="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground md:text-base"
			>
				<LayoutGridIcon class="h-5 w-5 transition-all group-hover:scale-75" />
			</a>

			<p class="text-xl font-semibold">
				{#if 'PUBLIC_APP_NAME' in env}
					{env.PUBLIC_APP_NAME}
				{:else}
					Svelte MultiTenant RBAC Dashboard
				{/if}
			</p>
		</nav>

		<div class="ml-auto grid grid-flow-col gap-3">
			<Button
				variant="outline"
				target="_blank"
				href="https://github.com/xulioc/sveltekit-multitenant-rbac"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-github"
					><path
						d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
					/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
				>
			</Button>

			<Button on:click={() => goto('/auth/sign-in')}>Sign In</Button>
			{#if !SIGNUP_DISABLED}
				<Button on:click={() => goto('/auth/sign-up')} variant="outline">Sign Up</Button>
			{/if}
			<LightSwitch></LightSwitch>
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 overflow-y-hidden py-2">
		<ScrollArea>
			<article class="prose max-w-full p-10 dark:prose-invert">
				<SvelteMarkdown source={README} />
			</article>
		</ScrollArea>
	</main>
</div>
