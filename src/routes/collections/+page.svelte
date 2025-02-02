<script lang="ts">
	import type { PageData } from './$types.js';
	import CollectionsTables from "$lib/components/containers/collections-tables.svelte";

	let { data }: { data: PageData } = $props();
</script>

<CollectionsTables collections={data.collections}/>