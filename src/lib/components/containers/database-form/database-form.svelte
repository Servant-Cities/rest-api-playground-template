<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { databaseSchema, type DatabaseSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<DatabaseSchema>> } } = $props();

	const form = superForm(data.form, {
        dataType: 'json',
		validators: zodClient(databaseSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="w-full">
	<Form.Field {form} name="body">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>JSON data</Form.Label>
				<Textarea {...props} bind:value={$formData.body} class="h-[70vh] bg-primary text-primary-foreground"/>
			{/snippet}
		</Form.Control>
		<Form.Description>Edit the JSON database</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>
