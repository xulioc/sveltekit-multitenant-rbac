<script>
	import { scaleTime } from 'd3-scale';
	import {
		Area,
		Axis,
		Chart,
		ChartClipPath,
		Highlight,
		Svg,
		Tooltip,
		TooltipItem
	} from 'layerchart';
	import { cubicInOut } from 'svelte/easing';
	import area from './area.json';

	const data = area.map((d) => {
		return { date: new Date(d.date), value: d.value };
	});
</script>

<div class="h-[300px] p-4">
	<Chart
		{data}
		x="date"
		xScale={scaleTime()}
		y="value"
		yDomain={[0, null]}
		yNice
		padding={{ left: 16, bottom: 24 }}
		tooltip={{ mode: 'bisect-x' }}
	>
		<Svg>
			<Axis placement="left" grid rule />
			<Axis placement="bottom" rule />
			<!-- <Area
                draw={{ easing: cubicInOut, delay: 700 }}
                line={{ class: 'stroke-2 stroke-primary' }}
                class="fill-primary/30"
            /> -->
			<Highlight points lines />

			<ChartClipPath initialWidth={0} tweened={{ width: { duration: 1000, easing: cubicInOut } }}>
				<Area line={{ class: 'stroke-2 stroke-primary' }} class="fill-primary/30" />
			</ChartClipPath>
		</Svg>

		<!-- header={(data) => formatDate(data.date, "eee, MMMM do")} -->
		<Tooltip _variant="invert" let:data>
			<TooltipItem label="Value" value={data.value} />
		</Tooltip>
	</Chart>
</div>
