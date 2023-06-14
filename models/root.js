const utils = require('./utils');
const db = require('./db');

const public = {
	showPassword: async (user) => {
		const query = `SELECT password FROM users WHERE user_ID='${user}'`;

		const row = await db.query(query);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row)[0].password);
		})
	},

	showUserData: async (user_ID) => {
		const row = await db.query(`SELECT * FROM users WHERE user_ID='${user_ID}';`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row)[0]);
		})
	},

}

module.exports = public;