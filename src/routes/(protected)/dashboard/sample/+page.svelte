<script>
	import DashboardHelp5 from '$lib/components/DashboardHelp5.svelte';
	import DashboardPage5 from '$lib/components/DashboardPage5.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import ExampleBlock from './ExampleBlock.svelte';
</script>

<DashboardPage5>
	{#snippet actions()}
		<Button on:click={() => toast.success('Hello')}>Action</Button>
	{/snippet}

	<div class="overflow-auto">
		<!-- <ScrollArea> -->
		<ExampleBlock></ExampleBlock>
		<!-- </ScrollArea> -->
	</div>

	{#snippet footer()}
		<DashboardHelp5 title="Sample page">
			This is a sample page with code from
			<a class="underline" href="https://www.shadcn-svelte.com/blocks">shadcn-svelte</a>.
		</DashboardHelp5>
	{/snippet}
</DashboardPage5>

<!-- <style lang="postcss">
	.box {
		@apply border-2;
		@apply border-primary;
		@apply px-2;
	}
</style> -->
