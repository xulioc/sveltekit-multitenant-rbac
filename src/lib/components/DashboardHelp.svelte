<script lang="ts">
	import { Info } from 'lucide-svelte';
</script>

<div class="flex flex-row items-center rounded border border-primary p-4">
	<Info size="35" class=" stroke-primary"></Info>

	<div class="ml-4">
		<div class="text-lg font-semibold text-primary"><slot name="title"></slot></div>
		<div class="text-sm text-primary">
			<slot name="description"></slot>
		</div>
	</div>
</div>
