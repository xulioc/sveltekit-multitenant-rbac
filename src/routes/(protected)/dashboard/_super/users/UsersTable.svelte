<script lang="ts">
	import SuperBadge from '$lib/components/SuperBadge.svelte';
	import TableActions from '$lib/components/TableActions.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { TableAction, TableActionCallback } from '$lib/types';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import Time from 'svelte-time/Time.svelte';
	import { readable } from 'svelte/store';

	export let users;
	export let onAction: TableActionCallback;

	// console.log(users);

	const actions: TableAction = [{ label: 'Detele user', action: 'delete' }];

	const table = createTable(readable(users), {});

	const columns = table.createColumns([
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: (row) => row.super,
			header: 'Super',
			cell: ({ value }) => {
				return createRender(SuperBadge, { isSuper: value });
			}
		}),
		table.column({
			accessor: 'createdAt',
			header: 'Created',
			cell: ({ value }) => {
				return createRender(Time, { timestamp: value, format: 'YYYY-MM-DD HH:mm:ss' });
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

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
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
