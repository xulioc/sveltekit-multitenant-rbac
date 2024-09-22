<script lang="ts">
	import RolesBadges from '$lib/components/RolesBadges.svelte';
	import TableActions from '$lib/components/TableActions.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { readable } from 'svelte/store';

	export let users;
	export let onAction: any;

	console.log(users);

	const actions = [
		{ action: 'edit', label: 'Edit user' },
		{ action: 'delete', label: 'Delete from group' }
	];

	const table = createTable(readable(users), {});

	const columns = table.createColumns([
		table.column({
			accessor: 'email',
			header: 'Email'
		}),

		table.column({
			accessor: 'roles',
			header: 'Roles',
			cell: ({ value }) => {
				return createRender(RolesBadges, { roles: value });
			}
		}),

		table.column({
			accessor: (row) => row,
			header: '',
			cell: ({ value }) => {
				return createRender(TableActions, { actions, row: value, onAction });
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
