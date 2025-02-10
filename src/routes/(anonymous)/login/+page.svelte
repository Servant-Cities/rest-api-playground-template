<script lang="ts">
	import TenantAuthForm from '$lib/components/containers/tenant-auth-form.svelte';

	let { form } = $props();
</script>

<div class="flex flex-col space-y-2 text-center">
	<h1 class="text-2xl font-semibold tracking-tight">Connect to your Playground</h1>
	<p class="text-sm text-muted-foreground">Enter your secret here to connect</p>
</div>
<TenantAuthForm {form} />
