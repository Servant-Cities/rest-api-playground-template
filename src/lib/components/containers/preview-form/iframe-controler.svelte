<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { SavedPreviewSchema } from '$lib/schema';

	let { preview }: { preview: Partial<SavedPreviewSchema> & Pick<SavedPreviewSchema, 'url'> } =
		$props();

	let iFrame = $state<HTMLIFrameElement | null>(null);
	let loaded = $state(false);

	const handleIframeLoad = () => {
		loaded = true;
		console.log('iframe loaded');

		if (iFrame?.contentWindow) {
			iFrame.contentWindow.postMessage(
				JSON.stringify({
					type: 'REQUEST_PREVIEW_SDK',
					params: preview
				}),
				new URL(preview.url).origin
			);
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

<iframe
	bind:this={iFrame}
	title="preview"
	class="h-[65vh] w-full overflow-y-auto mt-1 p-1 rounded-md {loaded ? 'bg-grey' : 'bg-black'}"
	src={preview.url}
></iframe>
