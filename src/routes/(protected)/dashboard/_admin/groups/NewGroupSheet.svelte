<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import FormSheet from '$lib/components/FormSheet.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { blobToBase64 } from '$lib/images';
	import { newGroupSchema } from '$lib/zodschemas/groups';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { open = $bindable(false), group }: { open: boolean; group: any } = $props();

	let sForm = superForm($page.data.newGroupForm, {
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		validators: zodClient(newGroupSchema),
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

	$effect(() => {
		$formData.parent = group?.id;
	});

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
</script>

<FormSheet bind:open bind:sForm action="?/add" title="Add" description="Add a new group">
	<Form.Field form={sForm} name="parent">
		<Form.Control let:attrs>
			<Input {...attrs} type="hidden" bind:value={$formData.parent} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={sForm} name="logo">
		<Form.Control let:attrs>
			<Input {...attrs} type="hidden" bind:value={$formData.logo} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={sForm} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} type="text" bind:value={$formData.name} />
		</Form.Control>
		<!-- <Form.Description>It's preferred that you use your company email.</Form.Description> -->
		<Form.FieldErrors />
	</Form.Field>

	{#if $formData.logo}
		<img alt="logo" src={$formData.logo} />
	{/if}
</FormSheet>
