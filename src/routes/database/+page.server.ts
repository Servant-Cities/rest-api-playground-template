import fs from 'node:fs';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { databaseSchema } from '../../lib/components/containers/database-form/schema.js';
import { db } from '$lib/server/database/index.js';

export const load: PageServerLoad = async () => {
	try {
		const rawDB = fs.readFileSync('./database.json', 'utf8');
		return {
			form: await superValidate({ body: rawDB }, zod(databaseSchema))
		};
	} catch (err) {
		console.error(err);
	}
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(databaseSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		fs.writeFile('./database.json', form.data.body, (err) => {
			if (err) {
				return fail(500, { form });
			} else {
				db.reload();
				return message(form, 'Database updated successfully!');
			}
		});
	}
} satisfies Actions;
