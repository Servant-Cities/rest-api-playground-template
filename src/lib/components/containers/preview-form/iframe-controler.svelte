<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { SavedPreviewSchema } from '$lib/schema';
	import getSecret from '$lib/getSecret';

	let { preview }: { preview: Partial<SavedPreviewSchema> & Pick<SavedPreviewSchema, 'url'> } =
		$props();

	let iFrame = $state<HTMLIFrameElement | null>(null);
	let loaded = $state(false);

	const sendPreviewData = () => {
		if (iFrame?.contentWindow) {
			iFrame.contentWindow.postMessage(
				{
					type: 'REQUEST_PREVIEW_SDK',
					preview: JSON.stringify(preview),
					secret: getSecret()
				},
				new URL(preview.url).origin
			);
		}
	};

	const handleIframeLoad = () => {
		setTimeout(sendPreviewData, 100);
		loaded = true;
	};

	onMount(() => {
		iFrame.addEventListener('load', handleIframeLoad);
	});

	onDestroy(() => {
		loaded = false;
		iFrame?.removeEventListener('load', handleIframeLoad);
	});
</script>

<iframe
	bind:this={iFrame}
	title="preview"
	class="mt-1 h-[65vh] w-full overflow-y-auto rounded-md p-1 {loaded ? 'bg-grey' : 'bg-black'}"
	src={preview.url}
></iframe>
