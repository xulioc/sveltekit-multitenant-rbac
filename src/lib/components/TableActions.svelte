<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { TableAction } from '$lib/types';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	export let actions: TableAction;
	export let onAction: (a: object) => void;
	export let row: object;

	// TODO add confirm
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#each actions as action}
			<DropdownMenu.Item on:click={() => onAction({ action: action.action, row: row })}>
				{action.label}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
