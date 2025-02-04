<script lang="ts">
	import type { PageData } from './$types.js';
	import DatabaseForm from '$lib/components/containers/database-form/database-form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<DatabaseForm {data} />
