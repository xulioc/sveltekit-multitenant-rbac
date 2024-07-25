<script lang="ts">
	import { Info } from 'lucide-svelte';
</script>

<div class="flex flex-row items-center rounded border border-warning p-4">
	<Info size="35" class=" stroke-warning"></Info>

	<div class="ml-4">
		<div class="text-lg font-semibold text-warning"><slot name="title"></slot></div>
		<div class="text-sm text-warning">
			<slot name="description"></slot>
		</div>
	</div>
</div>
