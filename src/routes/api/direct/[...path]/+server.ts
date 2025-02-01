import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';

const getPath = (url) => url.href.split('/direct')[1]

export const GET: RequestHandler = async ({ url }) => {
	try {
		const path = getPath(url);
		const data = await db.getData(path);
		return json(data);
	} catch (error) {
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		const path = getPath(url);
		const {payload} = await request.json();
		await db.push(path, payload);
		return json({ message: 'Property created' }, { status: 201 });
	} catch (error) {
		return json({ error: 'Failed to create property' }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request, url }) => {
	try {
		const path = getPath(url);
		const {payload} = await request.json();
		await db.push(path, payload, true);
		return json({ message: 'Property updated' }, { status: 201 });
	} catch (error) {
		return json({ error: 'Failed to update property' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ url }) => {
	try {
		const path = getPath(url);
        if (path.startsWith('/application-settings')) {
            return json({ error: 'Cannot delete inside application-settings' }, { status: 403 });
        }
		await db.delete(path);
		return json({ message: 'Property deleted' });
	} catch (error) {
		return json({ error: 'Failed to delete property' }, { status: 500 });
	}
};
