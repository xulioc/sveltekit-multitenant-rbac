<script>
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import ExampleBlock from './ExampleBlock.svelte';
</script>

<DashboardPage>
	<span slot="actions">
		<Button on:click={() => toast.success('Hello')}>Action</Button>
	</span>

	<span slot="content">
		<div class="overflow-auto">
			<!-- <ScrollArea> -->
			<ExampleBlock></ExampleBlock>
			<!-- </ScrollArea> -->
		</div>
	</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Sample page</span>
			<span slot="description">
				This is a sample page with code from
				<a class="underline" href="https://www.shadcn-svelte.com/blocks">shadcn-svelte</a>.
			</span>
		</DashboardHelp>
	</span>
	<span slot="footer" class="box"> Here page footer </span>
</DashboardPage>

<style lang="postcss">
	.box {
		@apply border-2;
		@apply border-primary;
		@apply px-2;
	}
</style>
