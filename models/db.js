const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config({ path: './models/.env' })


const db = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_ADMIN,
	password: process.env.DB_ADMIN_PASSWORD,
	database: process.env.DATABASE
});

/**
 * Check if `.env` is exist, create a `.env` file
 * and you should config your `.env`
 */
fs.access('models/.env', fs.constants.F_OK, function (err) {
	if (err) {
		// copy a `.env.default` to create `.env`
		fs.copyFile('models/.env.default', 'models/.env', function (err) {
			if (err)
				console.error(err);
			else {
				console.log('You should config your \'.env\'');
				process.exit(1);
			}
		});
	}

	return;
});

module.exports = db;