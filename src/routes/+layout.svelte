<script lang="ts">
	import { dev } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { PUBLIC_UMAMI_URL, PUBLIC_UMAMI_WEBID } from '$env/static/public';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
</script>

<ModeWatcher />
<Toaster richColors theme={$mode} />

{#if !dev && 'PUBLIC_UMAMI_URL' in env}
	<UmamiAnalytics websiteID={PUBLIC_UMAMI_WEBID} srcURL={PUBLIC_UMAMI_URL} />
{/if}

<slot />
