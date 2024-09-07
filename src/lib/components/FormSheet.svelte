<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import FormAlert from './FormAlert.svelte';
	import FormDebug from './FormDebug.svelte';

	type Props = {
		open: boolean;
		form: any;
		sForm: any;
		formData: any;
		schema: any;
		fields: any;
		action: string;
		title: string;
		description: string;
	};

	let {
		open = $bindable(false),
		form = $bindable(false),
		sForm = $bindable(),
		formData = $bindable(),
		schema,
		fields,
		action,
		title,
		description
	}: Props = $props();

	sForm = superForm(form, {
		applyAction: true,
		invalidateAll: true,
		validators: zodClient(schema),
		onError({ result }) {
			sForm.message.set(result.error.message || 'Unknown error');
		},
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				open = false;
			}
		}
	});

	let message = $state(sForm.message);
	formData = sForm.form;
</script>

<Sheet.Root bind:open>
	<Sheet.Content side="right">
		<form method="POST" {action} use:sForm.enhance>
			<Sheet.Header>
				<Sheet.Title>{title}</Sheet.Title>
				<Sheet.Description>
					{description}
				</Sheet.Description>
			</Sheet.Header>

			{@render fields()}

			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Form.Button class="w-full">Invite</Form.Button>
					<!-- <Button builders={[builder]} type="submit">Save changes</Button> -->
				</Sheet.Close>
			</Sheet.Footer>
		</form>

		<FormAlert message={$message}></FormAlert>
		<FormDebug data={$formData}></FormDebug>
	</Sheet.Content>
</Sheet.Root>
