<script lang="ts">
	import { navigating } from '$app/stores';
	import { loading } from '$lib/stores';
</script>

{#if $navigating || $loading}
	<div class="fixed-top absolute z-50 w-full">
		<div class="h-1.5 w-full overflow-hidden">
			<div class="progress left-right h-full w-full bg-primary"></div>
		</div>
	</div>
{/if}

<style>
	.progress {
		animation: progress 800ms infinite linear;
	}

	.left-right {
		transform-origin: 0% 50%;
	}
	@keyframes progress {
		0% {
			transform: translateX(0) scaleX(0);
		}
		40% {
			transform: translateX(0) scaleX(0.4);
		}
		100% {
			transform: translateX(100%) scaleX(0.5);
		}
	}
</style>
