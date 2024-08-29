<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	import { dev } from '$app/environment';
	import { LoaderCircle } from 'lucide-svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInSchema } from '../schemas';

	let { data } = $props();

	const form = superForm(data.signInForm, {
		validators: zodClient(signInSchema)
	});
	const { form: formData, errors, enhance, message, delayed } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign In</Card.Title>
		<Card.Description>Enter your email below to sign in to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} type="email" bind:value={$formData.email} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<!-- <Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required /> -->
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<div class="flex items-center">
								<Form.Label>Password</Form.Label>
								<a href="##" class="ml-auto inline-block text-sm underline">
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
						<!-- <Form.Description>Ensure the password is at least 10 characters.</Form.Description> -->
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Button type="submit" class="w-full"
					>Sign In
					{#if $delayed}<LoaderCircle class="ml-2 h-5 w-5 animate-spin"></LoaderCircle>{/if}
				</Button>
				<!-- <Button variant="outline" class="w-full">Login with Google</Button> -->
			</div>
			<div class="mt-2">
				{#key $message}
					{#if $message}
						<Alert.Root variant="destructive">
							<!-- <TriangleAlert class="h-4 w-4"></TriangleAlert> -->
							<Alert.Title>Error</Alert.Title>
							<Alert.Description>{$message.text}</Alert.Description>
						</Alert.Root>
					{/if}
				{/key}
			</div>

			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/sign-up" class="underline"> Sign Up </a>
			</div>
		</form>
	</Card.Content>

	{#if dev}
		<div class="p-3">
			<SuperDebug data={$formData} />
		</div>
	{/if}
</Card.Root>
