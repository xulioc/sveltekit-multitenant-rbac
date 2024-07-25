<script lang="ts">
	import { fade } from 'svelte/transition';
	import Breadcrumb from './Breadcrumb.svelte';
</script>

<!-- TODO CHANGE TO SNIPPETS -->

<div class="flex h-full flex-col p-2">
	<header class="flex items-center pb-3">
		<div class="flex grow">
			<Breadcrumb />
		</div>
		<div class="h-full">
			<slot name="actions" />
		</div>
	</header>

	<main in:fade class="h-full flex-1 overflow-auto">
		<!-- <div class="box h-[2000px] border-2">HELLO</div> -->
		<slot name="content" />
	</main>

	{#if $$slots.help}
		<footer class="w-full pt-2">
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
