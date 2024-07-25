<script lang="ts">
	import Menu from './Menu.svelte';
	import Navigation from './Navigation.svelte';
</script>

<div class="h-full w-full flex-row bg-muted/40">
	<Menu />
	<div class="flex h-full flex-col sm:pl-14 sm:pt-3">
		<Navigation />
		<main class="flex flex-1 flex-col gap-4 overflow-y-hidden p-4 sm:px-6 sm:py-0 md:gap-8">
			<slot />
		</main>
	</div>
</div>
