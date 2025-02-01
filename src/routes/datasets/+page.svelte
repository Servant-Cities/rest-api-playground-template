<script lang="ts">
	import type { PageData } from './$types.js';
	import DatasetsForm from '$lib/components/containers/datasets-form/datasets-form.svelte';

	let { data }: { data: PageData } = $props();
	const {datasets, activeDataset} = $derived(data)
	console.log({datasets, activeDataset})
</script>

<DatasetsForm {datasets} {activeDataset} />
