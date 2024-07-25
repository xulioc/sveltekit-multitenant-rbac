<script>
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import TrackingTable from './TrackingTable.svelte';
</script>

<DashboardPage>
	<span slot="content">
		<TrackingTable events={$page.data.events} />
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Tracking</span>
			<span slot="description">Here admins...</span>
		</DashboardHelp>
	</span>
</DashboardPage>
