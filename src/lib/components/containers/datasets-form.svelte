<script lang="ts">
	import type { Infer } from 'sveltekit-superforms';
	import type { DatasetSchema } from '$lib/schema';

	let {
		datasets,
		activeDataset
	}: { datasets?: Array<[string, Infer<DatasetSchema>]>; activeDataset?: string } = $props();
	const activeDatasetItem = datasets?.find(([name]) => name === activeDataset);
	const inactiveDatasetsItems = datasets?.filter(
		([name, { hidden }]) => name !== activeDataset && !hidden
	);
	const hiddenDatasets = datasets?.filter(([name, { hidden }]) => name !== activeDataset && hidden);
</script>

<ul>
	{#if activeDatasetItem}
		<li><strong>Active: {activeDatasetItem[0]}</strong></li>
	{/if}
	{#if inactiveDatasetsItems}
		{#each inactiveDatasetsItems as [name, dataset]}
			<li>unactive: {name}</li>
		{/each}
	{/if}
	{#if hiddenDatasets}
		{#each hiddenDatasets as [name, dataset]}
			<li>hidden: {name}</li>
		{/each}
	{/if}
</ul>
