import fs from 'node:fs';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { databaseEditorSchema } from '../../lib/schema.js';
import { masterDB } from '$lib/server/database/index.js';

export const load: PageServerLoad = async () => {
	try {
		const rawData = fs.readFileSync('./databases/master-db.json', 'utf8');
		return {
			form: await superValidate({ rawData }, zod(databaseEditorSchema))
		};
	} catch (err) {
		console.error(err);
		return fail(404);
	}
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(databaseEditorSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		fs.writeFile('./databases/master-db', form.data.rawData, (err) => {
			if (err) {
				return fail(500, { form });
			} else {
				masterDB.reload();
				return message(form, 'Database updated successfully!');
			}
		});
	}
} satisfies Actions;
