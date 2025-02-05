<script lang="ts">
	import Database from 'lucide-svelte/icons/database';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import Library from 'lucide-svelte/icons/library';
	import LogOut from 'lucide-svelte/icons/log-out';
	import MonitorCheck from 'lucide-svelte/icons/monitor-check';
	import CloudDownload from 'lucide-svelte/icons/cloud-download';
	import Gift from 'lucide-svelte/icons/gift';
	import { page } from '$app/state';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { tenant }: { tenant: string } = $props();

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
			title: 'Features',
			url: '/',
			icon: Gift
		}
	];

	const isActive = (url: string) => url === page.url.pathname;
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel class="mb-1">
				<span class="text-lg">{tenant || 'Playground'}</span>
			</Sidebar.GroupLabel>
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
	<Separator class="my-1" />
	<Sidebar.Footer class="p-0">
		<Sidebar.Menu>
			{#each footerItems as item (item.title)}
				<Sidebar.MenuItem class="px-2">
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
			<Separator />
			<Sidebar.MenuItem class="px-2 pb-1">
				<form method="POST" action="/login?/disconnect">
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<button type="submit" {...props}>
								<LogOut />
								<span>Log out</span>
							</button>
						{/snippet}
					</Sidebar.MenuButton>
				</form>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
