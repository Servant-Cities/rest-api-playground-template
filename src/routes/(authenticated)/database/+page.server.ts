import fs from 'node:fs';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { databaseEditorSchema } from '../../../lib/schema.js';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const rawData = fs.readFileSync(`./databases/${locals.tenant.db}`, 'utf8');
		return {
			form: await superValidate({ rawData }, zod(databaseEditorSchema))
		};
	} catch (err) {
		console.error(err);
		return fail(404);
	}
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(databaseEditorSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		
		fs.writeFile(`./databases/${locals.tenant.db}`, form.data.rawData, (err) => {
			if (err) {
				return fail(500, { form });
			} else {
				locals.db.reload();
				return message(form, 'Database updated successfully!');
			}
		});
	}
} satisfies Actions;
