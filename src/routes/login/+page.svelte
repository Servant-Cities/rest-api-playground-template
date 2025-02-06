<script lang="ts">
	import TenantAuthForm from '$lib/components/containers/tenant-auth-form.svelte';

	let { form } = $props();
</script>

<main class="w-full h-screen flex">
	<div class="h-full w-full bg-black">
		<img src="logo_black.jpeg" width="100%" alt="Servant Cities' logo" class="relative inset-y-12"/>
		<h2 class="absolute top-8 left-8 text-white text-md font-mono">
			Carefully built by Servant Cities
        </h2>
	</div>
	<div class="h-full w-full flex flex-col justify-center border-l border-l-4">
		<div class="mx-auto flex w-full flex-col  space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Connect to your Playground</h1>
				<p class="text-sm text-muted-foreground">Enter your secret here to connect</p>
			</div>
			<TenantAuthForm {form}/>
		</div>
	</div>
</main>
