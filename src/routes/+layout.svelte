<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { accept } from '$lib/previewSDK';

	let { children } = $props();

	onMount(() => {
		accept(window.origin);
	});
</script>

{@render children?.()}
