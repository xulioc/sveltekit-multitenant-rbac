<script lang="ts">
	import { page } from '$app/stores';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { MENU } from '$lib/constants';
	import { LayoutDashboard } from 'lucide-svelte';
	import Settings from 'lucide-svelte/icons/settings';
</script>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
	<nav class="flex flex-col items-center gap-4 px-2 py-4">
		<a
			href="/"
			class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
		>
			<LayoutDashboard class="h-4 w-4 transition-all group-hover:scale-110" />
		</a>

		{#each MENU.user as m}
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href={m.dest}
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						use:builder.action
						{...builder}
					>
						<svelte:component this={m.icon} class="h-5 w-5" />
						<span class="sr-only">{m.label}</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">{m.label}</Tooltip.Content>
			</Tooltip.Root>
		{/each}

		{#if $page.data.roles.includes('admin')}
			{#each MENU.admin as m}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href={m.dest}
							class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<svelte:component this={m.icon} class="h-5 w-5 text-primary" />
							<span class="sr-only">{m.label}</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">{m.label}</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		{/if}

		{#if $page.data.user.super}
			{#each MENU.super as m}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href={m.dest}
							class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<svelte:component this={m.icon} class="h-5 w-5 text-destructive" />
							<span class="sr-only">{m.label}</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">{m.label}</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		{/if}
	</nav>
	<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
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
	</nav>
</aside>
