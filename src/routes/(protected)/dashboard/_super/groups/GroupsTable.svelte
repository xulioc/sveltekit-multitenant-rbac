<script lang="ts">
	import GroupLogo from '$lib/components/GroupLogo.svelte';
	import TableActions from '$lib/components/TableActions.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { TableAction } from '$lib/types';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addExpandedRows, addSubRows } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import OrgExpand from './OrgExpand.svelte';

	let {
		groups = $bindable(),
		onAction
	}: {
		groups: unknown[];
		onAction: TableAction;
	} = $props();

	const actions = [
		{ action: 'add', label: 'Add group' },
		{ action: 'delete', label: 'Detele group' }
	];

	const table = createTable(writable(groups), {
		sub: addSubRows({ children: 'subgroups' }),
		expand: addExpandedRows()
	});

	const columns = table.createColumns([
		table.display({
			id: 'expanded',
			header: 'Organization',
			cell: ({ row }, { pluginStates }) => {
				const { isExpanded, canExpand, isAllSubRowsExpanded } =
					pluginStates.expand.getRowState(row);
				return createRender(OrgExpand, {
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
			id: 'logo',
			accessor: 'logo',
			header: '',
			cell: ({ value }) => {
				return createRender(GroupLogo, { logo: value });
			}
		}),
		table.column({
			accessor: (row: any) => row.createdBy?.email,
			header: 'Owner'
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

	console.log($pageRows);
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
