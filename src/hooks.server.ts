import { redirect, type Handle } from '@sveltejs/kit';
import { masterDB, getDB } from '$lib/server/database';
import { authorizedKeySchema } from '$lib/schema';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/login') return resolve(event);

	const requireAuth = await masterDB.getData('/application-settings/require-authentication/value');
	const authorizedKeys = await masterDB.getData('/application-settings/authorized-keys');
	if (!requireAuth) {
		event.locals.db = masterDB;
		const { secret, ...tenant } = authorizedKeys.value[0];
		event.locals.tenant = tenant;
		return await resolve(event);
	}

	let requestSecret = event.cookies.get('secret') || event.request.headers.get('Authorization');
	if (requestSecret) {
		if (requestSecret.startsWith('Bearer ')) {
			requestSecret = requestSecret.slice(7);
		}

		const access = authorizedKeySchema.safeParse(
			authorizedKeys?.value.find(({ secret }) => secret === requestSecret)
		);

		if (access.success) {
			const db = getDB(access.data.db);
			if (!db) {
				return new Response('Database not created', { status: 404 });
			}

			const { secret, ...tenant } = access.data;

			event.locals.db = db;
			event.locals.tenant = tenant;
			console.log(`${access.data.name} requested ${new URL(event.request.url).pathname}`);

			return await resolve(event);
		}
		throw redirect(307, '/login?/disconnect');
	}

	if (event.url.pathname.startsWith('/api/')) {
		return new Response('Unauthorized', { status: 401 });
	}

	throw redirect(307, '/login');
};
