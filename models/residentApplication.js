const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	insertRA: async function (file) {
		const query = `...`;

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

		console.log('已刪除');
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
			resolve('已更新');
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

	approveRA: async function (rA_ID) {
		let approve = 1;
		try {
			await db.query(`UPDATE residentApplication SET rA_approve=${approve} WHERE rA_ID=${rA_ID};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('已核准');
		});
	}

}

module.exports = public;