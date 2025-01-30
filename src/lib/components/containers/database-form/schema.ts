import { z } from 'zod';

export const databaseSchema = z.object({
	body: z.string().transform((str, ctx) => {
		try {
			JSON.parse(str);
			return str;
		} catch (e) {
			ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
			return z.NEVER;
		}
	})
});

export type DatabaseSchema = typeof databaseSchema;
