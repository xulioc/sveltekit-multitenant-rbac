<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import { Menu } from 'lucide-svelte';
	import GroupSelect from './GroupSelect.svelte';
	import MenuBar from './MenuBar.svelte';

	let open = $state(false);
</script>

<header class="flex items-center gap-4 border-b bg-background px-4 py-4">
	<Sheet.Root bind:open onOpenChange={() => {}}>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="w-20 sm:max-w-xs">
			<MenuBar></MenuBar>
		</Sheet.Content>
	</Sheet.Root>

	<div class="w-full flex-1">
		<!-- {#if 'PUBLIC_APP_NAME' in env}
			<p class="hidden pl-2 text-xl font-semibold md:block">{env.PUBLIC_APP_NAME}</p>
		{/if} -->
	</div>

	{#if $page.data.user.super}
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} variant="destructive" size="sm">S</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>You are superuser</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/if}

	{#if $page.data.roles.includes('admin')}
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button builders={[builder]} size="sm">A</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>You are group admin</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/if}

	<GroupSelect></GroupSelect>
	<LightSwitch></LightSwitch>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				size="icon"
				class="overflow-hidden rounded-full"
			>
				<Avatar.Root>
					<Avatar.Fallback>{$page.data.user?.email.slice(0, 2).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>{$page.data.user?.email}</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<form class="w-full" method="POST" action="/auth/sign-out" use:enhance>
					<button class="w-full text-left"> Sign out </button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header>
