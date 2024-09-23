<script lang="ts">
	import MenuBar from './MenuBar.svelte';
	import NavigationBar from './NavigationBar.svelte';
</script>

<div class="flex h-full w-full bg-muted/40">
	<div class="hidden w-20 shrink-0 border-r bg-background md:block">
		<MenuBar></MenuBar>
	</div>
	<div class="flex h-full w-full flex-col">
		<div class="h-18 w-full">
			<NavigationBar></NavigationBar>
		</div>
		<main class="flex flex-1 flex-col overflow-y-hidden p-0 md:p-2">
			<slot />
		</main>
	</div>
</div>
