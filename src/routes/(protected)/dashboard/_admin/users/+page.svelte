<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { UserPlusIcon } from 'lucide-svelte';
	import EditUserDialog from './EditUserDialog.svelte';
	import InviteUserSheet from './InviteUserSheet.svelte';
	import UsersTable from './UsersTable.svelte';

	let editUserDialog: boolean = false;
	let inviteUserSheet: boolean = false;

	let user: any | undefined = undefined;

	const onAction = (action: any) => {
		if (dev) console.log('onAction > ', action);
		switch (action.action) {
			case 'edit':
				user = action.row;
				editUserDialog = true;
				break;
		}
	};
</script>

<DashboardPage>
	<span slot="actions">
		<Button
			class="gap-1"
			on:click={() => {
				inviteUserSheet = true;
			}}
		>
			<UserPlusIcon class="button-icon" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Invite user</span>
		</Button>
	</span>

	<span slot="content">
		<Card>
			{#if $page.data.users.length}
				<UsersTable bind:users={$page.data.users} {onAction} />
			{:else}
				<Alert.Root>
					<Alert.Title>There are no users</Alert.Title>
					<Alert.Description>Invite some users to your group</Alert.Description>
				</Alert.Root>
			{/if}
		</Card>
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Users</span>
			<span slot="description" class="text-lg"
				>Here admins can see a list of all users who belong to this group with their roles.
				<div class="grid">
					<p>
						- You can edit user roles and delete users from the group (but not deleting the user
						from the system). If you remove the 'admin' role from yourself then you will have big
						trouble.
					</p>
					<p>- You can invite user to the group if the user is already registered in the system.</p>
				</div>
			</span>
		</DashboardHelp>
	</span>
</DashboardPage>

<EditUserDialog data={$page.data.editUserForm} {user} bind:open={editUserDialog}></EditUserDialog>
<InviteUserSheet bind:open={inviteUserSheet}></InviteUserSheet>
