const db = require('./db');
const utils = require('./utils');

const public = {

	showUsers: async function (user_ID) {
		const condition = (user_ID) ? ` where user_ID='${user_ID}'` : '';
		const query = `select user_ID, user_name, role, sex, email, eroll_year, phnumber from users${condition};`;

		try {
			const rows = await db.query(query);

			return new Promise(resolve => {
				resolve(utils.decodeRows(rows));
			});
		} catch (err) {
			console.error(err);
		}
	},

	updateUser: async function (
		{ user_ID, user_name, sex, email, phnumber }) {
		const query = `update users set user_name='${user_name}', sex=${sex}, email='${email}', phnumber='${phnumber}' where user_ID='${user_ID}';`;
		
		try {
			await db.query(query);

		} catch (err) {
			console.error(err);
		}

	},

	insertUser: async function ({ role, user_ID, user_name, sex, password, email, eroll_year, phnumber }) {
		const insertUsers = `insert users value ('${user_ID}' , '${user_name}' , '${role}' , ${sex} , '${password}' , '${email}' , '${eroll_year}' , '${phnumber}');`
		const insertStudent = `insert student value ('${user_ID}')`;
		const insertRole = `insert ${role} value ('${user_ID}');`;

		try {
			await db.query(insertUsers);
			if (role == 'non_resident_student') {
				await db.query(insertStudent);
			}
			await db.query(insertRole);
		} catch (err) {
			console.error(err);
		}
	},

	deleteUser: async function ({ role, user_ID }) {
		const deleteRole = `delete from ${role} where user_ID='${user_ID}';`;
		const deleteStudent = `delete from student where user_ID='${user_ID}';`;
		const deleteUsers = `delete from users where user_ID='${user_ID}';`;

		try {
			await db.query(deleteRole);
			if (role == 'non_resident_student') {
				await db.query(deleteStudent);
			}
			await db.query(deleteUsers);
		} catch (err) {
			console.error(err);
		}
	},

}

module.exports = public;