<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { page } from '$app/stores';

	import FormSheet from '$lib/components/FormSheet.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { inviteUserSchema } from '$lib/zodschemas/users';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { open = $bindable(false) }: { open: boolean } = $props();

	let sForm = superForm($page.data.inviteUserForm, {
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		validators: zodClient(inviteUserSchema),
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
</script>

<FormSheet
	bind:open
	bind:sForm
	action="?/invite"
	title="Invite"
	description="Invite an existing user to the currently selected group"
>
	<Form.Field form={sForm} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</FormSheet>
