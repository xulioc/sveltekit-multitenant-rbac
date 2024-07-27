<script>
	import { page } from '$app/stores';
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import TrackingTable from './TrackingTable.svelte';
</script>

<DashboardPage>
	<span slot="content">
		<Card>
			<TrackingTable events={$page.data.events} />
		</Card>
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Tracking</span>
			<span slot="description">Here admins...</span>
		</DashboardHelp>
	</span>
</DashboardPage>
