<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';

	let {
		open = $bindable(false),
		item = $bindable(),
		action
	}: { open: boolean; item: unknown | undefined; action: string } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Delete {item.message}</Dialog.Title>
			<Dialog.Description>Confirm you want to delete {item.name}</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<form
				method="POST"
				{action}
				use:enhance={() => {
					return async ({ result, update }) => {
						// console.log(result);
						open = false;
						if (result.type == 'success') {
							await invalidateAll();
							toast.success('Deleted!');
							// update();
						} else {
							console.log(result);
							toast.error('Error deleting: ' + result.data.message);
						}
					};
				}}
			>
				<Input type="hidden" name="id" value={item.id} />
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
