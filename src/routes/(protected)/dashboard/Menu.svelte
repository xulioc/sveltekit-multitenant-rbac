<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { MENU } from '$lib/constants';
	import { LayoutGridIcon } from 'lucide-svelte';
	import Settings from 'lucide-svelte/icons/settings';
</script>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
	<nav class="flex flex-col items-center gap-3 px-2 py-4">
		<a
			href="/"
			class="group mb-5 flex h-11 w-11 shrink-0 items-center justify-center bg-primary p-0 text-lg font-semibold text-primary-foreground md:text-base"
		>
			<LayoutGridIcon class="h-5 w-5 transition-all group-hover:scale-75" />
		</a>

		{#each MENU.user as m}
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<div use:builder.action {...builder} class:bg-secondary={$page.url.pathname == m.dest}>
						<Button href={m.dest} variant="ghost" class="h-12 w-12 rounded-none p-0">
							<svelte:component this={m.icon} />
						</Button>
					</div>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">{m.label}</Tooltip.Content>
			</Tooltip.Root>
		{/each}

		{#if $page.data.roles.includes('admin')}
			<Separator></Separator>
			{#each MENU.admin as m}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<div use:builder.action {...builder} class:bg-secondary={$page.url.pathname == m.dest}>
							<Button href={m.dest} variant="ghost" class="h-12 w-12 rounded-none p-0">
								<svelte:component this={m.icon} class="text-primary" />
							</Button>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">{m.label}</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		{/if}

		{#if $page.data.user.super}
			<Separator></Separator>
			{#each MENU.super as m}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<div use:builder.action {...builder} class:bg-secondary={$page.url.pathname == m.dest}>
							<Button href={m.dest} variant="ghost" class="h-12 w-12 rounded-none p-0">
								<svelte:component this={m.icon} class="text-destructive" />
							</Button>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">{m.label}</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		{/if}

		<Separator></Separator>
	</nav>
	<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
		<Sheet.Root>
			<Sheet.Trigger>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="##"
							class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Settings class="h-5 w-5" />
							<span class="sr-only">Settings</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Settings</Tooltip.Content>
				</Tooltip.Root>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title>Settings</Sheet.Title>
					<Sheet.Description>Settings example sheet.</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</nav>
</aside>
