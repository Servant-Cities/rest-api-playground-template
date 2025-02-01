<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { databaseSchema, type DatabaseSchema } from '../../../schema';
	import DatabaseFormatError from './database-format-error.svelte';

	let { data }: { data: { form: SuperValidated<Infer<DatabaseSchema>> } } = $props();

	const form = superForm(data.form, {
        dataType: 'json',
		validators: zodClient(databaseSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="w-full">
	<Form.Field {form} name="rawData" class="mb-4">
		<Form.Control>
			{#snippet children({ props })}
				<Textarea {...props} bind:value={$formData.rawData} class="h-[70vh] bg-primary text-primary-foreground"/>
			{/snippet}
		</Form.Control>
		<Form.Description>Edit database data</Form.Description>
		<DatabaseFormatError />
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>
