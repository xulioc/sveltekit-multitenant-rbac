<script>
	import { scaleBand } from 'd3-scale';
	import { curveLinearClosed } from 'd3-shape';

	import { Axis, Chart, Points, Spline, Svg } from 'layerchart';

	const pitchData = [
		{
			name: 'fastball',
			value: 10
		},
		{
			name: 'change',
			value: 0
		},
		{
			name: 'slider',
			value: 4
		},
		{
			name: 'cutter',
			value: 8
		},
		{
			name: 'curve',
			value: 5
		}
	];
	let curve = curveLinearClosed;
</script>

<div class="h-[300px] p-4">
	<Chart
		data={pitchData}
		x="name"
		xScale={scaleBand()}
		xRange={[0, 2 * Math.PI]}
		y="value"
		yRange={({ height }) => [0, height / 2]}
		yPadding={[0, 10]}
		padding={{ top: 32, bottom: 8 }}
		radial
	>
		<Svg center>
			<Axis
				placement="radius"
				grid={{ class: 'stroke-surface-content/20 fill-surface-200/50' }}
				ticks={[0, 5, 10]}
				format={(d) => ''}
			/>
			<Axis placement="angle" grid={{ class: 'stroke-surface-content/20' }} />
			<Spline {curve} class="fill-primary/20 stroke-primary" />
			<Points class="fill-primary stroke-surface-200" />
		</Svg>
	</Chart>
</div>
