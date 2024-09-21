<script lang="ts">
	import { fade } from 'svelte/transition';
	import Breadcrumb from './Breadcrumb.svelte';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';

	let { actions, content, footer } = $props();
</script>

<div class="flex h-full flex-col p-2" in:fade>
	{#if actions}
		<header class="flex items-center pb-3">
			<div class="flex grow">
				<Breadcrumb />
			</div>
			<div class="h-full">
				{@render actions()}
			</div>
		</header>
	{/if}

	<ScrollArea>
		<main in:fade class="h-full">
			{@render content()}
		</main>
	</ScrollArea>

	{#if footer}
		<footer class="mt-auto w-full pt-2">
			{@render footer()}
		</footer>
	{/if}
</div>

<style>
	header :global([slot='title']) {
		vertical-align: middle;
	}
</style>
