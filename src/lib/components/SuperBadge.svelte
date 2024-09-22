<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	export let isSuper: boolean;
</script>

<div class="flex gap-x-2">
	{#if isSuper}
		<Badge variant="destructive">Super</Badge>
	{/if}
</div>
