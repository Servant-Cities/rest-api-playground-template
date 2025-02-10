<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data } = $props();

	const { host, 'host-url': hostURL, processor, 'processor-url': processorURL } = data.notice;
</script>

<Card.Root class="dark">
	<Card.Header>
		<Card.Title>Information notice</Card.Title>
		<Card.Description class="text-white">
			You should find here all the information you need about this instance of
			<a href="https://github.com/Servant-Cities/rest-api-playground-template" target="_blank">
				the playground
			</a>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul class="flex flex-col list-disc gap-2 pl-4">
			<li>
				The service is deployed on
				<a href={hostURL} target="_blank" class="underline">
					{host}
				</a>
				by
				<a href={processorURL} target="_blank" class="underline">
					{processor}
				</a>
			</li>
			<li>
				The service is meant for application testing purpose, do not store critical or personnal
				data.
			</li>
			<li>
				Please read the settings description before updating anything, some actions might lock you
				out of make your database fill unusable.
			</li>
			<li>
				Be responsible for your own backups if you need it, you can export a copy of your database
				in the "Database" page or with file access to the "/databases" directory.
			</li>
            <li>
				Secrets are not passwords, they are stored without encryption and can be view, modified and deleted by 
                <a href={processorURL} target="_blank" class="underline">
					{processor}
				</a>
                without notice
			</li>
            <li>
				Please 
                <a href="https://github.com/Servant-Cities/rest-api-playground-template?tab=readme-ov-file#deploying" target="_blank" class="underline">install</a> 
                and secure an instance of your own if you'd like to use the service under more robust conditions.
			</li>
		</ul>
	</Card.Content>
</Card.Root>
<Alert.Root class="my-3">
	<Alert.Title>Are you new here ?</Alert.Title>
	<Alert.Description>
		We have a guided experience in the <a
			href="/collections"
			class="font-medium text-secondary-foreground underline">Collections view</a
		>
	</Alert.Description>
</Alert.Root>
