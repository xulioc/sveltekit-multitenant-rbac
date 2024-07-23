<script lang="ts">
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
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

<DashboardPage>
	<span slot="title"></span>
	<span slot="actions">
		<Button
			class="gap-1"
			on:click={() => {
				// group = { id: '' };
				// newGroupDialog = true;
			}}
		>
			<CirclePlus class="h-3.5 w-3.5" />
			<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add user</span>
		</Button>
	</span>

	<span slot="content">
		<UsersTable users={$page.data.users} {onAction} />
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Users (superuser view)</span>
			<span slot="description"
				>Here superusers view system wide organizations and their groups. Superusers can create or
				delete organizations and create or delete the gropus belonging to the organizations.</span
			>
		</DashboardHelp>
	</span>

	<!-- <span slot="footer" class="box"> Here page footer </span> -->
</DashboardPage>
