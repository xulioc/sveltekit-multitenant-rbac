<script lang="ts">
	import { dev } from '$app/environment';
	import { env } from '$env/dynamic/public';

	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
</script>

<LoadingBar />
<ModeWatcher />
<Toaster
	theme={$mode}
	position="top-center"
	expand={true}
	toastOptions={{
		// unstyled: true,
		// https://github.com/emilkowalski/sonner/issues/4
		// style: 'width:fit-content;', // not working
		classes: {
			error: 'bg-error text-error-foregroung rounded-none', //red
			success: ' bg-success text-success-foreground rounded-none', //green
			warning: 'bg-warning text-warning-foreground rounded-none', //orange
			info: 'bg-info text-info-foreground rounded-none' // blue
		}
	}}
/>

{#if !dev && env.PUBLIC_UMAMI_URL && env.PUBLIC_UMAMI_WEBID}
	<UmamiAnalytics websiteID={env.PUBLIC_UMAMI_WEBID} srcURL={env.PUBLIC_UMAMI_URL} />
{/if}

<slot />
