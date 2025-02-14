<script lang="ts">
	import { page } from '$app/state';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import type { SavedPreviewSchema } from '$lib/schema';
	import IframeControler from './iframe-controler.svelte';
	import Searchable from './searchable.svelte';

	const apiDocUrl = `${page.url.protocol}//${page.url.host}/api`;
	const defaultPreviewURL = ``;
	let preview: SavedPreviewSchema | Pick<SavedPreviewSchema, 'url'> = $state({
		url: defaultPreviewURL
	});

	const onSubmit = (value: typeof preview) => {
		preview = value;
	};
</script>

<div
	class="flex-column overflow-hidden rounded-md border border-solid border-black bg-black text-white"
>
	<Searchable search={preview.url} {onSubmit} />
	<IframeControler {preview} />
</div>
<Alert.Root class="mt-2">
	<Alert.Title>How do I load data in my app ?</Alert.Title>
	<Alert.Description>
		<ul>
			<li>
				You can connect the app you want to preview with the database using
				<a href={apiDocUrl} class="font-medium text-secondary-foreground underline">
					the REST API
				</a>.
			</li>
			<li>
				We are also working on a solution to reroute iframe's requests directly to the playground
				server but it is not fully ready yet.
			</li>
			<li>
				It is currently catching all the url starting with /api/ and redirecting them to the local
				app's endpoints.
			</li>
			<li>You can observe this behaviour in the browser's console.</li>
		</ul>
	</Alert.Description>
</Alert.Root>
