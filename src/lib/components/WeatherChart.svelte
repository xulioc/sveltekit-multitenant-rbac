<script lang="ts">
	import { scaleTime } from 'd3-scale';
	import { Axis, Chart, Highlight, Spline, Svg, Tooltip } from 'layerchart';
	import { dayjs } from 'svelte-time/dayjs.js';

	export let weather;

	const data = weather.hourly.time.map((t: string, index: number) => {
		return {
			date: new Date(t),
			value: weather.hourly.temperature_2m[index]
		};
	});
</script>

<div class="h-[300px] p-4">
	<Chart
		{data}
		x="date"
		xScale={scaleTime()}
		y="value"
		yDomain={[null, null]}
		yNice
		padding={{ left: 16, bottom: 24 }}
		tooltip={{ mode: 'bisect-x' }}
	>
		<Svg>
			<Axis
				placement="left"
				format={(d) => d + ' ' + weather.current_weather_units.temperature}
				labelPlacement="start"
				grid
				rule
				tickLabelProps={{
					class: 'text-[13px]',
					dx: -10
				}}
			></Axis>
			<Axis
				placement="bottom"
				rule
				tickLabelProps={{
					class: 'text-[13px]',
					dy: 10
				}}
			/>
			<Spline class="stroke-primary stroke-2" />
			<Highlight points lines />
		</Svg>

		<Tooltip header={(data) => dayjs(data.date).format('YYYY/MM/DD HH:MM')} let:data>
			<!-- <TooltipItem label="value" value={data.value} /> -->
			<p class="text-right">{data.value} ºC</p>
		</Tooltip>

		<!-- <Tooltip _variant="" let:data>
			<TooltipItem label="t" value={data.value + 'ºC'} />
		</Tooltip> -->
	</Chart>
</div>
