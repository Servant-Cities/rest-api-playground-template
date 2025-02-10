import { redirect, type Handle } from '@sveltejs/kit';
import { masterDB, getDB } from '$lib/server/database';
import { authorizedKeySchema } from '$lib/schema';

export const handle: Handle = async ({ event, resolve }) => {
	const selfService = await masterDB.getData('/application-settings/self-service-keys/value');
	if (selfService) {
		if (event.url.pathname === '/new') return resolve(event);
	} else {
		if (event.url.pathname === '/new') throw redirect(307, '/');
	}

	const requireAuth = await masterDB.getData('/application-settings/require-authentication/value');
	const authorizedKeys = await masterDB.getData('/application-settings/authorized-keys/value');
	if (requireAuth) {
		if (event.url.pathname === '/login') return resolve(event);
	} else {
		event.locals.db = masterDB;
		const { secret, ...tenant } = authorizedKeys[0];
		event.locals.tenant = tenant;
		if (event.url.pathname === '/login') throw redirect(307, '/');
		return await resolve(event);
	}

	let requestSecret = event.cookies.get('secret') || event.request.headers.get('Authorization');
	if (requestSecret) {
		if (requestSecret.startsWith('Bearer ')) {
			requestSecret = requestSecret.slice(7);
		}

		const access = authorizedKeySchema.safeParse(
			authorizedKeys.find(({ secret }) => secret === requestSecret)
		);

		if (access.success) {
			const db = getDB(access.data.db);
			if (!db) {
				return new Response('This database was deleted or have not been created.', { status: 404 });
			}

			const { secret, ...tenant } = access.data;

			event.locals.db = db;
			event.locals.tenant = tenant;

			const accessIndex = await masterDB.getIndex(
				`/application-settings/authorized-keys/value`,
				secret,
				'secret'
			);
			const time = new Date(Date.now()).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			});
			await masterDB.push(`/application-settings/authorized-keys/value/${accessIndex}`, {
				...access.data,
				'last-used': time
			});
			console.log(
				`${access.data.name} requested ${new URL(event.request.url).pathname} at ${time}`
			);

			return await resolve(event);
		}
		throw redirect(307, '/login?/disconnect');
	}

	if (event.url.pathname.startsWith('/api/')) {
		return new Response('Unauthorized', { status: 401 });
	}

	throw redirect(307, '/login');
};
