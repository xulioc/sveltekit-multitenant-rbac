<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	import { env } from '$env/dynamic/public';
	import AuthForm from '$lib/components/AuthForm.svelte';
	import OAuth from '$lib/components/OAuth.svelte';
	import { Info } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInSchema } from '../schemas';

	let { data } = $props();

	const form = superForm(data.signInForm, {
		validators: zodClient(signInSchema)
	});
	const { form: formData } = form;
</script>

<AuthForm sForm={form} title="Sign Up" description="Enter your information to create an account">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} type="email" autocomplete="email" bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input
				{...attrs}
				type="password"
				autocomplete="current-password"
				bind:value={$formData.password}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if 'PUBLIC_DEMO_MODE' in env && env.PUBLIC_DEMO_MODE == 'true'}
		<Alert.Root variant="destructive">
			<Info class="h-4 w-4"></Info>
			<Alert.Title>DEMO MODE</Alert.Title>
			<Alert.Description
				>After sign-up you will have admin and super access rights</Alert.Description
			>
		</Alert.Root>
	{/if}

	{#snippet footer()}
		<div class="w-full space-y-2">
			<OAuth action="Sign up"></OAuth>

			<div class="w-full text-center text-sm">
				Already have an account?
				<a href="/auth/sign-in" class="underline"> Sign In </a>
			</div>
		</div>
	{/snippet}
</AuthForm>
