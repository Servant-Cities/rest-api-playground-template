import { z } from 'zod';

// Database schemas
export const configurationItemSchema = <ValueType extends z.ZodTypeAny>(
	valueSchema: (
		params?: z.RawCreateParams & {
			coerce?: true;
		}
	) => ValueType
): z.ZodObject<{description: z.ZodString, value: ValueType}> => z.object({ description: z.string(), value: valueSchema() });
export const applicationSettingsSchema = z
	.object({
		hidden: z.optional(z.string()),
		description: z.string(),
		'active-dataset': configurationItemSchema(z.string)
	})
	.required();
export type ConfigurationItemSchema = typeof configurationItemSchema;
export type ApplicationSettingsSchema = typeof applicationSettingsSchema;

export const genericCollectionSchema = z.array(z.record(z.string(), z.any()).refine(record => z.union([z.string(), z.number()]).safeParse(record.id)));
export const genericDatasetsSchema = z
	.object({ hidden: z.optional(z.string()) })
	.catchall(genericCollectionSchema);
export type CollectionSchema = typeof genericCollectionSchema;
export type DatasetSchema = typeof genericDatasetsSchema;

export const databaseSchema = z
	.object({
		'application-settings': applicationSettingsSchema
	})
	.catchall(genericDatasetsSchema);
export type DatabaseSchema = typeof databaseSchema;

// Form schemas
export const databaseEditorSchema = z.object({
	rawData: z.string().transform((jsonString, ctx) => {
		try {
			const objectValue = JSON.parse(jsonString);

			const parsed = databaseSchema.safeParse(objectValue);
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
export type DatabaseEditorSchema = typeof databaseEditorSchema;
