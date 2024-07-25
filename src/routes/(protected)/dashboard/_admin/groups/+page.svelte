<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { GroupSchema } from '$lib/server/schemas';
	import { CirclePlus } from 'lucide-svelte';
	import DeleteGroupDialog from './DeleteGroupDialog.svelte';
	import GroupsTable from './GroupsTable.svelte';
	import NewGroupDialog from './NewGroupDialog.svelte';

	let newGroupDialog: boolean = false;
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
				group = { id: ' ' } as GroupSchema;
				newGroupDialog = true;
			}}
		>
			<CirclePlus class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add group</span>
		</Button>
	</span>

	<span slot="content">
		{#if $page.data.groups.length}
			<GroupsTable groups={$page.data.groups} {onAction}></GroupsTable>
		{:else}
			<Alert.Root>
				<Alert.Title>There are no groups</Alert.Title>
				<Alert.Description>You can add groups using the button above</Alert.Description>
			</Alert.Root>
		{/if}
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Groups (admin view)</span>
			<span slot="description">Here admins ...</span>
		</DashboardHelp>
	</span>
</DashboardPage>

<NewGroupDialog data={$page.data.newGroupForm} {group} bind:open={newGroupDialog}></NewGroupDialog>
<DeleteGroupDialog bind:group bind:open={deleteGroupDialog}></DeleteGroupDialog>
