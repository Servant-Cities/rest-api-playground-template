<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { SavedPreviewsSchema } from '$lib/schema';
	import { getDatabaseProperty } from '$lib/databaseUtils';

	let {
		search,
		onSubmit
	}: {
		search: string;
		onSubmit: (url: string) => void;
	} = $props();

	let savedPreviews: SavedPreviewsSchema = $state([]);
	let filteredPreviews: SavedPreviewsSchema = $state([]);
	let searchQuery = $state(search);

	function filterPreviews() {
		filteredPreviews = savedPreviews.filter(
			({ name, url }) =>
				name.includes(searchQuery) ||
				url.includes(searchQuery)
		);
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		filteredPreviews = [];
		onSubmit(searchQuery);
	}

	function selectPreview(url: string) {
		searchQuery = url;
		filteredPreviews = [];
		onSubmit(url);
	}

	onMount(async () => {
		const savedPreviewsResponse = await getDatabaseProperty('saved-previews');
        savedPreviews = await savedPreviewsResponse.json();
	});
</script>

<form onsubmit={handleSubmit} class="flex flex-col p-1 gap-1">
	<div class="flex gap-2">
		<Input
			bind:value={searchQuery}
			onchange={filterPreviews}
			placeholder="Search or enter URL"
			class="rounded-md bg-primary text-primary-foreground"
		/>

		<Button type="submit" variant="outline" class="bg-primary text-white">Load</Button>
	</div>
	{#if filteredPreviews.length > 0}
		<ul class="rounded border border-primary bg-white text-black">
			{#each filteredPreviews as { name, url }}
				<li class="cursor-pointer p-2 hover:bg-gray-200" onclick={() => selectPreview(url)}>
					{name}
				</li>
			{/each}
		</ul>
	{/if}
</form>
