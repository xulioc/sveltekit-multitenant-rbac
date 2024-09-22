<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { ROLES } from '$lib/constants';
	export let roles: string[] = [];
</script>

<div class="flex gap-x-2">
	{#each ROLES as r}
		{#if roles.includes(r.rol)}
			<Badge>{r.label}</Badge>
		{/if}
	{/each}
</div>
