const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');
const { log } = require('console');

async function sendSqlFromFile(sqlPath) {
	const content = (await fs.readFile(sqlPath)).toString();
	try {
		await db.query(content);
		return new Promise(resolve => {
			resolve('query done ' + sqlPath);
		});
	} catch {
		console.error('error while sendSqlFromFile');
		console.trace();
	}
}

/**
 * Table operations
 */
const public = {
	init: async function () {
		await sendSqlFromFile('./models/sql/init.sql');
	},

	drop: async function () {
		await sendSqlFromFile('./models/sql/dropAllTables.sql');
	},

	reset: async function () {
		await sendSqlFromFile('./models/sql/dropAllTables.sql');
		await sendSqlFromFile('./models/sql/init.sql');
	},

	import: async function () {
		const query = await utils.json2InsertQuery('./models/json/import.json');

		// insert
		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	selectUser: async function () {
		const rows = await db.query('SELECT * FROM users WHERE user_ID=\'a1095500\';');
		const content = utils.decodeRows(rows);
		console.log(content);
	}
}

module.exports = public;