<script lang="ts">
	import { dev } from '$app/environment';
	import SuperDebug from 'sveltekit-superforms';

	let { data } = $props();
</script>

{#if dev}
	<div class="my-2">
		<SuperDebug {data} />
	</div>
{/if}
