<script lang="ts">
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import Eye from 'lucide-svelte/icons/eye';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { DatasetSchema } from '$lib/schema';
	import DatasetItem from './dataset-item.svelte';

	let {
		datasets,
		activeDataset
	}: { datasets?: Array<[string, DatasetSchema]>; activeDataset?: string } = $props();
	const activeDatasetItem = $derived(datasets?.find(([name]) => name === activeDataset));
	const inactiveDatasetsItems = $derived(datasets?.filter(
		([name, { hidden }]) => name !== activeDataset && !hidden
	));
	const hiddenDatasets = $derived(datasets?.filter(([name, { hidden }]) => name !== activeDataset && hidden));
	let collapsibleOpen = $state(false);
</script>

<Collapsible.Root bind:open={collapsibleOpen}>
	<Card.Root class="bg-black text-white h-[70vh] overflow-y-auto">
		<Card.Header>
			<div class="flex items-center justify-between space-x-4">
				<Card.Title>
					{#if activeDatasetItem}
						<h2 class="font-semibold text-xl">
							Datasets list
						</h2>
					{:else}
						<h2 class="font-semibold text-xl">Select a dataset to use</h2>
					{/if}
				</Card.Title>
				<Collapsible.Trigger class={buttonVariants({ variant: 'ghost', size: 'sm', class: 'py-1 px-2' })}>
					{#if collapsibleOpen}<span>Hide hidden datasets</span><Eye />{:else}<span>Show hidden datasets</span><EyeOff />{/if}
				</Collapsible.Trigger>
			</div>
			{#if activeDatasetItem}
				<Card.Description class="text-white">
					REST API is currently exposing {Object.keys(activeDatasetItem[1]).length -
						(activeDatasetItem[1].hidden ? 1 : 0)} collections from {activeDatasetItem[0]}
				</Card.Description>
			{/if}
		</Card.Header>
		<Card.Content>
			<ul class="list-none">
				{#if activeDatasetItem}
					<DatasetItem name={activeDatasetItem[0]} dataset={activeDatasetItem[1]} active/>
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
		</Card.Content>
	</Card.Root>
</Collapsible.Root>
