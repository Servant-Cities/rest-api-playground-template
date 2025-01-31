<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
</script>

<Card.Root class="bg-primary text-primary-foreground">
	<Card.Header>
		<Card.Title>How to use the REST API</Card.Title>
		<Card.Description class="text-primary-foreground">
			There are two endpoints with 3 different methods each.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<p class="my-3"></p>
		<Alert.Root class="my-3">
			<Alert.Title>{`${page.url.protocol}//${page.url.host}/api/[collection-name]`}</Alert.Title>
			<Alert.Description>
				<ul>
					<li>GET: loads the collection array</li>
					<li>POST: pushes a new resource in the collection array</li>
					<li>DELETE: permanently delete the collection</li>
				</ul>
			</Alert.Description>
		</Alert.Root>
		<Alert.Root class="my-3">
			<Alert.Title>{`${page.url.protocol}//${page.url.host}/api/[collection-name]/[resource-id]`}</Alert.Title>
			<Alert.Description>
				<ul>
					<li>GET: loads the resource if it exists</li>
					<li>PUT: overides the resource with new data if it exists</li>
					<li>DELETE: permanently delete the resource if it exists</li>
				</ul>
			</Alert.Description>
		</Alert.Root>
		<Alert.Root class="my-3">
			<Alert.Title>Please be aware:</Alert.Title>
			<Alert.Description>
				<ul>
					<li>- Search params are not supported.</li>
					<li>- PUT and POST methods expect JSON format</li>
					<li>
						- It is technicaly possible to overide a resource's id, which you should normaly avoid
					</li>
					<li>- creating resources using PUT is not supported</li>
				</ul>
			</Alert.Description>
		</Alert.Root>
	</Card.Content>
	<Card.Footer>
		Feel free to update the code of your playground to add more endpoints and fit your own needs.
	</Card.Footer>
</Card.Root>
