<script lang="ts">
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { Button } from '$lib/components/ui/button';

	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
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
			<Button on:click={() => goto('/auth/sign-in')}>Sign In</Button>
			<Button on:click={() => goto('/auth/sign-up')} variant="outline">Sign Up</Button>
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
