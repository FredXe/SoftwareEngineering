const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	insertRA: async function (rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) {
		const query = `INSERT INTO residentApplication 
						(rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) 
						VALUES(${rA_ID},${rA_semester},${dorm_name},${rA_approve},${rA_fee},${student_ID});`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},


	deleteRA: async function (rA_ID) {
		try {
			await db.query(`DELETE FROM residentApplication WHERE rA_ID=${rA_ID};`);
		} catch (err) {
			console.error(err);
		}

		console.log('deleteRA()');
	},

	modifyRA: async function (rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) {
		try {
			await db.query(`UPDATE residentApplication 
					SET rA_semester=${rA_semester}, dorm_name=${dorm_name}, rA_approve=${rA_approve},
					rA_fee=${rA_fee}, student_ID=${student_ID} 
					WHERE rA_ID=${rA_ID};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('modifyRA()');
		});
	},

	selectRA: async function (rA_ID) {
		const row = await db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	selectAllRA: async function () {
		const rows = await db.query('SELECT * FROM residentApplication;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	selectALLRAFee: async function () { //已approve的fee
		const approve = 1
		const rows = await db.query(`SELECT rA_ID, rA_fee, student_ID 
									FROM residentApplication 
									WHERE rA_approve=${approve};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	isApprove: async function (rA_ID) {
		const visitApprove = await db.query(`SELECT rA_approve 
											FROM residentApplication 
											WHERE rA_ID=${rA_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(visitApprove));
		});
	},

	approveRA: async function (rA_ID, dorm_name) {
		let approve = 1;
		try {
			await db.query(`UPDATE residentApplication 
							SET rA_approve=${approve}, dorm_name=${dorm_name} 
							WHERE rA_ID=${rA_ID};`);

			const user_ID = await db.query(`SELECT student_ID FROM residentApplication WHERE rA_ID=${rA_ID};`);
			const r_number = await db.query(`SELECT r_number FROM room WHERE dorm_name=${dorm_name};`);
			await db.query(`DELETE FROM non_resident_student WHERE student_ID=${student_ID};`);
			await db.query(`INSERT INTO resident_student
							(user_ID, r_number, dorm_name) 
							VALUES(${user_ID},${r_number},${dorm_name});`);
			await db.query(`UPDATE users SET role=${resident_student} WHERE user_ID=${user_ID};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('approveRA()');
		});
	}

}

module.exports = public;