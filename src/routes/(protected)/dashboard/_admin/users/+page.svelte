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
	import UsersTable from './UsersTable.svelte';

	let editUserDialog: boolean = false;
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
	<span slot="title"></span>
	<span slot="actions">
		<Button class="gap-1" on:click={() => {}}>
			<UserPlusIcon class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Invite user</span>
		</Button>
	</span>

	<span slot="content">
		<Card>
			{#if $page.data.users.length}
				<UsersTable users={$page.data.users} {onAction} />
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
			<span slot="title">Users (admin view)</span>
			<span slot="description">Here admins ...</span>
		</DashboardHelp>
	</span>
</DashboardPage>

<EditUserDialog data={$page.data.editUserForm} {user} bind:open={editUserDialog}></EditUserDialog>
