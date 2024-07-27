<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import GroupSelect from './GroupSelect.svelte';

	// console.log($page.data);
</script>

<header class="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 py-4">
	{#if 'PUBLIC_APP_NAME' in env}
		<p class="text-xl font-semibold">{env.PUBLIC_APP_NAME}</p>
	{/if}
	<!-- <Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
				<PanelLeft class="h-5 w-5" />
				<span class="sr-only">Toggle Menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="sm:max-w-xs">
			<nav class="grid gap-6 text-lg font-medium">
				<a
					href="##"
					class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
				>
					<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
					<span class="sr-only">Acme Inc</span>
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<Home class="h-5 w-5" />
					Dashboard
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<ShoppingCart class="h-5 w-5" />
					Orders
				</a>
				<a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
					<Package class="h-5 w-5" />
					Products
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<UsersRound class="h-5 w-5" />
					Customers
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<LineChart class="h-5 w-5" />
					Settings
				</a>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	-->

	<div class="relative ml-auto flex-1 md:grow-0">
		<!-- <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
		<Input
			type="search"
			placeholder="Search..."
			class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
		/> -->
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
					<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
					<Avatar.Fallback>{$page.data.user?.email.slice(0, 2).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>{$page.data.user?.email}</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>Settings</DropdownMenu.Item>
			<DropdownMenu.Item>Support</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<form method="POST" action="/auth/sign-out" use:enhance>
				<DropdownMenu.Item><button>Sign out</button></DropdownMenu.Item>
			</form>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header>
