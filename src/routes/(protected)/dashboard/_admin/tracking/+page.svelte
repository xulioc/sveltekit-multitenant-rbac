<script>
	import { page } from '$app/stores';
	import TrackingTable from './TrackingTable.svelte';

	const onAction = () => {};
</script>

<TrackingTable events={$page.data.events} {onAction} />
