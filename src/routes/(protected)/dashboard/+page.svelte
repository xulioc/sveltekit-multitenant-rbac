<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';

	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import DashboardPage from '$lib/components/DashboardPage.svelte';
	import { ChartArea, StickyNote, ThermometerSun } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	console.log('PAGE DATA > ', $page.data);
</script>

<DashboardPage>
	<span slot="content">
		<div class="grid gap-4">
			<Card.Root>
				<Card.Header>
					<Card.Title
						><span class="text-3xl font-extrabold">
							Hi {$page.data.user.email} !
						</span></Card.Title
					>
					{#if 'PUBLIC_APP_NAME' in env}
						<Card.Description>
							<span class="text-xl">
								Welcome to {env.PUBLIC_APP_NAME}
							</span>
						</Card.Description>
					{/if}
				</Card.Header>
				<Card.Content>
					<div class="grid gap-5">
						<p class=" text-xl">
							After sign-up an organization is created for you with your email as the organization
							name and you have the 'admin' role. You can find the currently selected organization
							in the top right of the screen.
						</p>

						{#if $page.data.user.super}
							<dev class="flex items-center">
								<p class="text-xl text-destructive">
									You are 'superuser'. This is why you see the red icon in the navigation bar on
									top. You can do everything! You have also acess to 'superuser' pages in the left
									menu.
								</p>
							</dev>
						{/if}

						{#if $page.data.roles.includes('admin')}
							<dev class="flex items-center">
								<p class="text-xl text-primary">
									You have the role 'admin' in this group. This is why you see the blue icon in the
									navigation bar on top. You have also acess to 'admin' pages in the left menu.
								</p>
							</dev>
						{/if}
					</div>
				</Card.Content>
				<Card.Footer class="flex justify-end">
					<Button on:click={() => toast.success('You are welcome!')}>Thanks</Button>
				</Card.Footer>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Let's try things!</Card.Title>
					<!-- <Card.Description>Card Description</Card.Description> -->
				</Card.Header>
				<Card.Content>
					<ol class="list-inside list-disc">
						<li>
							Visit the dashboard sample pages
							<ol class="ml-5 list-inside list-none">
								<!-- <li><HomeIcon class="inline"></HomeIcon></li> -->
								<li>
									<div>
										<ThermometerSun class="inline"></ThermometerSun>
										Sample page with location and weather information with charts.
									</div>
								</li>
								<li>
									<div>
										<StickyNote class="inline"></StickyNote>
										Sample page with dashboard examples from shadcn-svelte.
									</div>
								</li>
								<li>
									<div>
										<ChartArea class="inline"></ChartArea>
										Sample page with charts from layerchart.
									</div>
								</li>
							</ol>
						</li>
						<!-- ... -->
					</ol>
				</Card.Content>
				<!-- <Card.Footer>
					<p>Card Footer</p>
				</Card.Footer> -->
			</Card.Root>
		</div>
	</span>
</DashboardPage>
