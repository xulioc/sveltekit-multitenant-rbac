<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import { page } from '$app/stores';
	import FormAlert from '$lib/components/FormAlert.svelte';
	import FormDebug from '$lib/components/FormDebug.svelte';
	import { inviteUserSchema } from '$lib/zodschemas/users';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Props = {
		open: boolean;
	};

	let { open = $bindable(false) }: Props = $props();

	const form = superForm($page.data.inviteUserForm, {
		applyAction: true,
		invalidateAll: true,
		validators: zodClient(inviteUserSchema),
		onError({ result }) {
			// console.log(result);
			$message = result.error.message || 'Unknown error';
		},
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				open = false;
				// invalidateAll();
			}
		}
	});
	const { form: formData, enhance, message, errors } = form;
</script>

<Sheet.Root bind:open>
	<!-- <Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Open</Button>
	</Sheet.Trigger> -->
	<Sheet.Content side="right">
		<form method="POST" action="?/invite" use:enhance>
			<Sheet.Header>
				<Sheet.Title>Invite user</Sheet.Title>
				<Sheet.Description>
					Invite an existing user to the currently selected group.
				</Sheet.Description>
			</Sheet.Header>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Form.Button class="w-full">Invite</Form.Button>
					<!-- <Button builders={[builder]} type="submit">Save changes</Button> -->
				</Sheet.Close>
			</Sheet.Footer>
		</form>

		<FormAlert message={$message}></FormAlert>
		<FormDebug data={$formData}></FormDebug>
	</Sheet.Content>
</Sheet.Root>
