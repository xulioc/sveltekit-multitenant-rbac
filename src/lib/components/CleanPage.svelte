<script lang="ts">
	type Props = {
		title: string;
		children?: any;
	};

	let { title, children }: Props = $props();
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2">
		<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
			{title}
		</h1>
		<p class="max-w-[700px] text-lg text-muted-foreground">
			{@render children()}
		</p>
	</div>
</section>
