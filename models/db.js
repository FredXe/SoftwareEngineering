const mysql = require('mysql');
const fs = require('fs/promises');
require('dotenv').config({ path: './models/.env' })
const util = require('util');

/**
 * Check if `.env` is exist, create a `.env` file
 * and you should config your `.env`
 */
async function importEnv() {
	try {
		// Check if `.env` is exist
		await fs.access('models/.env', fs.constants.F_OK);
	} catch {
		try {
			/**
			 * Copy a `.env.default` to create `.env`
			 * if `.env` does not exist.
			 */
			await fs.copyFile('models/.env.default', 'models/.env');

			console.log('You should config your \'.env\'');
			process.exit(1);
		} catch {
			console.error('error while copying .env');
			console.trace();
		}
	}
}

/**
 * The connection to database
 */
const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_ADMIN,
	password: process.env.DB_ADMIN_PASSWORD,
	database: process.env.DATABASE,
	multipleStatements: true
});

const public = {
	query: util.promisify(conn.query).bind(conn),
	querycb: conn.query
}

importEnv();

module.exports = public;