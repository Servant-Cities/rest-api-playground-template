<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import type { CollectionSchema } from '$lib/schema';

	let { collections }: { collections: Array<[string, CollectionSchema]> } = $props();
	let selectedCollection = $state(collections?.[0]?.[0] || '');

	const collectionExample = `"datasets": {
	"dataset-example": {
		"collection-example": [
			{
				"id": "Example"
			}
		]
	}
}`;
</script>

{#if collections.length === 0}
	<Alert.Root class="border-destructive dark:bg-destructive dark:bg-opacity-40">
		<Alert.Title class="font-semibold text-destructive dark:text-foreground">
			There are no collections in this dataset
		</Alert.Title>
		<Alert.Description >
			<div class="my-2">Please use the database editor to copy this example in your datasets object</div>
			<pre class="bg-green-500 bg-opacity-40 p-2">{collectionExample}</pre>
		</Alert.Description>
	</Alert.Root>
{:else}
	<Tabs.Root
		bind:value={selectedCollection}
		class="h-[70vh] overflow-auto rounded-md border border-white bg-black text-white"
	>
		<Tabs.List class="dark flex w-full gap-1 rounded-s-none">
			{#each collections as [option]}
				<Tabs.Trigger class="w-full" value={option}>{option}</Tabs.Trigger>
			{/each}
		</Tabs.List>
		{#each collections as [collectionName, resources]}
			<Tabs.Content value={collectionName} class="mt-0">
				<Table.Root>
					<Table.Caption>
						We are waiting for Tanstack tables to be svelte5 compatible so we can replace the raw
						column with actual columns
					</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Index</Table.Head>
							<Table.Head>Raw</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each resources as resource, index}
							<Table.Row id={resource.id}>
								<Table.Cell class="font-medium">{index}</Table.Cell>
								<Table.Cell><pre>{JSON.stringify(resource, null, 4)}</pre></Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
{/if}
