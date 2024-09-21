<script lang="ts">
	import { Info } from 'lucide-svelte';
	let { title, description }: { title: String; description: String } = $props();
</script>

<div class="flex flex-row items-center rounded bg-primary p-4 text-primary-foreground">
	<Info size="35" class=""></Info>

	<div class="ml-4">
		<div class="text-lg font-semibold text-primary-foreground">{title}</div>
		<div class="text-sm text-primary-foreground">
			{description}
		</div>
	</div>
</div>
