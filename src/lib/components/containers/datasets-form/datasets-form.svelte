<script lang="ts">
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import Eye from 'lucide-svelte/icons/eye';
	import { invalidateAll } from '$app/navigation';
	import type { Infer } from 'sveltekit-superforms';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { DatasetSchema } from '$lib/schema';
	import DatasetItem from './dataset-item.svelte';

	let {
		datasets,
		activeDataset
	}: { datasets?: Array<[string, Infer<DatasetSchema>]>; activeDataset?: string } = $props();
	const activeDatasetItem = datasets?.find(([name]) => name === activeDataset);
	const inactiveDatasetsItems = datasets?.filter(
		([name, { hidden }]) => name !== activeDataset && !hidden
	);
	const hiddenDatasets = datasets?.filter(([name, { hidden }]) => name !== activeDataset && hidden);
	let collapsibleOpen = $state(false);
</script>

<Collapsible.Root class="w-full space-y-2" bind:open={collapsibleOpen}>
	<div class="flex items-center justify-between space-x-4">
		{#if activeDatasetItem}
			<h4 class="font-semibold">
				REST API is currently exposing {Object.keys(activeDatasetItem[1]).length -
					(activeDatasetItem[1].hidden ? 1 : 0)} collections from {activeDatasetItem[0]}
			</h4>
		{:else}
			<h4 class="font-semibold">Select a dataset to activate</h4>{/if}
		<Collapsible.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'w-9 p-0' })}>
			{#if collapsibleOpen}<Eye />{:else}<EyeOff />{/if}
			<span class="sr-only">Toggle hidden datasets</span>
		</Collapsible.Trigger>
	</div>
	<ul class="list-none">
		{#if activeDatasetItem}
			<DatasetItem name={activeDatasetItem[0]} dataset={activeDatasetItem[1]} />
		{/if}
		{#if inactiveDatasetsItems}
			{#each inactiveDatasetsItems as [name, dataset]}
				<DatasetItem {name} {dataset} />
			{/each}
		{/if}
		<Collapsible.Content class="space-y-2">
			{#if hiddenDatasets}
				{#each hiddenDatasets as [name, dataset]}
					<DatasetItem {name} {dataset} />
				{/each}
			{/if}
		</Collapsible.Content>
	</ul>
</Collapsible.Root>
