<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import createFetchOverride from './fetchOverride';

	let { previewURL }: { previewURL: string } = $props();

	let iFrame = $state<HTMLIFrameElement | null>(null);
	let loaded = $state(false);

	const handleIframeLoad = () => {
		console.log('iframe loaded');
		loaded = true;

		if (iFrame?.contentWindow) {
			const iFrameFetch = iFrame.contentWindow.fetch;
			iFrame.contentWindow.fetch = createFetchOverride({ iFrameFetch, paths: ['/api/*'] });
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

<iframe bind:this={iFrame} title="preview" class="h-full w-full {loaded ? "bg-white" : ''}" src={previewURL}></iframe>
