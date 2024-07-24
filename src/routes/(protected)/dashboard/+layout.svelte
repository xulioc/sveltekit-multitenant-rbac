<script lang="ts">
	import Menu from './Menu.svelte';
	import Navigation from './Navigation.svelte';
</script>

<div class="h-full w-full flex-col bg-muted/40">
	<Menu />
	<div class="flex h-full flex-col sm:gap-4 sm:pl-14 sm:pt-3">
		<Navigation />
		<main class="grid h-full flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<!-- <main class="h-full p-4"> -->
			<slot />
		</main>
	</div>
</div>
