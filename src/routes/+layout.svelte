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
<Toaster richColors theme={$mode} />

{#if !dev && env.PUBLIC_UMAMI_URL && env.PUBLIC_UMAMI_WEBID}
	<UmamiAnalytics websiteID={env.PUBLIC_UMAMI_WEBID} srcURL={env.PUBLIC_UMAMI_URL} />
{/if}

<slot />
