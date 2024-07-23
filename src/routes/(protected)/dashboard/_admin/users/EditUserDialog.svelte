<script lang="ts">
	import { dev } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import * as Alert from '$lib/components/ui/alert';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ROLES } from '$lib/constants';
	import { TriangleAlert } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { editUserSchema, type EditUserSchema } from './schemas';

	export let open: boolean = false;
	export let data: SuperValidated<Infer<EditUserSchema>>;
	export let user: any;

	const form = superForm(data, {
		validators: zodClient(editUserSchema),
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

	function addRol(rol: string) {
		$formData.roles = [...$formData.roles, rol];
	}

	function removeRol(rol: string) {
		$formData.roles = $formData.roles.filter((i) => i !== rol);
	}

	$: $formData.id = user?.id;
	$: $formData.roles = user?.roles;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit user</Dialog.Title>
			<Dialog.Description>Edit user roles</Dialog.Description>
		</Dialog.Header>

		<form method="POST" action="?/edit" use:enhance>
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} type="hidden" bind:value={$formData.id} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Fieldset {form} name="roles" class="space-y-0">
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
