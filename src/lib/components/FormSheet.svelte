<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import { LoaderCircle } from 'lucide-svelte';
	import FormAlert from './FormAlert.svelte';
	import FormDebug from './FormDebug.svelte';

	type Props = {
		open: boolean;
		sForm: any;
		children: any;
		action: string;
		title: string;
		description: string;
	};

	let {
		open = $bindable(false),
		sForm = $bindable(),
		children,
		action,
		title,
		description
	}: Props = $props();

	const { form: formData, message, delayed } = sForm;
</script>

<Sheet.Root bind:open onOpenChange={() => {}}>
	<Sheet.Content side="right">
		<form method="POST" {action} use:sForm.enhance>
			<Sheet.Header>
				<Sheet.Title>{title}</Sheet.Title>
				<Sheet.Description>
					{description}
				</Sheet.Description>
			</Sheet.Header>

			{@render children()}

			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Form.Button class="w-full">
						{title}
						{#if $delayed}<LoaderCircle class="ml-2 h-5 w-5 animate-spin"></LoaderCircle>{/if}
					</Form.Button>
				</Sheet.Close>
			</Sheet.Footer>
		</form>

		<FormAlert message={$message}></FormAlert>
		<FormDebug data={$formData}></FormDebug>
	</Sheet.Content>
</Sheet.Root>
