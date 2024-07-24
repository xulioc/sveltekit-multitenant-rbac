<script lang="ts">
	import { Ban } from 'lucide-svelte';

	export let logo: string | undefined = undefined;
</script>

<div class="flex h-10 w-36 items-center justify-center border-2">
	{#if logo}
		<img alt="logo" src={logo} />
	{:else}
		<Ban />
	{/if}
</div>
