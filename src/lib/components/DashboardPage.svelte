<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="flex h-full flex-1 flex-col overflow-hidden p-2">
	{#if $$slots.title}
		<header class="mb-2 flex items-center">
			<div class="flex h-10 grow">
				{#if $$slots.icon}
					<!-- <div class="btn btn-icon-sm h-full variant-filled-primary"> -->
					<div class="btn btn-icon-sm h-full">
						<slot name="icon" />
					</div>
				{/if}
				<div id="title" class="ml-2 h-full w-full text-2xl font-medium">
					<slot name="title" />
				</div>
			</div>
			<div class="h-full">
				<slot name="actions" />
			</div>
		</header>
	{/if}

	<main class="h-full">
		<div class="h-full" transition:fade><slot name="content" /></div>
	</main>

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
