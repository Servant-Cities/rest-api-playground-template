<script lang="ts">
	import type { PageData } from './$types.js';
	import DatasetsForm from '$lib/components/containers/datasets-form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<DatasetsForm datasets={data.datasets} activeDataset={data.activeDataset} />
