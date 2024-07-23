<script>
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import TrackingTable from './TrackingTable.svelte';

	const onAction = () => {};
</script>

<DashboardPage>
	<span slot="content">
		<TrackingTable events={$page.data.events} {onAction} />
	</span>

	<!-- <span slot="help">
		<DashboardHelp>
			<span slot="title">Tracking</span>"
			<span slot="description">Tracking</span>"
		</DashboardHelp>
	</span> -->

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Users (superuser view)</span>
			<span slot="description"
				>Here superusers view system wide organizations and their groups. Superusers can create or
				delete organizations and create or delete the gropus belonging to the organizations.</span
			>
		</DashboardHelp>
	</span>
</DashboardPage>
