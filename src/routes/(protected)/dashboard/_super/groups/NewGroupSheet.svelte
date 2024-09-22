<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { page } from '$app/stores';
	import FormSheet from '$lib/components/FormSheet.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { newGroupSchema } from '$lib/zodschemas/groups';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { open = $bindable(false), group }: { open: boolean; group: any } = $props();

	let sForm = superForm($page.data.newGroupForm, {
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		validators: zodClient(newGroupSchema),
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

	const { form: formData } = sForm;

	$effect(() => {
		$formData.parent = group?.id;
	});
</script>

<FormSheet bind:open bind:sForm action="?/add" title="Add" description="Add a new group">
	<Form.Field form={sForm} name="parent">
		<Form.Control let:attrs>
			<Input {...attrs} type="hidden" bind:value={$formData.parent} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={sForm} name="logo">
		<Form.Control let:attrs>
			<Input {...attrs} type="hidden" bind:value={$formData.logo} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={sForm} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} type="text" bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</FormSheet>
