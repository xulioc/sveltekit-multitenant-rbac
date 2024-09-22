<script lang="ts">
	import Menu from './Menu.svelte';
	import Navigation from './Navigation.svelte';
</script>

<div class="h-full w-full flex-row bg-muted/40">
	<Menu />
	<div class="flex h-full flex-col pl-20">
		<Navigation />
		<main class="flex flex-1 flex-col gap-4 overflow-y-hidden p-4 py-2">
			<slot />
		</main>
	</div>
</div>
