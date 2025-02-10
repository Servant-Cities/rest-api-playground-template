<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	let { form } = $props();
</script>

<div class="grid gap-6">
	<form method="POST" use:form>
		{#if form?.success}
			<Alert.Root>
				<Alert.Title class="text-green-500">Database created!</Alert.Title>
				<Alert.Description>
					<p>Keep your secret to login:</p>
					<p>{form.secret}</p>
				</Alert.Description>
			</Alert.Root>
		{:else}
			<div class="grid gap-2">
				<div class="grid gap-1">
					<Label class="sr-only" for="db">Database name</Label>
					<Input id="db" name="db" disabled={form?.pending} />
				</div>
				<Button type="submit" disabled={form?.pending}>
					{#if form?.pending}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Create
				</Button>
			</div>
		{/if}
	</form>
	{#if form?.error}
		<p class="text-center text-red-500">
			{form?.error.message || 'Failed to create the database. Please try again.'}
		</p>
	{/if}
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground">
				Or download the source code from
			</span>
		</div>
	</div>
	<Button
		variant="outline"
		target="_blank"
		href="https://github.com/Servant-Cities/rest-api-playground-template"
	>
		GitHub
	</Button>
</div>
