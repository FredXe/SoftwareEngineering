const { query } = require('express');
const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	//宿舍申請(非住宿生)
	//申請者必為非住宿生&&沒申請過；申請的大樓一定存在
	insertRA: async function (rA_semester, dorm_name, rA_fee, student_ID) {
		
		const query1 = await db.query(`SELECT * FROM resident_student WHERE user_ID=${student_ID};`);
		const query2 = await db.query(`SELECT * FROM dormitory WHERE dorm_name=${dorm_name};`);
		const query3 = await db.query(`SELECT * FROM residentApplication WHERE student_ID=${student_ID};`);
		if(query1 === null && query2 != null && query3 === null){
			try {
				await db.query(`INSERT INTO residentApplication 
				(rA_semester, dorm_name, rA_fee, student_ID) 
				VALUES(${rA_semester},${dorm_name},${rA_fee},${student_ID});`);
				console.log('insertRA()');
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('fail insertRA().');
		}
		
	},

	//申請駁回(管理員)
	//申請未通過的申請者&&申請存在
	deleteRA: async function (rA_ID) {
		const approve = 0;
		const query = db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID} AND rA_approve=${approve}`);
		if(query != null) {
			try {
				await db.query(`DELETE FROM residentApplication WHERE rA_ID=${rA_ID};`);
				console.log('deleteRA()');
			} catch (err) {
				console.error(err);
			}
			console.log('deleteRA()');
		} else {
			console.log('fail deleteRA().');
		}
		
	},

	//取消申請(非住宿生)
	//申請未通過的申請者&&有申請宿舍者
	deleteStudentRA: async function (student_ID) {
		const approve = 0;
		const query = db.query(`SELECT * FROM residentApplication WHERE student_ID=${student_ID} AND rA_approve=${approve}`);
		if(query != null) {
			try {
				await db.query(`DELETE FROM residentApplication WHERE student_ID=${student_ID};`);
				console.log('deleteRA()');
			} catch (err) {
				console.error(err);
			}
			console.log('deleteRA()');
		} else {
			console.log('fail deleteRA().');
		}
		
	},

	//更改申請表(非住宿生)
	//更改的大樓必存在&&必有此申請
	modifyRA: async function (rA_semester, dorm_name, rA_fee, student_ID) {
		const approve = 0;
		const query1 = await db.query(`SELECT * FROM residentApplication WHERE student_ID=${student_ID} AND rA_approve=${approve};`);
		const query2 = await db.query(`SELECT * FROM dormitory WHERE dorm_name=${dorm_name};`);
		if(query1 != null && query2 != null) {
			try {
				await db.query(`UPDATE residentApplication 
						SET rA_semester=${rA_semester}, dorm_name=${dorm_name}, rA_fee=${rA_fee} 
						WHERE student_ID=${student_ID};`);
			} catch (err) {
				console.error(err);
			}

			console.log('modifyRA()');
		} else {
			console.log('no this residentApplication, fail modifyRA().');
		}

		
	},

	//查詢一筆申請資料(所有人)
	selectRA: async function (rA_ID) {
		const row = await db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	//顯示所有申請資料(管理員)
	selectAllRA: async function () {
		const rows = await db.query('SELECT * FROM residentApplication;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//顯示已核可住宿生的繳費狀態(管理員)
	selectALLRAFee: async function () { //已approve的fee
		const approve = 1
		const rows = await db.query(`SELECT rA_ID, rA_fee, student_ID 
									FROM residentApplication 
									WHERE rA_approve=${approve};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//查詢某學生申請資料(所有人)
	selectStudentRA: async function (student_ID) {
		const row = await db.query(`SELECT * FROM residentApplication WHERE student_ID=${student_ID};`);
		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	//核可申請+分配房間(管理員)
	//有申請&&申請未通過&&房間存在在此大樓
	//
	approveRA: async function (rA_ID, r_number) {
		let approve = 0;
		const dorm_name = await db.query(`SELECT dorm_name FROM residentApplication WHERE rA_ID=${rA_ID};`);
		const query1 = await db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID} AND rA_approve=${approve};`);
		const query2 = await db.query(`SELECT * FROM room WHERE r_number=${r_number} AND dorm_name=${dorm_name};`);
		if(query1 != null && query2 != null) {
			try {
				const resident_student = 'resident_student';
				approve = 1;
				await db.query(`UPDATE residentApplication SET rA_approve=${approve} WHERE rA_ID=${rA_ID};`);
				const user_ID = await db.query(`SELECT student_ID FROM residentApplication WHERE rA_ID=${rA_ID};`);
				await db.query(`DELETE FROM non_resident_student WHERE student_ID=${student_ID};`);
				await db.query(`INSERT INTO resident_student
								(user_ID, r_number, dorm_name) 
								VALUES(${user_ID},${r_number},${dorm_name});`);
				await db.query(`UPDATE users SET role=${resident_student} WHERE user_ID=${user_ID};`);
			} catch (err) {
				console.error(err);
			}
	
			console.log('approveRA()');
		} else {
			console.log('no this residentApplication, fail approveRA().');
		}
		
	}

}

module.exports = public;