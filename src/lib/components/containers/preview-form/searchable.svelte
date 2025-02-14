<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { SavedPreviewSchema } from '$lib/schema';
	import { getDatabaseProperty } from '$lib/databaseUtils';

	let {
		search,
		onSubmit
	}: {
		search: string;
		onSubmit: (preview: SavedPreviewSchema | Pick<SavedPreviewSchema, 'url'>) => void;
	} = $props();

	let savedPreviews: Array<SavedPreviewSchema> = $state([]);
	let filteredPreviews: Array<SavedPreviewSchema> = $state([]);
	let searchQuery = $state(search);

	const filterPreviews = () => {
		filteredPreviews = savedPreviews.filter(
			({ name, url }) => name.includes(searchQuery) || url.includes(searchQuery)
		);
	};

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		filteredPreviews = [];
		onSubmit({ url: searchQuery, pathsMap: { '/api/*': '/api/REST/' } });
	};

	const selectPreview = (preview: SavedPreviewSchema) => {
		searchQuery = preview.url;
		filteredPreviews = [];
		onSubmit(preview);
	};

	const createKeydownHandler = (preview: SavedPreviewSchema) => (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			selectPreview(preview);
		}
	};

	onMount(async () => {
		const savedPreviewsResponse = await getDatabaseProperty(
			'application-settings/saved-previews/value'
		);
		const previews = await savedPreviewsResponse.json();
		savedPreviews = previews;
		filteredPreviews = previews;
	});
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-1 p-1">
	<div class="flex gap-2">
		<Input
			bind:value={searchQuery}
			oninput={filterPreviews}
			placeholder="Search or enter URL"
			class="rounded-md bg-black text-white"
		/>

		<Button type="submit" variant="outline" class="bg-black text-white">Load</Button>
	</div>
	{#if filteredPreviews.length > 0}
		<ul class="mt-1 rounded border">
			{#each filteredPreviews as preview}
				<li
					class="cursor-pointer p-2 hover:bg-gray-200 hover:text-black focus:bg-gray-300"
					onclick={() => selectPreview(preview)}
					onkeydown={createKeydownHandler(preview)}
				>
					{preview.name}
				</li>
			{/each}
		</ul>
	{/if}
</form>
