import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { applicationSettingsSchema, type ApplicationSettingsSchema } from '../../../lib/schema.js';

const masterOnlySettings: Array<keyof ApplicationSettingsSchema> = [
	'require-authentication',
	'information-notice',
	'self-service-keys',
	'authorized-keys'
]

export const load: PageServerLoad = async ({locals}) => {
	const rawSettings = await locals.db.getData('/application-settings');
	if (!rawSettings) return fail(404);
	const { data: {description, ...parsedSettings} } = applicationSettingsSchema.safeParse(rawSettings);

	if (parsedSettings) {
		const settings = Object.entries(parsedSettings);
		return {
			description,
			settings
		};
	} else {
		console.error(
			"Application settings do not match the expected format, are you working on zod schemas? If not your JSON file might have an issue and you should migrate or undo breaking changes."
		);
		return fail(500);
	}
};
