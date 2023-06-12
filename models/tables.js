const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');
const { log } = require('console');

async function sendSqlFromFile(sqlPath) {
	const content = (await fs.readFile(sqlPath)).toString();
	try {
		const rows = await db.query(content);
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
	}
}

// public.drop();
// public.init();
// public.reset();

module.exports = public;