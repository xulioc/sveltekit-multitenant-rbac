<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	import { dev } from '$app/environment';
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	import type { GroupSchema } from '$lib/server/schemas';
	import { Building, CirclePlus } from 'lucide-svelte';
	import EditGroupSheet from './EditGroupSheet.svelte';
	import GroupsTable from './GroupsTable.svelte';
	import NewGroupSheet from './NewGroupSheet.svelte';

	const { data } = $props();

	let newGroupDialog: boolean = $state(false);
	let editGroupDialog: boolean = $state(false);
	let deleteGroupDialog: boolean = $state(false);
	let deleteItem: any | undefined = $state();
	let group: GroupSchema | undefined = $state({ id: '', name: '' });

	const onAction = (action: object) => {
		if (dev) console.log('onAction > ', action);

		switch (action.action) {
			case 'add':
				group = action.row;
				newGroupDialog = true;
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

	console.log(data.userGroup);
</script>

<DashboardPage5>
	{#snippet actions()}
		<!-- {#if !data.userGroup?.parent} -->
		<Button
			class="gap-1"
			on:click={() => {
				group = data.userGroup as GroupSchema;
				// console.log(group);
				editGroupDialog = true;
			}}
		>
			<Building class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Edit group</span>
		</Button>
		<!-- {/if} -->

		{#if !data.userGroup?.parent}
			<Button
				class="gap-1"
				on:click={() => {
					group = data.userGroup as GroupSchema;
					newGroupDialog = true;
				}}
			>
				<CirclePlus class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add group</span>
			</Button>
		{/if}
	{/snippet}

	{#snippet content()}
		<Card>
			{#if data.groups.length}
				{#key data.groups}
					<GroupsTable groups={data.groups} {onAction}></GroupsTable>
				{/key}
			{:else if data.userGroup?.parent}
				<Alert.Root>
					<Alert.Title>There are no groups</Alert.Title>
					<Alert.Description>Only organizations can have groups</Alert.Description>
				</Alert.Root>
			{:else}
				<Alert.Root>
					<Alert.Title>There are no groups</Alert.Title>
					<Alert.Description>You can add groups using the button above</Alert.Description>
				</Alert.Root>
			{/if}
		</Card>
	{/snippet}

	{#snippet footer()}
		<DashboardHelp5 title="Groups">
			Here admins can see a list of all groups in the selected organization along with their owner
			(the user who created the group).
			<div class="grid">
				<p>- You can add groups to your organization by clicking the "Add group" button.</p>
				<p>
					- Once the new groups are created you will see them in the table and be able to delete
					them also.
				</p>
				<p>
					- If you refresh the page you can swith from groups with the select field on the top right
					of the screen.
				</p>
			</div>
		</DashboardHelp5>
	{/snippet}
</DashboardPage5>

<NewGroupSheet {group} bind:open={newGroupDialog} action="?/add"></NewGroupSheet>
<EditGroupSheet {group} bind:open={editGroupDialog}></EditGroupSheet>
<DeleteDialog bind:open={deleteGroupDialog} item={deleteItem} action="?/delete" />
