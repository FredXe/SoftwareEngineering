const db = require('./db');
const utils = require('./utils');

const public = {
	selectMail: async (user_ID) => {
		let mail;
		try {
			mail = await db.query(`select email from users where user_ID = '${user_ID}'`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve(utils.decodeRows(mail)[0].email);
		});
	}
}


module.exports = public;