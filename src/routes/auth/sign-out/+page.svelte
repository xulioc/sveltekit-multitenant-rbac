<!-- routes/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<button>Sign out</button>
</form>
