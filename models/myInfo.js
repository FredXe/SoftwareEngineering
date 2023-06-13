const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');

const public = {
	show: async function (userID) {
		const rows = await db.query(`select * from users where user_ID = '${userID}'`);
		const resident_rows = await db.query(`select dorm_name , r_number from resident_student where resident_ID = '${userID}';`);
		const content = utils.decodeRows(rows);
		const resident_content = utils.decodeRows(resident_rows);

		return new Promise(resolve => {
			resolve(content, resident_content);
		});

	},

}

module.exports = public;