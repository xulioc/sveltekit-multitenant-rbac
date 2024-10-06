<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Info, TriangleAlert } from 'lucide-svelte';

	let { message } = $props();
</script>

{#if message}
	{#if message?.type == 'error'}
		<div class="my-2">
			<Alert.Root variant="destructive">
				<TriangleAlert></TriangleAlert>

				<Alert.Title class="pl-2">Error</Alert.Title>
				<Alert.Description class="pl-2">{message?.text}</Alert.Description>
			</Alert.Root>
		</div>
	{:else}
		<div class="my-2">
			<Alert.Root>
				<Info></Info>

				<Alert.Title class="pl-2">{message?.text}</Alert.Title>
				<!-- <Alert.Description>{message?.text}</Alert.Description> -->
			</Alert.Root>
		</div>
	{/if}
{/if}
