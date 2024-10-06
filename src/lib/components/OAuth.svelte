<script lang="ts">
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import Button from './ui/button/button.svelte';

	type Props = {
		action: string;
	};

	let { action }: Props = $props();
</script>

{#if 'PUBLIC_OAUTH_GITHUB' in env}
	<Button class="w-full" on:click={() => goto('/auth/oauth/github')}>{action} with Github</Button>
{/if}

{#if 'PUBLIC_OAUTH_GOOGLE' in env}
	<Button class="w-full" on:click={() => goto('/auth/oauth/google')}>{action} with Google</Button>
{/if}
