import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { resource, uuid } = params;
		const index = await db.getIndex(`/${resource}`, uuid);
		const data = await db.getData(`/${resource}/${index}`);
		return json(data);
	} catch (error) {
		return json({ error: 'Resource not found' }, { status: 404 });
	}
};

export const PUT: RequestHandler = async ({ request, params }) => {
	try {
		const { resource, uuid } = params;
		const index = await db.getIndex(`/${resource}`, uuid);
		const updatedData = await request.json();
		db.push(`/${resource}/${index}`, updatedData, true);
		return json({ message: 'Resource updated' });
	} catch (error) {
		return json({ error: 'Failed to update resource' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const { resource, uuid } = params;
		const index = await db.getIndex(`/${resource}`, uuid);
		await db.delete(`/${resource}/${index}`);
		return json({ message: 'Resource deleted' });
	} catch (error) {
		return json({ error: 'Failed to delete resource' }, { status: 500 });
	}
};
