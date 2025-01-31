<script lang="ts">
	import Database from 'lucide-svelte/icons/database';
	import MonitorCheck from 'lucide-svelte/icons/monitor-check';
	import Settings from 'lucide-svelte/icons/settings';
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	const items = [
		{
			title: 'Database',
			url: '/database',
			icon: Database
		},
		{
			title: 'Preview',
			url: '/preview',
			icon: MonitorCheck
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
					{#each items as item (item.title)}
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
</Sidebar.Root>
