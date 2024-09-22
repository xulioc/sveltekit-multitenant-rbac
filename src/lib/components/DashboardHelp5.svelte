<script lang="ts">
	import { Info } from 'lucide-svelte';
	let { title = null, description = null, children } = $props();
</script>

<div class="flex flex-row items-center rounded bg-primary p-4 text-primary-foreground">
	<Info size="35" class=""></Info>

	<div class="ml-4">
		<div class="text-lg font-semibold text-primary-foreground">{title}</div>
		<div class="text-sm text-primary-foreground">
			{description}
		</div>
		{#if children}
			<div class="text-sm text-primary-foreground">
				{@render children()}
			</div>
		{/if}
	</div>

	<!-- <div class="ml-4">
		<div class="text-lg font-semibold text-primary-foreground">{title}</div>
		<div class="text-sm text-primary-foreground">
			{description}
		</div>
	</div> -->
</div>
