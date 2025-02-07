<script lang="ts">
	import type { PageData } from './$types.js';
	import type { LayoutData } from '../$types.js';
	import Configuration from '$lib/components/containers/configuration.svelte';
	let { data }: { data: PageData & LayoutData } = $props();
</script>

<h2 class="font-semibold text-xl">Settings</h2>
<span class="text-muted-foreground">{data.description}</span>
<ul class="flex flex-col gap-8 mt-8">
	{#each data.settings as [name, { description, value }]}
		<Configuration
			{name}
			{description}
			JSONvalue={typeof value !== 'string' ? JSON.stringify(value, null, 4) : String(value)}
		/>
	{/each}
</ul>
