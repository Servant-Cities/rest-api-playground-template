<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { SavedPreviewSchema } from '$lib/schema';
	import createFetchOverride from './fetchOverride';

	let { preview }: { preview: Partial<SavedPreviewSchema> & Pick<SavedPreviewSchema, 'url'> } = $props();

	let iFrame = $state<HTMLIFrameElement | null>(null);
	let loaded = $state(false);

	const handleIframeLoad = () => {
		loaded = true;
		console.log('iframe loaded');

		if (iFrame?.contentWindow) {
			const iFrameFetch = iFrame.contentWindow.fetch;
			iFrame.contentWindow.fetch = createFetchOverride({ iFrameFetch, preview });
		}
	};

	onMount(() => {
		iFrame.addEventListener('load', handleIframeLoad);

		onDestroy(() => {
			loaded = false;
			iFrame?.removeEventListener('load', handleIframeLoad);
		});
	});
</script>

<iframe bind:this={iFrame} title="preview" class="h-[65vh] w-full overflow-y-auto{loaded ? "bg-white" : ''}" src={preview.url}></iframe>
