<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { updateDatabaseProperty } from '$lib/databaseUtils';

	let { name, description, JSONvalue }: { name: string; description: string; JSONvalue: string } =
		$props();

	let value = $state(JSONvalue);
</script>

<li class="grid w-full gap-1.5">
    <div class="flex justify-between w-full">
        <div>
            <Label class="pb-1 font-semibold capitalize">{name}</Label>
            <p class="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
		<Button
			variant="outline"
			onclick={() => updateDatabaseProperty(`application-settings/${name}/value`, JSON.parse(value))}
		>
			Save
		</Button>
	</div>
	<Textarea
		class="field-sizing-content min-h-0 bg-black text-white"
		bind:value
		rows={JSONvalue.split(/\r\n|\r|\n/).length}
	/>
</li>
