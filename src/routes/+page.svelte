<script lang="ts">
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { Button } from '$lib/components/ui/button';

	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import { LayoutDashboard } from 'lucide-svelte';
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

<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<LayoutDashboard class="h-6 w-6" />
				<span class="sr-only">Acme Inc</span>
			</a>
			{#if 'PUBLIC_APP_NAME' in env}
				{env.PUBLIC_APP_NAME}
			{:else}
				Svelte MultiTenant RBAC Dashboard
			{/if}
		</nav>

		<div class="ml-auto grid grid-flow-col gap-3">
			<Button on:click={() => goto('/auth/sign-in')}>Sign In</Button>
			<Button on:click={() => goto('/auth/sign-up')} variant="outline">Sign Up</Button>
			<LightSwitch></LightSwitch>
		</div>
	</header>
	<main class="">
		<article class="prose max-w-full bg-slate-100 p-10">
			<SvelteMarkdown source={README} />
		</article>
	</main>
</div>
