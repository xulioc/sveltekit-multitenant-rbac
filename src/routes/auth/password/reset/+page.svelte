<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	import AuthForm from '$lib/components/AuthForm.svelte';
	import { resetPasswordSchema } from '$lib/zodschemas/users.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const form = superForm(data.resetPasswordForm, {
		validators: zodClient(resetPasswordSchema)
	});

	const { form: formData } = form;
</script>

<AuthForm sForm={form} title="Reset password" description="Receive email to reset your password">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} type="email" bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</AuthForm>
