<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';

	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import { toast } from 'svelte-sonner';
</script>

<DashboardPage>
	<span slot="content">
		<Card.Root>
			<Card.Header>
				<Card.Title>Hi {$page.data.user.email}!</Card.Title>
				<!-- <Card.Description>Card Description</Card.Description> -->
			</Card.Header>
			{#if 'PUBLIC_APP_NAME' in env}
				<Card.Content>
					Welcome to <span class="font-semibold">{env.PUBLIC_APP_NAME}</span>
				</Card.Content>
			{/if}
			<Card.Footer class="flex justify-end">
				<Button on:click={() => toast.success('You are welcome!')}>Thanks</Button>
			</Card.Footer>
		</Card.Root>
	</span>
</DashboardPage>
