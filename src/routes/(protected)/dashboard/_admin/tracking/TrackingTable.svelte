<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import * as Table from '$lib/components/ui/table';
	import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import Time from 'svelte-time';
	import { readable } from 'svelte/store';

	export let events;
	// console.log(events);

	const table = createTable(readable(events), {
		sort: addSortBy(),
		page: addPagination()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'createdAt',
			header: 'Timestamp',
			cell: ({ value }) => {
				return createRender(Time, { timestamp: value, format: 'YY-MM-DD HH:mm:ss' });
			}
		}),
		table.column({
			accessor: (item) => item.createdBy.email,
			header: 'User'
		}),
		table.column({
			accessor: (item) => item.event.name,
			header: 'Event'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { sortKeys } = pluginStates.sort;
	const { hasNextPage, hasPreviousPage, pageIndex, pageSize, pageCount } = pluginStates.page;
</script>

<!-- <pre>$sortKeys = {JSON.stringify($sortKeys, null, 2)}</pre> -->

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
									<Button variant="ghost" on:click={props.sort.toggle}>
										<ArrowUpDown class={'h-4 w-4'} />
									</Button>
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

<Pagination.Root count={events.length} perPage={$pageSize} let:pages let:currentPage>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton
				on:click={() => {
					$pageIndex = $pageIndex - 1;
				}}
			>
				<ChevronLeft />
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item isVisible={currentPage == page.value}>
					<Pagination.Link
						{page}
						isActive={currentPage == page.value}
						on:click={() => {
							$pageIndex = page.value - 1;
						}}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton
				on:click={() => {
					$pageIndex = $pageIndex + 1;
				}}
			>
				<ChevronRight />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
