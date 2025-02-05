import { redirect, type Handle } from '@sveltejs/kit';
import { masterDB, getDB } from '$lib/server/database';
import { authorizedKeySchema } from '$lib/schema';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/login') return resolve(event);

	const requireAuth = await masterDB.getData('/application-settings/require-authentication/value');
	if (!requireAuth) return await resolve(event);

	const requestSecret = event.cookies.get('secret');

	if (requestSecret) {
		const authorizedKeys = await masterDB.getData('/application-settings/authorized-keys');
		const access = authorizedKeySchema.safeParse(
			authorizedKeys?.value.find(({ secret }) => secret === requestSecret)
		);

		if (access.success) {
			const db = getDB(access.data.db);
			if (!db) {
				return new Response('Database not found', { status: 404 });
			}

			event.locals.db = db;
			event.locals.tenant = access.data.name;
			console.log(`${access.data.name} requested ${new URL(event.request.url).pathname}`);

			return await resolve(event);
		}
		return new Response('Forbidden', { status: 403 });
	}

	throw redirect(307, '/login');
};
