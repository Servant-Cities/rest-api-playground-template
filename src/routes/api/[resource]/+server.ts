import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { v4 as uuidv4 } from 'uuid';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const { resource } = params;
        const data = await db.getData(`/${resource}`);
        return json(data);
    } catch (error) {
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, params }) => {
    try {
        const { resource } = params;
        const newData = await request.json();
        const id = uuidv4();
        await db.push(`/${resource}/${id}`, { id, ...newData });
        return json({ message: 'Resource created', id }, { status: 201 });
    } catch (error) {
        return json({ error: 'Failed to create resource' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const { resource } = params;
        await db.delete(`/${resource}`);
        return json({ message: 'All resources deleted' });
    } catch (error) {
        return json({ error: 'Failed to delete resources' }, { status: 500 });
    }
};
