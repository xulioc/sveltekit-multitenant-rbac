<script>
	import { Arc, Chart, Group, Svg } from 'layerchart';
</script>

<div class="h-[300px] rounded border p-4">
	<Chart>
		<Svg>
			<Group center>
				<Arc
					value={400}
					domain={[0, 1000]}
					innerRadius={-20}
					cornerRadius={10}
					class="fill-red-500"
					track={{ class: 'fill-red-500/10' }}
				/>
				<Arc
					value={20}
					domain={[0, 30]}
					outerRadius={-25}
					innerRadius={-20}
					cornerRadius={10}
					class="fill-lime-400"
					track={{ class: 'fill-lime-400/10' }}
				/>
				<Arc
					value={10}
					domain={[0, 12]}
					outerRadius={-50}
					innerRadius={-20}
					cornerRadius={10}
					class="fill-cyan-400"
					track={{ class: 'fill-cyan-500/10' }}
				/>
			</Group>
		</Svg>
	</Chart>
</div>
