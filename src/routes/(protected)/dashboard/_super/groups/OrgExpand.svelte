<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ChevronDown, ChevronRight, Minus } from 'lucide-svelte';

	export let isExpanded;
	export let canExpand;
	export let isAllSubRowsExpanded;
	export let depth: number;
</script>

{#if $canExpand}
	<div class="flex">
		<span
			role="button"
			tabindex="0"
			on:click={() => ($isExpanded = !$isExpanded)}
			on:keypress={() => ($isExpanded = !$isExpanded)}
			style:--depth={depth}
		>
			{#if $isExpanded}
				{#if $isAllSubRowsExpanded}
					<Button variant="secondary" size="icon"><ChevronDown /></Button>
				{:else}
					⏹️
				{/if}
			{:else}
				<Button variant="secondary" size="icon"><ChevronRight /></Button>
				<!-- <ChevronRight /> -->
			{/if}
		</span>
	</div>
{/if}

{#if depth >= 1}
	<Button disabled variant="outline" size="icon"><Minus></Minus></Button>
{/if}
