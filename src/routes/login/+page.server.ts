import { fail, redirect } from '@sveltejs/kit';
import { authorizedKeySchema } from '$lib/schema';
import { masterDB } from '$lib/server/database';

export const actions = {
	'login': async ({ request, cookies }) => {
		const authorizedKeys = await masterDB.getData('/application-settings/authorized-keys');
		const formData = await request.formData();
		const formSecret = formData.get('secret');

		const access = authorizedKeySchema.safeParse(
			authorizedKeys?.value.find(({ secret }) => secret === formSecret)
		);

		if (access.success) {
			cookies.set('secret', formSecret, {
				path: '/',
				httpOnly: false,
				secure: true,
				sameSite: 'strict'
			});

			throw redirect(303, '/');
		} else {
			return fail(403, { error: { message: "This secret doesn't grant you access" } });
		}
	},
	'disconnect': ({cookies}) => {
		cookies.delete(
			'secret',
			{path: '/'}
		);
		
		throw redirect(303, '/login');
	}
};
