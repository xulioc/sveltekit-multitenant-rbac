<script lang="ts">
	export let logo: string | undefined = undefined;
</script>

{#if logo}
	<img alt="logo" class="h-10" src={logo} />
{/if}
