<script>
	import { page } from '$app/stores';
	import CleanPage from '$lib/components/CleanPage.svelte';

	// console.log($page.url);
</script>

{#if $page.url.searchParams.has('emailSent')}
	<CleanPage title="Email sent succesfully">Please check your inbox</CleanPage>
{:else if $page.url.searchParams.has('passwordChanged')}
	<CleanPage title="Password updated successfully">
		Your password has been updated. You may now <a href="/auth/sign-in" class="underline">Sign In</a
		> with your new password.
	</CleanPage>
{/if}
