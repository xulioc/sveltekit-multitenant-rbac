<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';

	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { DefaultMarker, MapLibre } from 'svelte-maplibre';
	import WeatherChart from './WeatherChart.svelte';
</script>

<DashboardPage5>
	{#snippet actions()}
		<Button
			on:click={() => {
				// $loading = true;
				// invalidateAll();
			}}>Refresh</Button
		>
	{/snippet}
	<div class="grid grid-cols-2 gap-4">
		<div>
			<Card.Root class="h-full">
				<Card.Header>
					<Card.Title>Temperature</Card.Title>
				</Card.Header>
				{#if !$page.data.location.error}
					<Card.Content class="flex py-10">
						<!-- <Thermometer size="80"></Thermometer> -->
						<div class="text-7xl font-bold">
							{$page.data.weather.current_weather.temperature}
							{$page.data.weather.current_weather_units.temperature}
						</div>
					</Card.Content>

					<Card.Footer>
						Wind speed is
						{$page.data.weather.current_weather.windspeed}
						{$page.data.weather.current_weather_units.windspeed}
					</Card.Footer>
				{:else}
					<Card.Footer>Temperature not available</Card.Footer>
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
					</Card.Header>
					<Card.Footer>Location not available</Card.Footer>
				{/if}
			</Card.Root>
		</div>
	</div>
	{#if !$page.data.location.error}
		<div class="mt-5">
			<Card.Root class="h-full">
				<Card.Header>
					<Card.Title>Temperature forecast for {$page.data.location.city}</Card.Title>
					<!-- <Card.Description>Card Description</Card.Description> -->
				</Card.Header>

				<Card.Content>
					<WeatherChart weather={$page.data.weather}></WeatherChart>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}

	{#snippet footer()}
		<DashboardHelp5 title="Weather">
			This is a sample page with
			<a class="underline" href="https://ipapi.co/">location</a>
			and
			<a class="underline" href="https://open-meteo.com/">weather</a>
			data.
		</DashboardHelp5>
	{/snippet}
</DashboardPage5>

<style>
	:global(.map) {
		height: 200px;
	}
</style>
