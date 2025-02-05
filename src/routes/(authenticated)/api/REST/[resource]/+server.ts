import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { v4 as uuidv4 } from 'uuid';

export const GET: RequestHandler = async ({ params, locals }) => {
    try {
        const { resource } = params;
        const activeDataset = await locals.db.getData('/application-settings/active-dataset/value')
        const data = await locals.db.getData(`/datasets/${activeDataset}/${resource}`);
        return json(data);
    } catch (error) {
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, params, locals }) => {
    try {
        const { resource } = params;
		const activeDataset = await locals.db.getData('/application-settings/active-dataset/value')
        const newData = await request.json();
        const id = uuidv4();
        await locals.db.push(`/datasets/${activeDataset}/${resource}/${id}`, { id, ...newData });
        return json({ message: 'Resource created', id }, { status: 201 });
    } catch (error) {
        return json({ error: 'Failed to create resource' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
    try {
        const { resource } = params;
		const activeDataset = await locals.db.getData('/application-settings/active-dataset/value')
        await locals.db.delete(`/datasets/${activeDataset}/${resource}`);
        return json({ message: 'All resources deleted' });
    } catch (error) {
        return json({ error: 'Failed to delete resources' }, { status: 500 });
    }
};
