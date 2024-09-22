<script>
	import { page } from '$app/stores';
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import TrackingTable from './TrackingTable.svelte';
</script>

<DashboardPage5>
	<Card>
		<TrackingTable events={$page.data.events} />
	</Card>

	{#snippet footer()}
		<DashboardHelp5 title="Tracking">Here admins can track user events</DashboardHelp5>
	{/snippet}
</DashboardPage5>
