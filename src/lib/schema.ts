import { z } from 'zod';

// Database schemas
export const authorizedKeySchema = z.object({
	'name': z.string(),
	'secret': z.string(),
	'db': z.string()
});

export const configurationItemSchema = <ValueType extends z.ZodTypeAny>(
	valueSchema: (
		params?: z.RawCreateParams & {
			coerce?: true;
		}
	) => ValueType
): z.ZodObject<{ description: z.ZodString; value: ValueType }> =>
	z.object({ description: z.string(), value: valueSchema() });
export const applicationSettingsSchema = z
	.object({
		'description': z.string(),
		'active-dataset': configurationItemSchema(z.string),
		'authorized-keys': configurationItemSchema(() => z.array(authorizedKeySchema)).optional()
	})
	.required();
export type ConfigurationItemSchema = typeof configurationItemSchema;
export type ApplicationSettingsSchema = z.infer<typeof applicationSettingsSchema>;

const savedPreviewSchema = z.object({
	'name': z.string(),
	'description': z.string(),
	'url': z.string(),
	'pathsMap': z.record(z.string(), z.string())
});
export type SavedPreviewSchema = z.infer<typeof savedPreviewSchema>;

export const genericCollectionSchema = z.array(
	z
		.record(z.string(), z.any())
		.refine((record) => z.union([z.string(), z.number()]).safeParse(record.id))
);
export const genericDatasetsSchema = z
	.object({ hidden: z.optional(z.string()) })
	.catchall(genericCollectionSchema);
export type CollectionSchema = z.infer<typeof genericCollectionSchema>;
export type DatasetSchema = z.infer<typeof genericDatasetsSchema>;

export const databaseSchema = z.object({
	'datasets': z.record(z.string(), genericDatasetsSchema),
	'application-settings': applicationSettingsSchema,
	'saved-previews': z.array(savedPreviewSchema)
});
export type DatabaseSchema = z.infer<typeof databaseSchema>;

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
