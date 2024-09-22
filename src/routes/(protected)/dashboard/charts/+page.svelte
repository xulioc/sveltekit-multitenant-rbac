<script>
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Arc from './Arc.svelte';
	import Area from './Area.svelte';
	import Candlestick from './Candlestick.svelte';
	import Radar from './Radar.svelte';
</script>

<DashboardPage5>
	{#snippet actions()}
		<Button>Action</Button>
	{/snippet}

	<div class="grid grid-cols-2 gap-4">
		<Card.Root>
			<Card.Header>
				<Card.Title>Area</Card.Title>
			</Card.Header>
			<Card.Content>
				<Area></Area>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Candlestick</Card.Title>
			</Card.Header>
			<Card.Content>
				<Candlestick></Candlestick>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Radar</Card.Title>
			</Card.Header>
			<Card.Content>
				<Radar></Radar>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Arc</Card.Title>
			</Card.Header>
			<Card.Content>
				<Arc></Arc>
			</Card.Content>
		</Card.Root>
	</div>

	{#snippet footer()}
		<DashboardHelp5 title="Charts">
			Sample charts from
			<a class="underline" href="https://www.layerchart.com/">layerchart</a>.
		</DashboardHelp5>
	{/snippet}
</DashboardPage5>
