<script lang="ts">
	import { ChevronDown, ChevronRight, CornerDownRight } from 'lucide-svelte';

	export let isExpanded;
	export let canExpand;
	export let isAllSubRowsExpanded;
	export let depth: number;
</script>

{#if $canExpand}
	<span
		role="button"
		tabindex="0"
		on:click={() => ($isExpanded = !$isExpanded)}
		on:keypress={() => ($isExpanded = !$isExpanded)}
		style:--depth={depth}
	>
		{#if $isExpanded}
			{#if $isAllSubRowsExpanded}
				<ChevronDown />
			{:else}
				⏹️
			{/if}
		{:else}
			<ChevronRight />
		{/if}
	</span>
{/if}

{#if depth >= 1}
	<CornerDownRight />
{/if}
