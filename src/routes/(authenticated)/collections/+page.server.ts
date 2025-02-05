import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { databaseSchema } from '../../../lib/schema.js';

export const load: PageServerLoad = async ({locals}) => {
	const rawData = await locals.db.getData('/');
	if (!rawData) return fail(404);
	const { data: database } = databaseSchema.safeParse(rawData);

	if (!database) {
		console.error(
			"Database doesn't match the expected format, are you working on zod schemas? If not your JSON file might have an issue and you should migrate or undo breaking changes."
		);
		return fail(500);
	}
	const activeDatasetName = database['application-settings']['active-dataset'].value;
	const activeDataset = database['datasets'][activeDatasetName];
	if (!activeDataset) {
		console.error(
			`Cannot find active dataset with the name ${activeDatasetName}`
		);
		return fail(404);
	}
	const collections = Object.entries(activeDataset).filter(([name]) => name !== 'hidden');

	return {
		collections
	};
};
