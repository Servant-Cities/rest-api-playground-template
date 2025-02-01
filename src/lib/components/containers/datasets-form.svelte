<script lang="ts">
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import Eye from 'lucide-svelte/icons/eye';
	import type { Infer } from 'sveltekit-superforms';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
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
	let collapsibleOpen = $state(false);
</script>

<Collapsible.Root class="w-full space-y-2" bind:open={collapsibleOpen}>
	<div class="flex items-center justify-between space-x-4">
		{#if activeDatasetItem}
			<h4 class="font-semibold">
				Currently exposing {Object.keys(activeDatasetItem[1]).length -
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
			<li class="my-2 flex items-center justify-between rounded-md border px-4 py-3 font-mono">
				{activeDatasetItem[0]}<Avatar.Root
					><Avatar.Fallback
						>{Object.keys(activeDatasetItem[1]).length -
							(activeDatasetItem[1].hidden ? 1 : 0)}</Avatar.Fallback
					></Avatar.Root
				>
			</li>
		{/if}
		{#if inactiveDatasetsItems}
			{#each inactiveDatasetsItems as [name, dataset]}
				<li class="my-2 flex items-center justify-between rounded-md border px-4 py-3 font-mono">
					{name}<Avatar.Root
						><Avatar.Fallback>{Object.keys(dataset).length}</Avatar.Fallback></Avatar.Root
					>
				</li>
			{/each}
		{/if}
		<Collapsible.Content class="space-y-2">
			{#if hiddenDatasets}
				{#each hiddenDatasets as [name, dataset]}
					<li class="my-2 flex items-center justify-between rounded-md border px-4 py-3 font-mono">
						{name}<span class="flex items-center">
							<Badge class="mr-4 text-sm">Hidden</Badge><Avatar.Root>
								<Avatar.Fallback>{Object.keys(dataset).length - 1}</Avatar.Fallback>
							</Avatar.Root></span
						>
					</li>
				{/each}
			{/if}
		</Collapsible.Content>
	</ul>
</Collapsible.Root>
