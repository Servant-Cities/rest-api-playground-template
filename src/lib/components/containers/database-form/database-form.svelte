<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { databaseEditorSchema, type DatabaseEditorSchema } from '../../../schema';
	import DatabaseFormatError from './database-format-error.svelte';

	let {
		data
	}: { data: { form: SuperValidated<Infer<DatabaseEditorSchema>>; tenant: { db: string } } } =
		$props();

	const form = superForm(data.form, {
		dataType: 'json',
		validators: zodClient(databaseEditorSchema),
		onResult({ result }) {
			if (result.type === "success") {
				toast('Database updated successfully!');
			}
		}
	});

	const { form: formData, enhance } = form;

	function downloadJson() {
		const jsonData = JSON.stringify($formData.rawData, null, 2);
		const blob = new Blob([jsonData], { type: 'application/json' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = data.tenant.db;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<form method="POST" use:enhance class="w-full">
	<Form.Field {form} name="rawData" class="mb-4">
		<Form.Control>
			{#snippet children({ props })}
				<Textarea {...props} bind:value={$formData.rawData} class="h-[70vh] bg-black text-white" />
			{/snippet}
		</Form.Control>
		<Form.Description>Edit database data</Form.Description>
		<DatabaseFormatError />
	</Form.Field>
	<Form.Button>Update</Form.Button>
	<Button type="button" onclick={downloadJson} class="ml-4 rounded px-4 py-2">Export</Button>
</form>
