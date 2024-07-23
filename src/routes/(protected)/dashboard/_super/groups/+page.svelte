<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import DeleteGroupDialog from './DeleteGroupDialog.svelte';
	import GroupsTable from './GroupsTable.svelte';
	import NewGroupDialog from './NewGroupDialog.svelte';

	const { data } = $props();

	let newGroupDialog: boolean = $state(false);
	let deleteGroupDialog: boolean = $state(false);
	let group: any | undefined = $state(undefined);

	const onAction = (action: any) => {
		// console.log(action);
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

<div class="flex justify-end">
	<Button
		size="sm"
		class="h-7 gap-1"
		on:click={() => {
			group = { id: '' };
			newGroupDialog = true;
		}}
	>
		<CirclePlus class="h-3.5 w-3.5" />
		<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Organization</span>
	</Button>
</div>

{#if data.groups.length}
	{#key data.groups}
		<!-- FORCE RE-RENDER -->
		<GroupsTable bind:groups={data.groups} {onAction}></GroupsTable>
	{/key}
{:else}
	<Alert.Root>
		<Alert.Title>There are no groups</Alert.Title>
		<Alert.Description>You can add groups using the button.</Alert.Description>
	</Alert.Root>
{/if}

<NewGroupDialog data={data.newGroupForm} {group} bind:open={newGroupDialog}></NewGroupDialog>
<DeleteGroupDialog bind:group bind:open={deleteGroupDialog}></DeleteGroupDialog>
