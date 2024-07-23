<script lang="ts">
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	// https://blog.aakashgoplani.in/generate-breadcrumb-and-navigation-in-sveltekit

	let crumbs: Array<{ label: string; dest: string }> = [];

	// TODO CHANGE TO SVELTE 5
	$: {
		const tokens = $page.url.pathname.split('/').filter((t) => t !== '');

		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			return { label: t, dest: tokenPath };
		});

		crumbs[0] = { label: 'Home', dest: '/dashboard' };
	}

	// Add a way to get home too.
	// crumbs.unshift({ label: 'Home', dest: '/' });

	console.log(crumbs);
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each crumbs as b, index}
			{#if !b.label.startsWith('_')}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={b.dest}>
						{#if b.dest.includes('_admin')}
							<div class="text-primary">{b.label}</div>
						{:else if b.dest.includes('_super')}
							<div class="text-destructive">{b.label}</div>
						{:else}
							{b.label}
						{/if}
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				{#if index < crumbs.length - 1}
					<Breadcrumb.Separator />
				{/if}
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
