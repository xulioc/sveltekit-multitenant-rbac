<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { loading } from '$lib/stores';
	import { Building, Minus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	const groups = $page.data.userGroups;
	let group = $page.data.group;

	// console.log('GROUPS> ', groups);
	// console.log('GROUP> ', group);

	const selected = groups.find((g) => g.id == group);
	let selectedGroup = { value: selected.id, label: selected.label };
	// console.log(selectedGroup);

	$: {
		if (browser && selectedGroup) {
			console.log(selectedGroup);
			if (group != selectedGroup.value) {
				group = selectedGroup.value;
				// console.log('changing to >', selectedGroup.value);
				$loading = true;
				document.cookie = 'group=' + selectedGroup.value + '; path=/';
				invalidateAll().then(() => {
					toast.success('Group changed to ' + selectedGroup.label);
					$loading = false;
				});
			}
		}
	}
</script>

{#if groups.length > 1}
	<Select.Root bind:selected={selectedGroup}>
		<!-- <Select.Trigger class="w-[180px]"> -->
		<Select.Trigger class="w-[250px]">
			<Select.Value placeholder="Select a group" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each groups as g}
					<Select.Item value={g.id} label={g.name}>
						<div class="pr-2">
							{#if !g.org}
								<Building></Building>
							{:else}
								<Minus></Minus>
							{/if}
						</div>
						{g.name}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{:else}
	<Button variant="outline">{selectedGroup.label}</Button>
{/if}
