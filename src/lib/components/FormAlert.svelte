<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { TriangleAlert } from 'lucide-svelte';

	let { message } = $props();
</script>

{#if message}
	<div class="my-2">
		<Alert.Root variant="destructive">
			<TriangleAlert></TriangleAlert>
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{message}</Alert.Description>
		</Alert.Root>
	</div>
{/if}
