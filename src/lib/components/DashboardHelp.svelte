<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
</script>

<Alert.Root>
	<Alert.Title>
		<slot name="title"></slot>
	</Alert.Title>
	<Alert.Description>
		<slot name="description"></slot>
	</Alert.Description>
</Alert.Root>
