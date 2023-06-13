const db = require('./db');
const utils = require('./utils');

const public = {
	showUsers: async function () {
		const query = ``;

		const rows = await db.query(query);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	insertAdmin: async function (user_ID, user_name, sex, password, email, eroll_year, phnumber) {
		const insertUsers = `insert users value ('${user_ID}' , '${user_name}' , ${sex} , '${password}' , '${email}' , '${eroll_year}' , '${phnumber}');`
		const insertAdmin = `insert admin value ('${user_ID}')`;

		try {
			await db.query(insertUsers);
			await db.query(insertAdmin);
		} catch (err) {
			console.error(err);
		}
	},

	insertHousemaster: async function (user_ID, user_name, sex, password, email, eroll_year, phnumber) {
		const insertUsers = `insert users value ('${user_ID}' , '${user_name}' , ${sex} , '${password}' , '${email}' , '${eroll_year}' , '${phnumber}');`
		const insertHousemaster = `insert housemaster value ('${user_ID}')`;

		try {
			await db.query(insertUsers);
			await db.query(insertHousemaster);
		} catch (err) {
			console.error(err);
		}
	},

	insertMaintainer: async function (user_ID, user_name, sex, password, email, eroll_year, phnumber) {
		const insertUsers = `insert users value ('${user_ID}' , '${user_name}' , ${sex} , '${password}' , '${email}' , '${eroll_year}' , '${phnumber}');`
		const insertMaintainer = `insert maintainer value ('${user_ID}')`;

		try {
			await db.query(insertUsers);
			await db.query(insertMaintainer);
		} catch (err) {
			console.error(err);
		}
	},

	insertnonResidentStudent: async function (user_ID, user_name, sex, password, email, eroll_year, phnumber) {
		const insertUsers = `insert users value ('${user_ID}' , '${user_name}' , ${sex} , '${password}' , '${email}' , '${eroll_year}' , '${phnumber}');`
		const insertStudent = `insert maintainer value ('${user_ID}')`;
		const insertnonResidentStudent = `insert non_resident_student value ('${user_ID}')`;
		try {
			await db.query(insertUsers);
			await db.query(insertStudent);
			await db.query(insertnonResidentStudent);
		} catch (err) {
			console.error(err);
		}
	},

	delAdmin: async function (user_ID) {
		const delAdmin = `delete from admin where user_ID = '${user_ID}';`;
		const deltUsers = `delete from users where user_ID = '${user_ID}';`;


		try {
			await db.query(delAdmin);
			await db.query(deltUsers);
		} catch (err) {
			console.error(err);
		}
	},

	delHousemaster: async function (user_ID) {
		const delHousemaster = `delete from housemaster where user_ID = '${user_ID}';`;
		const deltUsers = `delete from users where user_ID = '${user_ID}';`;


		try {
			await db.query(delAdmin);
			await db.query(deltUsers);
		} catch (err) {
			console.error(err);
		}
	},

	delMaintainer: async function (user_ID) {
		const delMaintainer = `delete from maintainer where user_ID = '${user_ID}';`;
		const deltUsers = `delete from users where user_ID = '${user_ID}';`;


		try {
			await db.query(delMaintainer);
			await db.query(deltUsers);
		} catch (err) {
			console.error(err);
		}
	},

	delnonResidentStudent: async function (user_ID) {
		const delnonResidentStudent = `delete from non_resident_student where user_ID = '${user_ID}';`;
		const deltUsers = `delete from users where user_ID = '${user_ID}';`;


		try {
			await db.query(delnonResidentStudent);
			await db.query(deltUsers);
		} catch (err) {
			console.error(err);
		}
	},
}

module.exports = public;