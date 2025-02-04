import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { databaseSchema } from '../../lib/schema.js';
import { masterDB } from '$lib/server/database/index.js';

export const load: PageServerLoad = async () => {
	const rawData = await db.getData('/');
	if (!rawData) return fail(404);
	const { data: database } = databaseSchema.safeParse(rawData);

	if (database) {
		const datasets = Object.entries(database['datasets']);
		const activeDataset = database['application-settings']['active-dataset'].value;
		return {
			datasets,
			activeDataset
		};
	} else {
		console.error(
			"Database doesn't match the expected format, are you working on zod schemas? If not your JSON file might have an issue and you should migrate or undo breaking changes."
		);
		return fail(500);
	}
};
