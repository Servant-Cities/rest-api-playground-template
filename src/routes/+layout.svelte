<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { onMount } from 'svelte';
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { accept } from '$lib/previewSDK';

	let { children } = $props();

	onMount(() => {
		accept(window.origin);
	});
</script>

<ModeWatcher />
<Toaster />
{@render children?.()}
