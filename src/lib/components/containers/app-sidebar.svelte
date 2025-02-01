<script lang="ts">
	import Database from 'lucide-svelte/icons/database';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import Library from 'lucide-svelte/icons/library';
	import MonitorCheck from 'lucide-svelte/icons/monitor-check';
	import CloudDownload from 'lucide-svelte/icons/cloud-download';
	import Settings from 'lucide-svelte/icons/settings';
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	const mainItems = [
		{
			title: 'Database',
			url: '/database',
			icon: Database
		},
		{
			title: 'Datasets',
			url: '/datasets',
			icon: ClipboardList
		},
		{
			title: 'Collections',
			url: '/collections',
			icon: Library
		},
		{
			title: 'Preview',
			url: '/preview',
			icon: MonitorCheck
		}
	];

	const footerItems = [
		{
			title: 'REST API',
			url: '/api',
			icon: CloudDownload
		},
		{
			title: 'Settings',
			url: '/',
			icon: Settings
		}
	];

	const isActive = (url: string) => url === page.url.pathname;
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Playground</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each mainItems as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props} data-active={isActive(item.url)}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			{#each footerItems as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props} data-active={isActive(item.url)}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
