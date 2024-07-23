<script lang="ts">
	import { page } from '$app/stores';
	import EditUserDialog from './EditUserDialog.svelte';
	import UsersTable from './UsersTable.svelte';

	console.log($page.data.users);

	let editUserDialog: boolean = false;
	let user: any | undefined = undefined;

	const onAction = (action: any) => {
		// console.log(action);
		switch (action.action) {
			case 'edit':
				user = action.row;
				editUserDialog = true;
				break;
		}
	};
</script>

<UsersTable users={$page.data.users} {onAction} />

<EditUserDialog data={$page.data.editUserForm} {user} bind:open={editUserDialog}></EditUserDialog>
