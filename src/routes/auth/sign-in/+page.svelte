<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	import AuthForm from '$lib/components/AuthForm.svelte';
	import OAuth from '$lib/components/OAuth.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInSchema } from '../schemas';

	let { data } = $props();

	const form = superForm(data.signInForm, {
		validators: zodClient(signInSchema)
	});
	const { form: formData } = form;
</script>

<AuthForm
	sForm={form}
	title="Sign In"
	description="Enter your email below to sign in to your account"
>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} type="email" autocomplete="email" bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<div class="flex items-center">
				<Form.Label>Password</Form.Label>
				<a href="/auth/password/reset" class="ml-auto inline-block text-sm underline">
					Forgot your password?
				</a>
			</div>

			<Input
				{...attrs}
				type="password"
				autocomplete="current-password"
				bind:value={$formData.password}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#snippet footer()}
		<div class="w-full space-y-2">
			<OAuth action="Sign in"></OAuth>

			<div class="w-full text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/sign-up" class="underline"> Sign Up </a>
			</div>
		</div>
	{/snippet}
</AuthForm>
