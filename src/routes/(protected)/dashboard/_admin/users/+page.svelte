<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';

	import { dev } from '$app/environment';
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { UserPlusIcon } from 'lucide-svelte';
	import EditUserSheet from './EditUserSheet.svelte';
	import InviteUserSheet from './InviteUserSheet.svelte';
	import UsersTable from './UsersTable.svelte';

	const { data } = $props();

	let editUserSheet: boolean = $state(false);
	let inviteUserSheet: boolean = $state(false);
	let user: any | undefined = $state({ id: '', roles: [] });

	const onAction = (action: any) => {
		if (dev) console.log('onAction > ', action);
		switch (action.action) {
			case 'edit':
				user = action.row;
				editUserSheet = true;
				break;
		}
	};
</script>

<DashboardPage5>
	{#snippet actions()}
		<Button
			class="gap-1"
			on:click={() => {
				inviteUserSheet = true;
			}}
		>
			<UserPlusIcon class="button-icon" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Invite user</span>
		</Button>
	{/snippet}

	{#snippet content()}
		<Card>
			{#if data.users.length}
				{#key data.users}
					<UsersTable users={data.users} {onAction} />
				{/key}
			{:else}
				<Alert.Root>
					<Alert.Title>There are no users</Alert.Title>
					<Alert.Description>Invite some users to your group</Alert.Description>
				</Alert.Root>
			{/if}
		</Card>
	{/snippet}

	{#snippet footer()}
		<DashboardHelp5
			title="Users"
			description="Here admins can see a list of all users who belong to this group with their roles."
		>
			<p>
				- You can edit user roles and delete users from the group (but not deleting the user from
				the system). If you remove the 'admin' role from yourself then you will have big trouble.
			</p>
			<p>- You can invite user to the group if the user is already registered in the system.</p>
		</DashboardHelp5>
	{/snippet}
</DashboardPage5>

<EditUserSheet bind:open={editUserSheet} bind:user></EditUserSheet>
<InviteUserSheet bind:open={inviteUserSheet}></InviteUserSheet>
