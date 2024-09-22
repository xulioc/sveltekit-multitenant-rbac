<script lang="ts">
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { TableAction } from '$lib/types';
	import { CirclePlus } from 'lucide-svelte';
	import GroupsTable from './GroupsTable.svelte';
	import NewGroupSheet from './NewGroupSheet.svelte';

	const { data } = $props();

	let newGroupSheet: boolean = $state(false);
	let deleteGroupDialog: boolean = $state(false);
	let group: any | undefined = $state(undefined);
	let deleteItem: any | undefined = $state();

	const onAction = (action: TableAction) => {
		// console.log(action);
		switch (action.action) {
			case 'add':
				group = action.row;
				newGroupSheet = true;
				break;
			case 'delete':
				deleteItem = {
					message: 'group',
					name: action.row.name,
					id: action.row.id
				};
				deleteGroupDialog = true;
				break;
		}
	};
</script>

{#snippet actions()}
	<Button
		class="gap-1"
		on:click={() => {
			group = { id: null };
			newGroupSheet = true;
		}}
	>
		<CirclePlus class="h-3.5 w-3.5" />
		<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Organization</span>
	</Button>
{/snippet}

{#snippet content()}
	<Card>
		{#if data.groups.length}
			{#key data.groups}
				<GroupsTable groups={data.groups} {onAction}></GroupsTable>
			{/key}
		{:else}
			<Alert.Root>
				<Alert.Title>There are no groups</Alert.Title>
				<Alert.Description>You can add groups using the button.</Alert.Description>
			</Alert.Root>
		{/if}
	</Card>
{/snippet}

{#snippet footer()}
	<DashboardHelp5
		title="Groups (superuser view)"
		description="Here superusers view system wide organizations and their groups. Superusers can create or
			delete organizations and create or delete the gropus belonging to the organizations."
	>
		Here superusers view system wide organizations and their groups. Superusers can create or delete
		organizations and create or delete the gropus belonging to the organizations.
	</DashboardHelp5>
{/snippet}

<DashboardPage5 {actions} {content} {footer} />

<NewGroupSheet bind:open={newGroupSheet} {group} />

<DeleteDialog bind:open={deleteGroupDialog} item={deleteItem} action="?/delete" />
