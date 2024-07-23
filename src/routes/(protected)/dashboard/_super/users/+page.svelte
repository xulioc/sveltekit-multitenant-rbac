<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import UsersTable from './UsersTable.svelte';

	// console.log($page.data.users);

	const onAction = (action: any) => {
		console.log(action);
	};

	let newUserDialog: boolean = false;
	// let deleteGroupDialog: boolean = false;
	let user: any | undefined = undefined;
</script>

<div class="flex justify-end">
	<Button
		size="sm"
		class="h-7 gap-1"
		on:click={() => {
			// group = { id: '' };
			// newGroupDialog = true;
		}}
	>
		<CirclePlus class="h-3.5 w-3.5" />
		<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add user</span>
	</Button>
</div>

<UsersTable users={$page.data.users} {onAction} />

<!-- <NewUserDialog data={$page.data.newUserForm} {user} bind:open={newUserDialog}></NewUserDialog> -->
<!-- <DeleteGroupDialog bind:group bind:open={deleteGroupDialog}></DeleteGroupDialog> -->
