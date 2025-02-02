<script lang="ts">
	import { page } from '$app/state';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import IframeControler from './iframe-controler.svelte';

	const apiDocUrl = `${page.url.protocol}//${page.url.host}/api`;
	const defaultPreviewURL = `${page.url.protocol}//${page.url.host}/collections`;
	let urlInput = $state(defaultPreviewURL);
	let previewURL = $state(defaultPreviewURL);
</script>

<form
	class="flex-column h-[70vh] overflow-hidden border border-solid border-primary bg-primary text-primary-foreground"
>
	<div class="flex">
		<Input bind:value={urlInput} class="rounded-none bg-primary text-primary-foreground" />
		<Button
			onclick={() => (previewURL = urlInput)}
			variant="outline"
			class="rounded-none bg-primary text-primary-foreground">Preview</Button
		>
	</div>
	{#if previewURL}
		<IframeControler {previewURL} />
	{/if}
</form>
<Alert.Root class="mt-2">
	<Alert.Title>How do I load data in my app ?</Alert.Title>
	<Alert.Description>
		<ul>
			<li>You can connect the app you want to preview with the database using
			<a href={apiDocUrl} class="font-medium text-secondary-foreground underline"> the REST API </a>.</li>
			<li>We are also working on a solution to reroute iframe's requests directly to the playground server but it is not fully ready yet.</li>
			<li>It is currently catching all the url starting with /api/ and redirecting them to the local app's endpoints.</li>
			<li>You can observe this behaviour in the browser's console.</li>
		</ul>
	</Alert.Description>
</Alert.Root>
