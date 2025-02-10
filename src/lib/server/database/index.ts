import fs from 'node:fs';
import { JsonDB, Config } from 'node-json-db';

export let databasesList: Record<string, JsonDB> = {};
export const getDB = (db: string) => {
	if (databasesList[db]) return databasesList[db];
	try {
		if (!fs.existsSync(`./databases/${db}`)) {
			const defaultData = fs.readFileSync('./databases/tutorial-db.json', 'utf8');
			fs.writeFileSync(`./databases/${db}`, defaultData)
		}
	} catch (err) {
		throw(`Couldn't create database ${db}: ${err}`);
	}

	databasesList[db] = new JsonDB(new Config(`./databases/${db}`, true, true, '/'));
	return databasesList[db]
};

export const masterDB = getDB('master-db.json');

