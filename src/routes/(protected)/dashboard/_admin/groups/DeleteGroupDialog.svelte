<script lang="ts">
	import { dev } from '$app/environment';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';

	export let open: boolean = false;
	export let group: { name: string; id: string } | undefined = undefined;
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Delete group</Dialog.Title>
			<Dialog.Description
				>Confirm you want to delete
				<span>'{group?.name}'</span></Dialog.Description
			>
		</Dialog.Header>
		<Dialog.Footer>
			<form
				method="POST"
				action="?/delete"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (dev) console.log('?/delete > ', result);
						open = false;
						if (result.type == 'success') {
							toast.success('Group deleted');
							update({ invalidateAll: true });
						} else {
							toast.error('Error deleting group ' + result.status);
						}
					};
				}}
			>
				<Input type="hidden" name="id" value={group?.id} />
				<Button
					variant="outline"
					on:click={() => {
						open = false;
					}}>Cancel</Button
				>
				<Form.Button variant="destructive">Confirm</Form.Button>
			</form>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
