import fs from 'node:fs';
import { JsonDB, Config } from 'node-json-db';

const getMasterDB = () => {
	try {
		if (!fs.existsSync('./databases/master-db.json')) {
			const defaultData = fs.readFileSync('./databases/tutorial-db.json', 'utf8');

			fs.writeFileSync('./databases/master-db', defaultData, (err) => {
				if (err) {
					throw err;
				}
			});
		}
	} catch (err) {
		throw(`Couldn't create master database: ${err}`);
	}

	return new JsonDB(new Config('./databases/master-db.json', true, true, '/'));
};

export const masterDB = getMasterDB();
