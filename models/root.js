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

	showRole: async (user) => {
		const query = `SELECT IF ((SELECT COUNT(*) FROM admin WHERE user_ID='${user}'), 'admin', ` +
			`IF ((SELECT COUNT(*) FROM housemaster WHERE user_ID='${user}'), 'housemaster', ` +
			`IF ((SELECT COUNT(*) FROM resident_student WHERE user_ID='${user}'), 'resident_student', ` +
			`IF ((SELECT COUNT(*) FROM non_resident_student WHERE user_ID='${user}'), 'non_resident_student', ` +
			`IF ((SELECT COUNT(*) FROM maintainer WHERE user_ID='${user}'), 'maintainer', 'guest'` +
			`))))) AS role;`;

		const row = await db.query(query);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row)[0].role);
		})
	}
}

module.exports = public;