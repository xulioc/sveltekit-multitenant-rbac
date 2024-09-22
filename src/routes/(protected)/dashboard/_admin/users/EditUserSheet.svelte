<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { page } from '$app/stores';
	import FormSheet from '$lib/components/FormSheet.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ROLES } from '$lib/constants';
	import { editUserSchema } from '$lib/zodschemas/users';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { open = $bindable(false), user = $bindable() } = $props();

	let sForm = superForm($page.data.editUserForm, {
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		validators: zodClient(editUserSchema),
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

	function addRol(rol: string) {
		$formData.roles = [...$formData.roles, rol];
	}

	function removeRol(rol: string) {
		$formData.roles = $formData.roles.filter((i) => i !== rol);
	}

	$formData = user;
</script>

<FormSheet bind:open bind:sForm action="?/edit" title="Efit user" description="Edit user roles">
	<Form.Field form={sForm} name="id">
		<Form.Control let:attrs>
			<Input {...attrs} type="hidden" bind:value={$formData.id} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset form={sForm} name="roles" class="space-y-0">
		<!-- <div class="mb-4">
			<Form.Legend class="text-base">Sidebar</Form.Legend>
			<Form.Description>Select the items you want to display in the sidebar.</Form.Description>
		</div> -->
		<div class="space-y-2">
			{#each ROLES as rol}
				{@const checked = $formData.roles.includes(rol.rol)}
				<div class="flex flex-row items-start space-x-3">
					<Form.Control let:attrs>
						<Checkbox
							{...attrs}
							{checked}
							onCheckedChange={(v) => {
								if (v) {
									addRol(rol.rol);
								} else {
									removeRol(rol.rol);
								}
							}}
						/>
						<Form.Label class="text-sm font-normal">
							{rol.label}
						</Form.Label>
						<input hidden type="checkbox" name={attrs.name} value={rol.rol} {checked} />
					</Form.Control>
				</div>
			{/each}
			<Form.FieldErrors />
		</div>
	</Form.Fieldset>
</FormSheet>
