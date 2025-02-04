<script lang="ts">
    import LoaderCircle from 'lucide-svelte/icons/loader-circle'
	import { cn } from "$lib/utils.js";
	import { Button } from "../ui/button";
	import { Input } from "../ui/input";
	import { Label } from "../ui/label";

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="secret">Secret</Label>
				<Input
					id="secret"
					type="secret"
					autocapitalize="none"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign me in
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2"> Or download the source code from</span>
		</div>
	</div>
	<Button variant="outline" target="_blank" href="https://github.com/Servant-Cities/rest-api-playground-template">
		GitHub
	</Button>
</div>