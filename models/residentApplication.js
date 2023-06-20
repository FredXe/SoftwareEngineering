const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	//宿舍申請(非住宿生)
	//申請者必為非住宿生&&沒申請過；申請的大樓一定存在
	insertRA: async function (student_ID, dorm_name) {
		try {
			db.query(`INSERT resident_application (student_ID, dorm_name) VALUE ('${student_ID}', '${dorm_name}');`);
		} catch (err) {
			console.error(err);
		}
	},

	//申請駁回(管理員)
	//申請未通過的申請者&&申請存在
	deleteRA: async function (student_ID) {
		try {
			await db.query(`DELETE FROM resident_application WHERE student_ID='${student_ID}';`);
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
		const rows = await db.query(`SELECT ` +
			`student_ID, user_name, rA_semester, dorm_name, rA_approve, rA_fee FROM resident_application, users ` +
			`WHERE resident_application.student_ID = users.user_ID AND student_ID='${student_ID}';`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//顯示所有申請資料(管理員)
	selectAllRA: async function () {
		const rows = await db.query(
			'SELECT user_name, user_ID, rA_fee, rA_approve, ' +
			'dorm_name FROM resident_application, users WHERE student_ID = user_ID ORDER BY rA_approve ASC;');

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

	selectAvailableRoom: async function (dorm_name) {
		const query = `SELECT available_room.r_number AS availableRoom FROM ` +
			`(SELECT rs.r_number, COUNT(rs.r_number) AS people, r_volume ` +
			`FROM resident_student=rs JOIN room ON rs.dorm_name=room.dorm_name ` +
			`AND rs.r_number=room.r_number WHERE rs.dorm_name='${dorm_name}' ` +
			`GROUP BY r_number HAVING people<r_volume ORDER BY r_number ASC LIMIT 1) AS available_room;`;

		let availableRoom;
		try {
			availableRoom = utils.decodeRows(await db.query(query));


			if (!availableRoom[0]) {
				const j = `SELECT r_number AS availableRoom FROM room WHERE dorm_name='${dorm_name}' ORDER BY availableRoom
				ASC LIMIT 1;`;
				availableRoom = utils.decodeRows(await db.query(j));
			}

			return new Promise(resolve => {
				resolve(availableRoom[0].availableRoom);
			});
		} catch (err) {
			console.error(err);
		}
	},

	payTheFee: async function (student_ID) {
		const payTheFee = `UPDATE resident_application SET rA_fee=1 WHERE student_ID='${student_ID}';`;
		const updateUserRole = `UPDATE users SET role='resident_student' WHERE user_ID='${student_ID}';`;
		const deleteNonresident = `DELETE FROM non_resident_student WHERE user_ID='${student_ID}';`;

		let dorm_name, availableRoom;

		try {
			dorm_name = await db.query(`SELECT dorm_name FROM resident_application WHERE student_ID='${student_ID}';`);
			dorm_name = utils.decodeRows(dorm_name)[0].dorm_name;
			availableRoom = await this.selectAvailableRoom(dorm_name);
		} catch (err) {
			console.error(err);
		}

		if (!(availableRoom && dorm_name)) {
			return;
		}

		/**
		 * 分配房間
		 */
		const insertResident =
			`INSERT resident_student (user_ID, r_number, dorm_name) ` +
			`VALUE ('${student_ID}', ${availableRoom}, '${dorm_name}');`;

		try {
			await db.query(payTheFee);
			await db.query(updateUserRole);
			await db.query(deleteNonresident);
			await db.query(insertResident);

			return new Promise(resolve => {
				resolve({ dorm_name: dorm_name, room: availableRoom });
			});
		} catch (err) {
			console.error(err);
		}
	},

	getDormNames: async function () {
		const dormNamesQuery = 'SELECT dorm_name FROM dormitory;';

		try {
			return utils.decodeRows(await db.query(dormNamesQuery));
		} catch (err) {
			console.error(err);
		}

	}

}

module.exports = public;