const db = require('./db');
const utils = require('./utils');

const public = {
	show: async function () {
		const rows = await db.query('\
		select users.user_ID, users.user_name, resident_student.dorm_name, resident_student.r_number \
		from resident_student, users \
		where resident_student.user_ID = users.user_ID;');
		
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	delete: async function (student_ID) {
		const delResidentStudent = `DELETE FROM resident_student WHERE resident_student.user_ID = '${student_ID}';`;
		const addnonResidentStudent = `INSERT non_resident_student VALUES('${student_ID}');`;
		const updateUsers = `UPDATE users SET role = 'non_resident_student' WHERE user_ID = '${student_ID}';`;
		const deleteApplication = `DELETE FROM resident_application WHERE student_ID='${student_ID}';`;
		try {
			await db.query(delResidentStudent);
			await db.query(addnonResidentStudent);
			await db.query(updateUsers);
			await db.query(deleteApplication);
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = public;