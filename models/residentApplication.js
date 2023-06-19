const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	//宿舍申請(非住宿生)
	//申請者必為非住宿生&&沒申請過；申請的大樓一定存在
	insertRA: async function (rA_semester, dorm_name, rA_fee, student_ID) {

		const query1 = await db.query(`SELECT * FROM resident_student WHERE user_ID='${student_ID}';`);
		const query2 = await db.query(`SELECT * FROM dormitory WHERE dorm_name='${dorm_name}';`);
		const query3 = await db.query(`SELECT * FROM resident_application WHERE student_ID='${student_ID}';`);
		if (query1 === null && query2 != null && query3 === null) {
			try {
				await db.query(`INSERT INTO resident_application 
				(rA_semester, dorm_name, rA_fee, student_ID) 
				VALUES('${rA_semester}','${dorm_name}','${rA_fee}','${student_ID}');`);
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
	deleteRA: async function (studen_ID) {
		try {
			await db.query(`UPDATE resident_application SET rA_approve=-1 WHERE student_ID='${studen_ID}';`);
		} catch (err) {
			console.error(err);
		}
	},

	//取消申請(非住宿生)
	//申請未通過的申請者&&有申請宿舍者
	deleteStudentRA: async function (student_ID) {
		const approve = 0;
		const query = db.query(`SELECT * FROM resident_application WHERE student_ID='${student_ID}' AND rA_approve='${approve}'`);
		if (query != null) {
			try {
				await db.query(`DELETE FROM resident_application WHERE student_ID='${student_ID}';`);
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('fail deleteRA().');
		}

	},

	//更改申請表(非住宿生)
	//更改的大樓必存在&&必有此申請
	modifyRA: async function (rA_semester, dorm_name, rA_fee, student_ID) {
		const approve = 0;
		const query1 = await db.query(`SELECT * FROM resident_application WHERE student_ID='${student_ID}' AND rA_approve='${approve}';`);
		const query2 = await db.query(`SELECT * FROM dormitory WHERE dorm_name='${dorm_name}';`);
		if (query1 != null && query2 != null) {
			try {
				await db.query(`UPDATE resident_application 
						SET rA_semester='${rA_semester}', dorm_name='${dorm_name}', rA_fee='${rA_fee}' 
						WHERE student_ID='${student_ID}';`);
			} catch (err) {
				console.error(err);
			}

			console.log('modifyRA()');
		} else {
			console.log('no this resident_application, fail modifyRA().');
		}
	},

	//查詢一筆申請資料(所有人)
	selectRA: async function (student_ID) {
		const rows = await db.query(`SELECT * FROM resident_application WHERE student_ID='${student_ID}';`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//顯示所有申請資料(管理員)
	selectAllRA: async function () {
		const rows = await db.query(
			'SELECT user_name, user_ID, rA_fee, rA_approve, ' +
			'dorm_name FROM resident_application, users WHERE student_ID = user_ID ORDER BY rA_approve DESC;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//顯示已核可住宿生的繳費狀態(管理員)
	selectALLRAFee: async function () { //已approve的fee
		const approve = 1
		const rows = await db.query(`SELECT student_ID, rA_fee
									FROM resident_application 
									WHERE rA_approve='${approve}';`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//核可申請
	//有申請&&申請未通過&&房間存在在此大樓
	//
	approveRA: async function (student_ID) {
		try {
			await db.query(`UPDATE resident_application SET rA_approve=1 WHERE student_ID='${student_ID}';`);
		} catch (err) {
			console.error(err);
		}
	},

	payTheFee: async function (student_ID, r_number) {
		/**
		 * modify rA_fee
		 * modify users.role
		 * delete nonresident
		 * insert resident
		 * 
		 * 分配房間
		 */
	},



}

module.exports = public;