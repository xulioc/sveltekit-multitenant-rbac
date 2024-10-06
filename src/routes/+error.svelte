<script lang="ts">
	import { page } from '$app/stores';
	import CleanPage from '$lib/components/CleanPage.svelte';
</script>

<CleanPage title="Error">
	{#if $page.status === 404}
		<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
			Page Not Found.
		</h1>
		<p class="max-w-[700px] text-lg text-muted-foreground">
			<a href="/" class="underline">Go Home</a>
		</p>
	{:else}
		<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
			Unexpected Error
		</h1>
		<p class="max-w-[700px] text-lg text-muted-foreground">We're investigating the issue.</p>
	{/if}

	{#if $page.error?.errorId}
		<p class="max-w-[700px] text-lg text-muted-foreground">Error ID: {$page.error.errorId}</p>
	{/if}
</CleanPage>
