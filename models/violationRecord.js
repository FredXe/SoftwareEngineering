const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	//新增違規(舍監)
	//住宿生存在&舍監存在&該舍監負責住宿生所住大樓
	insertVR: async function (vr_date, vr_type, resident_ID, housemaster_ID) {
		const query1 = await db.query(`SELECT * FROM resident_student WHERE user_ID=${resident_ID};`);
		const query2 = await db.query(`SELECT * FROM dormitory WHERE housemaster_ID=${housemaster_ID};`);
		const dorm1 = await db.query(`SELECT dorm_name FROM resident_student WHERE user_ID=${resident_ID};`);
		const dorm2 = await db.query(`SELECT dorm_name FROM dormitory WHERE housemaster_ID=${housemaster_ID};`);
		if (query1 != null && query2 != null && dorm1 === dorm2) {
			try {
				await db.query(`INSERT INTO violation_record 
				(vr_date, vr_type, resident_ID, housemaster_ID) 
				VALUES(${vr_date},${vr_type},${resident_ID},${housemaster_ID});`);
				console.log('insertVR()');
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('no this resident_student, fail insertVR()');
		}
		
	},

	//刪除違規紀錄(舍監)
	//違規紀錄存在
	deleteVR: async function (vr_ID) {
		const query = await db.query(`SELECT * FROM violation_record WHERE vr_ID=${vr_ID};`);
		if (query != null) {
			try {
				await db.query(`DELETE FROM violation_record WHERE vr_ID=${vr_ID};`);
				console.log('deleteVR()');
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('no this violationRecord, fail deleteVR()');
		}
		
	},

	//修改違規紀錄(舍監)
	//違規紀錄存在
	modifyVR: async function (vr_ID, vr_date, vr_type) {
		const query = await db.query(`SELECT * FROM violation_record WHERE vr_ID=${vr_ID};`);
		if (query != null) {
			try {
				await db.query(`UPDATE violation_record SET vr_date=${vr_date}, vr_type=${vr_type} WHERE guest_id=${vr_ID};`);
				console.log('modifyVR()');
			} catch (err) {
				console.error(err);
			}
	
		} else {
			console.log('no this violationRecord, fail deleteVR()');
		}
		
	},

	//查看一項違規紀錄(所有人)
	selectVR: async function (vr_ID) {
		const row = await db.query(`SELECT * FROM violation_record WHERE vr_ID=${vr_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	//查看所有違規紀錄(舍監)
	selectAllVR: async function () {
		const rows = await db.query('SELECT * FROM violation_record;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	//查看某住宿生所有違規紀錄(所有人)
	selectResidentVR: async function (resident_ID) {
		const rows = await db.query(`SELECT * FROM violation_record WHERE resident_ID=${resident_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	}

}

module.exports = public;