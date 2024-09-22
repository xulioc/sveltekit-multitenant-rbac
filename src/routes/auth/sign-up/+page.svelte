<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';

	import { dev } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import { Info, LoaderCircle } from 'lucide-svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInSchema } from '../schemas';

	let { data } = $props();

	const form = superForm(data.signInForm, {
		validators: zodClient(signInSchema)
	});
	const { form: formData, enhance, message, delayed } = form;
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

				<Button type="submit" class="w-full">
					Sign Up
					{#if $delayed}<LoaderCircle class="ml-2 h-5 w-5 animate-spin"></LoaderCircle>{/if}
				</Button>
				<!-- <Button variant="outline" class="w-full">Sign up with GitHub</Button> -->
			</div>

			<div class="mt-2">
				{#key $message}
					{#if $message}
						<Alert.Root variant="destructive">
							<!-- <TriangleAlert></TriangleAlert> -->
							<Alert.Title>Error</Alert.Title>
							<Alert.Description>{$message.text}</Alert.Description>
						</Alert.Root>
					{/if}
				{/key}
			</div>

			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/auth/sign-in" class="underline"> Sign In </a>
			</div>

			{#if 'PUBLIC_DEMO_MODE' in env && env.PUBLIC_DEMO_MODE == 'true'}
				<Alert.Root variant="destructive" class="mt-4">
					<Info class="h-4 w-4"></Info>
					<Alert.Title>DEMO MODE</Alert.Title>
					<Alert.Description
						>After sign-up you will have admin and super access rights</Alert.Description
					>
				</Alert.Root>
			{/if}
		</form>
	</Card.Content>

	{#if dev}
		<div class="p-3">
			<SuperDebug data={$formData} />
		</div>
	{/if}
</Card.Root>
