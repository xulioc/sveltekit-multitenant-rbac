<script lang="ts">
	import ExpandIndicator from '$lib/components/ExpandIndicator.svelte';
	import GroupLogo from '$lib/components/GroupLogo.svelte';
	import TableActions from '$lib/components/TableActions.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { GroupSchema } from '$lib/server/schemas';
	import type { TableAction, TableActionCallback } from '$lib/types';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addExpandedRows, addSubRows } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';

	export let groups;
	export let onAction: TableActionCallback;

	const actions: TableAction[] = [
		// { action: 'add', label: 'Add subgroup' }, // avoid deep groups
		{ action: 'delete', label: 'Detele group' }
	];

	const table = createTable(readable(groups), {
		sub: addSubRows({ children: 'subgroups' }),
		expand: addExpandedRows()
	});

	const columns = table.createColumns([
		table.display({
			id: 'expanded',
			header: '',
			cell: ({ row }, { pluginStates }) => {
				const { isExpanded, canExpand, isAllSubRowsExpanded } =
					pluginStates.expand.getRowState(row);
				return createRender(ExpandIndicator, {
					depth: row.depth,
					isExpanded,
					canExpand,
					isAllSubRowsExpanded
				});
			}
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: (row: GroupSchema) => row.createdBy?.email,
			header: 'Owner'
		}),
		table.column({
			accessor: 'logo',
			header: 'Logo',
			cell: ({ value }) => {
				return createRender(GroupLogo, { logo: value });
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
	const { expandedIds } = pluginStates.expand;
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
