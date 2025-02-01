<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import type { WithoutChild } from 'bits-ui';
	import * as Alert from '$lib/components/ui/alert/index.js';

	let {
		ref = $bindable(null),
		class: className,
		errorClasses,
		children: childrenProp,
		...restProps
	}: WithoutChild<FormPrimitive.FieldErrorsProps> & {
		errorClasses?: string | undefined | null;
	} = $props();
</script>

<FormPrimitive.FieldErrors bind:ref {...restProps}>
	{#snippet children({ errors, errorProps })}
		{#if errors.length > 0}
			<Alert.Root class="border-destructive">
				<Alert.Title class="text-destructive">The database format is not respected</Alert.Title>
				<Alert.Description>
					{#each errors as error}
						<div {...errorProps}><pre>{error}</pre></div>
					{/each}
				</Alert.Description>
			</Alert.Root>
		{/if}
	{/snippet}
</FormPrimitive.FieldErrors>
