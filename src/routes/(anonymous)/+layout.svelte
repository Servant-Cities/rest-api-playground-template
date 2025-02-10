<script lang="ts">
	let { children } = $props();
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
			{@render children?.()}
		</div>
	</div>
</main>
