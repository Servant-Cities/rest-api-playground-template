import { z } from 'zod';

const configurationItemSchema = (valueSchema) =>
	z.object({ description: z.string(), value: valueSchema() });
const applicationSettingsSchema = z
	.object({
		hidden: z.optional(z.string()),
		description: z.string(),
		'active-dataset': configurationItemSchema(z.string)
	})
	.required();
const genericCollectionSchema = z.array(z.record(z.string(), z.any()));
const genericDatasetsSchema = z
	.object({ hidden: z.optional(z.string()) })
	.catchall(genericCollectionSchema);

export const databaseSchema = z.object({
	rawData: z.string().transform((jsonString, ctx) => {
		try {
			const objectValue = JSON.parse(jsonString);

			const parsed = z
				.object({
					'application-settings': applicationSettingsSchema
				})
				.catchall(genericDatasetsSchema)
				.safeParse(objectValue);
			if (parsed.error) {
				ctx.addIssue({
					code: 'custom',
					message: parsed.error.message
				});
				return z.NEVER;
			}

			return jsonString;
		} catch (e) {
			ctx.addIssue({ code: 'custom', message: 'Database data should be a valid JSON Object' });
			return z.NEVER;
		}
	})
});

export type DatabaseSchema = typeof databaseSchema;
