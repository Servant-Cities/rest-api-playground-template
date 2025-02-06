<script lang="ts">
	import type { PageData } from './$types.js';
	import DatabaseForm from '$lib/components/containers/database-form/database-form.svelte';
	import type { LayoutData } from '../$types.js';
	let { data }: { data: PageData & LayoutData } = $props();
</script>

<DatabaseForm {data} />
