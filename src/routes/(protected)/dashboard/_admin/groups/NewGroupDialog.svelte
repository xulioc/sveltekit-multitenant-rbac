<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	import { browser, dev } from '$app/environment';
	import * as Alert from '$lib/components/ui/alert';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { blobToBase64 } from '$lib/images';
	import { newGroupSchema, type NewGroupSchema } from '$lib/zodschemas/groups';
	import { TriangleAlert } from 'lucide-svelte';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let open: boolean = false;
	export let data: SuperValidated<Infer<NewGroupSchema>>;
	export let group: any;

	const form = superForm(data, {
		validators: zodClient(newGroupSchema),
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

	// ALLOW IMAGE PASTING
	if (browser) {
		document.addEventListener('paste', async (e) => {
			e.preventDefault();
			const clipboardItems =
				typeof navigator?.clipboard?.read === 'function'
					? await navigator.clipboard.read()
					: e.clipboardData?.files;

			for (const clipboardItem of clipboardItems) {
				let blob;
				if (clipboardItem.type?.startsWith('image/')) {
					// For files from `e.clipboardData.files`.
					blob = clipboardItem;
					$formData.logo = await blobToBase64(blob);
				} else {
					// For files from `navigator.clipboard.read()`.
					const imageTypes = clipboardItem.types?.filter((type) => type.startsWith('image/'));
					for (const imageType of imageTypes) {
						blob = await clipboardItem.getType(imageType);
						$formData.logo = await blobToBase64(blob);
					}
				}
			}
		});
	}

	$: $formData.parent = group?.id;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			{#if !group.id}
				<Dialog.Title>Add organization</Dialog.Title>
				<Dialog.Description>Enter the name of the organization you want to add.</Dialog.Description>
			{:else}
				<Dialog.Title>Add group</Dialog.Title>
				<Dialog.Description>Enter the name of the group you want to add.</Dialog.Description>
			{/if}
		</Dialog.Header>

		{#if $formData.logo}
			<img alt="logo" src={$formData.logo} />
		{/if}

		<form method="POST" action="?/add" use:enhance>
			<Form.Field {form} name="parent">
				<Form.Control let:attrs>
					<Input {...attrs} type="hidden" bind:value={$formData.parent} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="logo">
				<Form.Control let:attrs>
					<Input {...attrs} type="hidden" bind:value={$formData.logo} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} type="text" bind:value={$formData.name} />
				</Form.Control>
				<!-- <Form.Description>It's preferred that you use your company email.</Form.Description> -->
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="w-full">Add</Form.Button>
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
