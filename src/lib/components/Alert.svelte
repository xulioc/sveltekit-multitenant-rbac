<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	type Props = {
		type: string;
		children: any;
	};

	let { type, children }: Props = $props();
</script>

<Card.Root>
	<!-- <Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>Card Description</Card.Description>
	</Card.Header> -->
	<Card.Content>
		{@render children()}
	</Card.Content>
	<!-- <Card.Footer>
		<p>Card Footer</p>
	</Card.Footer> -->
</Card.Root>
