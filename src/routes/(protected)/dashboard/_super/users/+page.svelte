<script lang="ts">
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import UsersTable from './UsersTable.svelte';

	// console.log($page.data.users);

	const onAction = (action: any) => {
		console.log(action);
		switch (action.action) {
			case 'delete':
				deleteItem = {
					id: action.row.id,
					message: 'user',
					name: action.row.email
				};
				deleteUserDialog = true;
				break;
		}
	};

	let newUserDialog: boolean = false;
	let deleteUserDialog: boolean = false;
	let deleteItem: any | undefined = undefined;
</script>

<DashboardPage>
	<span slot="actions">
		<!-- <Button
			class="gap-1"
			on:click={() => {
				newUserDialog = true;
			}}
		>
			<CirclePlus class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add user</span>
		</Button> -->
	</span>

	<span slot="content">
		<Card>
			<UsersTable users={$page.data.users} {onAction} />
		</Card>
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Users (superuser view)</span>
			<span slot="description">
				Here superusers can see a list of all users in the system and check if they are superusers,
				like him.</span
			>
		</DashboardHelp>
	</span>
</DashboardPage>

<DeleteDialog bind:open={deleteUserDialog} item={deleteItem} action={'?/delete'}></DeleteDialog>
