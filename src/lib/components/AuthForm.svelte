<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { LoaderCircle } from 'lucide-svelte';
	import FormAlert from './FormAlert.svelte';
	import FormDebug from './FormDebug.svelte';

	type Props = {
		sForm: any;
		title: string;
		description: string;
		action?: string;
		footer?: any;
		children?: any;
	};

	let {
		sForm = $bindable(),
		title,
		description,
		action,
		footer = null,
		children
	}: Props = $props();

	const { form: formData, message, delayed } = sForm;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>

	<Card.Content>
		<form method="POST" {action} use:sForm.enhance>
			<div class="grid gap-4">
				{@render children()}
				<Form.Button class="w-full">
					{title}
					{#if $delayed}<LoaderCircle class="ml-2 h-5 w-5 animate-spin"></LoaderCircle>
					{/if}
				</Form.Button>
			</div>
		</form>

		<FormAlert message={$message}></FormAlert>
	</Card.Content>

	<Card.Footer>
		{#if footer}
			{@render footer()}
		{/if}
	</Card.Footer>

	<FormDebug data={$formData}></FormDebug>
</Card.Root>
