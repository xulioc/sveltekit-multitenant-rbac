<script lang="ts">
	import { fade } from 'svelte/transition';
	import Breadcrumb from './Breadcrumb.svelte';
</script>

<!-- TODO CHANGE TO SNIPPETS -->

<div class="flex h-full flex-1 flex-col overflow-hidden p-2">
	<header class="mb-3 flex items-center">
		<div class="flex h-10 grow">
			<Breadcrumb />
		</div>
		<div class="h-full">
			<slot name="actions" />
		</div>
	</header>

	<main class="h-full">
		<div class="h-full" in:fade><slot name="content" /></div>
	</main>

	{#if $$slots.help}
		<div class=""></div>
		<footer class="w-full pt-2">
			<slot name="help" />
		</footer>
	{/if}

	{#if $$slots.footer}
		<div class=""></div>
		<footer class="w-full pt-2">
			<slot name="footer" />
		</footer>
	{/if}
</div>

<style>
	header :global([slot='title']) {
		vertical-align: middle;
	}
</style>
