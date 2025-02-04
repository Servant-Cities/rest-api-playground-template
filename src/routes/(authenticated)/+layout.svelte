<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/containers/app-sidebar.svelte';

	let { children, data } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar tenant={data.tenant}/>
	<Sidebar.Trigger />
	<main class="p-10 w-full">
		{@render children?.()}
	</main>
</Sidebar.Provider>
