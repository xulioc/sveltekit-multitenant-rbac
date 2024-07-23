<script lang="ts">
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import Menu from './Menu.svelte';
	import Navigation from './Navigation.svelte';
</script>

<LoadingBar />

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<Menu />
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<Navigation />
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<slot />
		</main>
	</div>
</div>
