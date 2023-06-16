const db = require('./db');
const utils = require('./utils');

const public = {
	show: async function () {
		const rows = await db.query('select users.user_ID , users.user_name , resident_student.dorm_name , resident_student.r_number ' +
			'from resident_student , users , room ' +
			'where resident_student.user_ID = users.user_ID;');
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	delete: async function (student_ID) {
		const delResidentStudent = db.query(`delete from resident_student where resident_student.user_ID = '${student_ID}';`);
		const addnonResidentStudent = db.query(`insert non_resident_student values('${student_ID}')`);
		const updateUsers = db.query(`update users set role = 'non_resident_student' where user_ID = '${student_ID}';`)
		try {
			await db.query(delResidentStudent);
			await db.query(addnonResidentStudent);
			await db.query(updateUsers);
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = public;