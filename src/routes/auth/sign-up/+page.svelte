<script lang="ts">
	import { dev } from '$app/environment';

	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { Button } from '$lib/components/ui/button/index.js';
	import Input from '$lib/components/ui/input/input.svelte';

	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { TriangleAlert } from 'lucide-svelte';
	import { signInSchema } from '../schemas';

	let { data } = $props();

	const form = superForm(data.signInForm, {
		validators: zodClient(signInSchema)
	});
	const { form: formData, enhance, message } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<!-- <div class="grid grid-cols-2 gap-4">
				<div class="grid gap-2">
					<Label for="first-name">First name</Label>
					<Input id="first-name" placeholder="Max" required />
				</div>
				<div class="grid gap-2">
					<Label for="last-name">Last name</Label>
					<Input id="last-name" placeholder="Robinson" required />
				</div>
			</div> -->
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} type="email" bind:value={$formData.email} />
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

				<Button type="submit" class="w-full">Create an account</Button>
				<!-- <Button variant="outline" class="w-full">Sign up with GitHub</Button> -->
			</div>

			<div class="mt-2">
				{#key $message}
					{#if $message}
						<Alert.Root variant="destructive">
							<TriangleAlert></TriangleAlert>
							<Alert.Title>{$message.text}</Alert.Title>
							<!-- <Alert.Description></Alert.Description> -->
						</Alert.Root>
					{/if}
				{/key}
			</div>

			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/auth/sign-in" class="underline"> Sign in </a>
			</div>
		</form>
	</Card.Content>

	{#if dev}
		<div class="p-3">
			<SuperDebug data={$formData} />
		</div>
	{/if}
</Card.Root>
