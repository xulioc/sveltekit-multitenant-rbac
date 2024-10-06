<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	import AuthForm from '$lib/components/AuthForm.svelte';
	import { userUpdatePasswordSchema } from '$lib/zodschemas/users.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const form = superForm(data.updatePasswordForm, {
		validators: zodClient(userUpdatePasswordSchema)
	});

	const { form: formData, errors, enhance, message, delayed } = form;
</script>

<AuthForm sForm={form} title="Change password" description="Change your password">
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>New Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="confirmPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.confirmPassword} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</AuthForm>
