<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';

	import { DefaultMarker, MapLibre } from 'svelte-maplibre';

	console.log($page.data);
</script>

<div class="grid grid-cols-2 gap-4">
	<div>
		<Card.Root class="h-full">
			<Card.Header>
				<Card.Title>Welcome {$page.data.user.email}!</Card.Title>
				<!-- <Card.Description>Card Description</Card.Description> -->
			</Card.Header>
			{#if !$page.data.location.error}
				<Card.Content>
					<p>You are in {$page.data.location.city}</p>
					<p>The temperature is {$page.data.weather.current_weather.temperature} ºC</p>
				</Card.Content>

				<Card.Footer>
					<Button on:click={() => toast('Thanks :)')}>I agree!</Button>
				</Card.Footer>
			{/if}
		</Card.Root>
	</div>
	<!-- ... -->
	<div>
		<!-- style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" -->
		<Card.Root>
			{#if !$page.data.weather.error}
				<Card.Header>
					<Card.Title>Location</Card.Title>

					<Card.Description
						>{$page.data.location.city},
						{$page.data.location.region},
						{$page.data.location.country_name}.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<MapLibre
						class="map"
						center={[$page.data.location.longitude, $page.data.location.latitude]}
						zoom={3}
						style="https://demotiles.maplibre.org/style.json"
					>
						<DefaultMarker lngLat={[$page.data.location.longitude, $page.data.location.latitude]}
						></DefaultMarker>
					</MapLibre>
				</Card.Content>
			{:else}
				<Card.Header>
					<Card.Title>Location</Card.Title>

					<Card.Description>Location not availale</Card.Description>
				</Card.Header>
			{/if}
		</Card.Root>
	</div>
</div>

<!-- CHART.JS STILL NOT WORKING WITH SVELTE5 -->
<!-- <WeatherChart weather={$page.data.weather}></WeatherChart> -->

<style>
	:global(.map) {
		height: 200px;
	}
</style>
