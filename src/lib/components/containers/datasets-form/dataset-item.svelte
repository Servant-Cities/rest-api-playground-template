<script lang="ts">
	import {
		addDatabaseProperty,
		updateDatabaseProperty,
		deleteDatabaseProperty
	} from '$lib/databaseUtils.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { DatasetSchema } from '$lib/schema';

	let { name, dataset, active }: { name: string; dataset: DatasetSchema; active?: boolean } =
		$props();
	const use = async () => updateDatabaseProperty('application-settings/active-dataset/value', name);
	const toggleHidden = async () =>
		dataset.hidden
			? deleteDatabaseProperty(`datasets/${name}/hidden`)
			: addDatabaseProperty(`datasets/${name}/hidden`, 'User asked to hide trough UI');

	const terminalStyle = 'dark';
</script>

<li class="my-4 flex w-full font-mono">
	{#if !active}
		<div class="mr-2 flex flex-col gap-2">
			<Button variant="outline" disabled={active} class={terminalStyle} onclick={use}>Use</Button>
			<Button variant="outline" disabled={active} class={terminalStyle} onclick={toggleHidden}
				>{dataset.hidden ? 'Show' : 'Hide'}</Button
			>
		</div>
	{/if}
	<span
		class="flex w-full items-center justify-between rounded-md border px-4 py-3 {terminalStyle}"
	>
		{name}
		<span class="flex items-center">
			{#if dataset.hidden}
				<Badge class="mr-4 text-sm">Hidden</Badge>
			{/if}
			<Avatar.Root>
				<Avatar.Fallback class="dark">
					{Object.keys(dataset).length - (dataset.hidden ? 1 : 0)}
				</Avatar.Fallback>
			</Avatar.Root>
		</span>
	</span>
</li>
