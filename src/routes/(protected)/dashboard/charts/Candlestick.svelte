<script>
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { Axis, Bars, Chart, Highlight, Points, Svg, Tooltip, TooltipItem } from 'layerchart';
	import candlestick from './candlestick.json';
</script>

<div class="h-[300px] rounded border p-4">
	<Chart
		data={candlestick}
		x="date"
		xScale={scaleBand().paddingInner(0.4)}
		y={['high', 'low']}
		yNice
		r={(d) => (d.close < d.open ? 'desc' : 'asc')}
		rScale={scaleOrdinal()}
		rDomain={['desc', 'asc']}
		rRange={['#e41a1c', '#4daf4a']}
		padding={{ left: 16, bottom: 24 }}
		tooltip={{ mode: 'bisect-x' }}
	>
		<Svg>
			<Axis placement="left" grid rule ticks={10} />
			<Axis placement="bottom" rule format={(d) => ''} />
			<Points links r={0} />
			<Bars y={(d) => [d.open, d.close]} radius={2} />
			<Highlight area />
		</Svg>
		<Tooltip header={(data) => data.date} let:data>
			<TooltipItem label="Open" value={data.open} format="decimal" />
			<TooltipItem label="Close" value={data.close} format="decimal" />
			<TooltipItem label="High" value={data.high} format="decimal" />
			<TooltipItem label="Low" value={data.low} format="decimal" />
		</Tooltip>
	</Chart>
</div>
