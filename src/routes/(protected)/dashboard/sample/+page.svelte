<script>
	import DashboardHelp from '$lib/components/DashboardHelp.svelte';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<DashboardPage>
	<span slot="title" class="box">This is the page title </span>
	<span slot="actions">
		<Button>Action 1</Button>
		<Button>Action 2</Button>
	</span>

	<span slot="content" class="box">Here page content</span>

	<span slot="help">
		<DashboardHelp>
			<span slot="title">Help</span>
			<span slot="description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
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
