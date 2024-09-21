<script lang="ts">
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import UsersTable from './UsersTable.svelte';

	const { data } = $props();
	let deleteUserDialog: boolean = $state(false);
	let deleteItem: any | undefined = $state(undefined);

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
</script>

{#snippet actions()}{/snippet}

{#snippet content()}
	<Card>
		<UsersTable users={data.users} {onAction} />
	</Card>
{/snippet}

{#snippet footer()}
	<DashboardHelp5
		title="Users (superuser view)"
		description="Here superusers can see a list of all users in the system and check if they are superusers,
				like him."
	/>
{/snippet}

<DashboardPage5 {actions} {content} {footer} />

<DeleteDialog bind:open={deleteUserDialog} item={deleteItem} action={'?/delete'}></DeleteDialog>
