<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { GroupSchema } from '$lib/server/schemas';
	import { Building, CirclePlus } from 'lucide-svelte';
	import DeleteGroupDialog from './DeleteGroupDialog.svelte';
	import EditGroupDialog from './EditGroupDialog.svelte';
	import GroupsTable from './GroupsTable.svelte';
	import NewGroupDialog from './NewGroupDialog.svelte';

	let newGroupDialog: boolean = false;
	let editGroupDialog: boolean = false;
	let deleteGroupDialog: boolean = false;
	let group: GroupSchema | undefined = undefined;

	const onAction = (action: object) => {
		if (dev) console.log('onAction > ', action);

		switch (action.action) {
			case 'add':
				group = action.row;
				newGroupDialog = true;
				break;
			case 'delete':
				group = action.row;
				deleteGroupDialog = true;
				break;
		}
	};
</script>

<DashboardPage>
	<span slot="actions">
		<Button
			class="gap-1"
			on:click={() => {
				group = $page.data.userGroup as GroupSchema;
				editGroupDialog = true;
			}}
		>
			<Building class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Edit organization</span>
		</Button>
		<Button
			class="gap-1"
			on:click={() => {
				group = { id: ' ' } as GroupSchema;
				newGroupDialog = true;
			}}
		>
			<CirclePlus class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add group</span>
		</Button>
	</span>

	<span slot="content">
		<Card>
			{#if $page.data.groups.length}
				<GroupsTable groups={$page.data.groups} {onAction}></GroupsTable>
			{:else}
				<Alert.Root>
					<Alert.Title>There are no groups</Alert.Title>
					<Alert.Description>You can add groups using the button above</Alert.Description>
				</Alert.Root>
			{/if}
		</Card>
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Groups</span>
			<span slot="description" class="text-lg"
				>Here admins can see a list of all groups in the selected organization along with their
				owner (the user who created the group).
				<div class="grid">
					<p>- You can add groups to your organization by clicking the "Add group" button.</p>
					<p>
						- Once the new groups are created you will see them in the table and be able to delete
						them also.
					</p>
					<p>
						- If you refresh the page you can swith from groups with the select field on the top
						right of the screen.
					</p>
				</div>
			</span>
		</DashboardHelp>
	</span>
</DashboardPage>

<NewGroupDialog data={$page.data.newGroupForm} {group} bind:open={newGroupDialog}></NewGroupDialog>
<EditGroupDialog data={$page.data.editGroupForm} {group} bind:open={editGroupDialog}
></EditGroupDialog>
<DeleteGroupDialog bind:group bind:open={deleteGroupDialog}></DeleteGroupDialog>
