<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import FormAlert from '$lib/components/FormAlert.svelte';
	import FormDebug from '$lib/components/FormDebug.svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Input from './ui/input/input.svelte';

	type Props = {
		open: boolean;
		form: any;
		schema: any;
		action: string;
		title: string;
		description: string;
	};

	let { open = $bindable(false), form, schema, action, title, description }: Props = $props();

	const myForm = superForm(form, {
		applyAction: true,
		invalidateAll: true,
		validators: zodClient(schema),
		onError({ result }) {
			$message = result.error.message || 'Unknown error';
		},
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				open = false;
			}
		}
	});
	const { form: formData, enhance, message, errors } = myForm;
</script>

<Sheet.Root bind:open>
	<Sheet.Content side="right">
		<form method="POST" {action} use:enhance>
			<Sheet.Header>
				<Sheet.Title>{title}</Sheet.Title>
				<Sheet.Description>
					{description}
				</Sheet.Description>
			</Sheet.Header>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Form.Button class="w-full">Invite</Form.Button>
				</Sheet.Close>
			</Sheet.Footer>
		</form>

		<FormAlert message={$message}></FormAlert>
		<FormDebug data={$formData}></FormDebug>
	</Sheet.Content>
</Sheet.Root>
