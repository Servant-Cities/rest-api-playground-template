<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	let { form } = $props();

	const login = (secret: string) => {
		navigator.clipboard.writeText(secret);
		goto('/login');
	};
</script>

{#if form?.success}
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-green-500">Database created!</Card.Title>
			<Card.Description>Keep your secret to login:</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>{form.secret}</p>
		</Card.Content>
		<Card.Footer>
			<Button class="flex-auto" onclick={() => login(form.secret)}>Copy and login</Button>
		</Card.Footer>
	</Card.Root>
{:else}
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Create a new database</h1>
		<p class="text-sm text-muted-foreground">Enter a name (letters and space only)</p>
	</div>
	<div class="grid gap-6">
		<form method="POST" use:form>
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
{/if}
