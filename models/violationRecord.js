const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {

	//新增違規(舍監)
	//住宿生存在&舍監存在&該舍監負責住宿生所住大樓
	insertVR: async function (vr_type, resident_ID, housemaster_ID) {
		let query1 = await db.query(`SELECT * FROM resident_student WHERE user_ID='${resident_ID}';`); // 是否為住宿生
		let query2 = await db.query(`SELECT * FROM dormitory WHERE housemaster_ID='${housemaster_ID}';`); // 取得舍監管理的宿舍
		let dorm1 = await db.query(`SELECT dorm_name FROM resident_student WHERE user_ID='${resident_ID}';`); // 
		let dorm2 = await db.query(`SELECT dorm_name FROM dormitory WHERE housemaster_ID='${housemaster_ID}';`);

		query1 = utils.decodeRows(query1);
		query2 = utils.decodeRows(query2);
		dorm1 = utils.decodeRows(dorm1);
		dorm2 = utils.decodeRows(dorm2);

		if (query1 != null && query2 != null && dorm2.some(element => element.dorm_name == dorm1[0].dorm_name)) {
			try {
				await db.query(`INSERT INTO violation_record 
				(vr_type, resident_ID, housemaster_ID) 
				VALUES('${vr_type}','${resident_ID}','${housemaster_ID}');`);
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
		const query = await db.query(`SELECT * FROM violation_record WHERE vr_ID='${vr_ID}';`);
		if (query != null) {
			try {
				await db.query(`DELETE FROM violation_record WHERE vr_ID='${vr_ID}';`);
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
	modifyVR: async function (vr_ID, vr_type) {
		try{
			await db.query(`UPDATE violation_record SET vr_type='${vr_type}' WHERE vr_ID='${vr_ID}';`);
		}catch(err){
			console.log(err);
		}
	},

	//查看一項違規紀錄(所有人)
	selectVR: async function (vr_ID) {
		const row = await db.query(`SELECT * FROM violation_record WHERE vr_ID='${vr_ID}';`);

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
		const rows = await db.query(`SELECT * FROM violation_record WHERE resident_ID='${resident_ID}';`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	}

}

module.exports = public;