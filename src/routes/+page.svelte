<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import BookmarkCheck from 'lucide-svelte/icons/bookmark-check';
	import Bookmark from 'lucide-svelte/icons/bookmark';
    import ArchiveRestore from 'lucide-svelte/icons/archive-restore';

	const featureClasses = 'flex';
</script>

<Card.Root class="bg-primary text-primary-foreground">
	<Card.Header>
		<Card.Title>Features and Roadmap</Card.Title>
		<Card.Description class="text-primary-foreground"
			>The following features will be developped based on another project's needs but please let me
			know if you would like some more work done on this template.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<ul class="">
			<li class={featureClasses}>
				<BookmarkCheck aria-label="done" />
				Persistant dataset
			</li>
			<li class={featureClasses}>
				<BookmarkCheck aria-label="done" />
				REST API
			</li>
			<li class={featureClasses}>
				<BookmarkCheck aria-label="done" />
				Frontend preview
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Multiple datasets support
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Multiple frontends support
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Connect to a production app for in context preview
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Localized datasets
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Embeded S3
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Docker instalation
			</li>
			<li class={featureClasses}>
				<Bookmark aria-label="To be done" />
				Dataset volumes
			</li>
		</ul>
	</Card.Content>
	<Card.Footer class="flex-row-reverse">
		<Button href="https://github.com/Servant-Cities/rest-api-playground-template/issues/new?template=Blank+issue" target="_blank" variant="secondary"><ArchiveRestore class="mr-2 size-4" />˝Request a feature</Button>
	</Card.Footer>
</Card.Root>
<Alert.Root class="my-3">
	<Alert.Title>Are you new here ?</Alert.Title>
	<Alert.Description>
		We have a guided experience in the <a href="/collections" >Collections view</a>
	</Alert.Description>
</Alert.Root>
