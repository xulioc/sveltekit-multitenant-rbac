<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	import { dev } from '$app/environment';
	import * as Alert from '$lib/components/ui/alert';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { editGroupSchema, type EditGroupSchema } from '$lib/zodschemas/groups';
	import { TriangleAlert } from 'lucide-svelte';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let open: boolean = false;
	export let data: SuperValidated<Infer<EditGroupSchema>>;
	export let group: any;

	const form = superForm(data, {
		validators: zodClient(editGroupSchema),
		onError({ result }) {
			// console.log(result);
			$message = result.error.message || 'Unknown error';
		},
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				open = false;
				invalidateAll();
			}
		}
	});
	const { form: formData, enhance, message, errors } = form;

	$: $formData = group;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			{#if !group.id}
				<Dialog.Title>Edit organization</Dialog.Title>
				<!-- <Dialog.Description>Enter the name of the organization you want to add.</Dialog.Description> -->
			{:else}
				<Dialog.Title>Edit group</Dialog.Title>
				<!-- <Dialog.Description
					>Enter the name of the group you want to add. Paste an image if you want to use it as
					logo.</Dialog.Description
				> -->
			{/if}
		</Dialog.Header>

		<form method="POST" action="?/edit" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} type="text" bind:value={$formData.name} />
				</Form.Control>
				<!-- <Form.Description>It's preferred that you use your company email.</Form.Description> -->
				<Form.FieldErrors />
			</Form.Field>
			<!-- <Form.Field {form} name="settings">
				<Form.Control let:attrs>
					<Form.Label>Settrings</Form.Label>
					<Input {...attrs} type="text" bind:value={$formData.settings} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field> -->
			<Form.Button class="w-full">Save</Form.Button>
		</form>

		{#key $message}
			{#if $message}
				<Alert.Root variant="destructive">
					<TriangleAlert></TriangleAlert>
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>{$message}</Alert.Description>
				</Alert.Root>
			{/if}
		{/key}

		<!-- <Dialog.Footer></Dialog.Footer> -->
		{#if dev}
			<SuperDebug data={$formData} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
