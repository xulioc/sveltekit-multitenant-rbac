<script lang="ts">
	import { Info } from 'lucide-svelte';
</script>

<div class="flex flex-row items-center rounded bg-primary p-4 text-primary-foreground">
	<Info size="35" class=""></Info>

	<div class="ml-4">
		<div class="text-lg font-semibold text-primary-foreground"><slot name="title"></slot></div>
		<div class="text-sm text-primary-foreground">
			<slot name="description"></slot>
		</div>
	</div>
</div>
