<script lang="ts">
	import { fade } from 'svelte/transition';
	import Breadcrumb from './Breadcrumb.svelte';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
</script>

<!-- TODO CHANGE TO SNIPPETS -->

<div class="flex h-full flex-col p-2" in:fade>
	{#if $$slots.actions}
		<header class="flex items-center pb-3">
			<div class="flex grow">
				<Breadcrumb />
			</div>
			<div class="h-full">
				<slot name="actions" />
			</div>
		</header>
	{/if}

	<ScrollArea>
		<main in:fade class="h-full">
			<slot name="content" />
		</main>
	</ScrollArea>

	{#if $$slots.help}
		<footer class="mt-auto w-full pt-2">
			<slot name="help" />
		</footer>
	{/if}

	<!-- {#if $$slots.footer}
		<div class=""></div>
		<footer class="w-full pt-2">
			<slot name="footer" />
		</footer>
	{/if} -->
</div>

<style>
	header :global([slot='title']) {
		vertical-align: middle;
	}
</style>
