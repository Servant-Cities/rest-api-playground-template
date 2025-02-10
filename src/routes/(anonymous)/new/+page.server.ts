import { masterDB } from '$lib/server/database';
import { randomUUID } from 'crypto';

export const actions = {
	'default': async ({ request }) => {
		const formData = await request.formData();
		const formDB = formData.get('db');

		const dbRegex = /^[A-Za-z\s]+$/;
		if (!dbRegex.test(formDB)) {
			return { error: { message: 'Invalid name format. Only letters and spaces are allowed.' }};
		}

		const authorizedKeys = await masterDB.getData('/application-settings/authorized-keys/value');

		const formatedDbName = formDB.replace(' ', '-').toLowerCase();
		const safelySetDbNumber = authorizedKeys.filter(({ db }) => db.includes(formatedDbName)).length;
		const safeDbFilename = `${formatedDbName}-${safelySetDbNumber + 1}.json`;
		const secret = randomUUID();

		await masterDB.push(
			'/application-settings/authorized-keys/value[]',
			{
				name: formDB,
				secret,
				db: safeDbFilename
			},
			true
		);

		return { secret, success: true };
	}
};
