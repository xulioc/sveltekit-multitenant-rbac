<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { page } from '$app/stores';
	import FormSheet from '$lib/components/FormSheet.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { inviteUserSchema } from '$lib/zodschemas/users';

	let { open = $bindable(false) }: { open: boolean } = $props();
	let sForm = $state();
	let formData = $state();
</script>

{#snippet formFields()}
	<Form.Field form={sForm} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
{/snippet}

<FormSheet
	bind:open
	bind:form={$page.data.inviteUserForm}
	bind:sForm
	bind:formData
	schema={inviteUserSchema}
	fields={formFields}
	action="?/invite"
	title="Invite"
	description="Invite an existing user to the currently selected group"
></FormSheet>
