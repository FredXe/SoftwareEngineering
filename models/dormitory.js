const db = require('./db');
const utils = require('./utils');

const public = {
	// 顯示大樓資訊
	show: async function () {
		const rows = await db.query('select dorm_name, dorm_volume, housemaster_ID, user_name as housemaster_name ' +
			'from dormitory, users where dormitory.housemaster_ID = users.user_ID;');
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	insert: async function (dormName, dormVolume, housemasterID) {
		const query = `insert into dormitory (dorm_name , dorm_volume , housemaster_ID) ` +
			`values ( '${dormName}' , ${dormVolume} , '${housemasterID}');`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	modify: async function (dorm_name, want_update_attribute, update_value) {
		const quote = (want_update_attribute != "dorm_volume") ? "\'" : "";
		const query = `update dormitory set ${want_update_attribute} = ${quote + update_value + quote} where dorm_name = '${dorm_name}';`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	showRoom: async function (dormName) {
		const rows = await db.query(`select r_number, r_volume, r_cost ` +
			`from room where dorm_name = '${dormName}';`)
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	insertRoom: async function (dormName, roomVolume, roomCost) {
		const query = `insert into room (r_volume , r_cost , dorm_Name) ` +
			`values ( '${roomVolume}' , ${roomCost} , '${dormName}');`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	delDorm: async function (dormName) {
		const delDorm = `delete from dormitory where dorm_name = '${dormName}';`;

		try {
			await db.query(delDorm);
		} catch (err) {
			console.error(err);
		}
	},

	showEquip: async function (dormName, roomNum) {
		const rows = await db.query(`select * ` +
			`from equipment where dorm_name = '${dormName}' and r_number = '${roomNum}';`)
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	insertEquipment: async function (dormName, roomNum, eType, eCondition) {
		const query = `insert into equipment (e_type , e_condition , r_number , dorm_Name) ` +
			`values ( '${eType}' , ${eCondition} , ${roomNum} , '${dormName}');`;
		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},
	
	delRoom: async function (dormName, roomNum) {
        const query = `delete from room where dorm_name = '${dormName}' and r_number = ${roomNum};`;
        const queryEquip = `delete from equipment where dorm_name = '${dormName}' and r_number = ${roomNum};`;
        try {
            await db.query(query);
            await db.query(queryEquip);
        } catch (err) {
            console.error(err);
        }
    },

	delEquip: async function (dormName, roomNum, eID) {
		const query = `delete from equipment where e_ID = ${eID} and dorm_name = '${dormName}' and r_number = ${roomNum};`;
		try {
			await db.query(query);
			await db.query(queryEquip);
		} catch (err) {
			console.error(err);
		}
	},

	applyRepair: async function (dormName, roomNum, eID) {
		const query = `update equipment set e_condition = 0 ` +
			`where equipment.dorm_name = '${dormName}' and equipment.r_number = '${roomNum}' and equipment.e_ID = '${eID}';`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	showApplyRepair: async function () {
		const rows = await db.query('select dorm_name , r_number , e_type , e_ID from equipment where e_condition = 0;');
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	showResidentEqui: async function (userID) {
		const equipRows = await db.query(`select e_ID, e_type, e_condition from equipment nature join resident_student where user_ID = '${userID}';`);
		const dormRows = await db.query(`select dorm_name, r_number from resident_student where user_ID = '${userID}';`);

		const equipContent = utils.decodeRows(equipRows);
		const dormContent = utils.decodeRows(dormRows)[0];

		return new Promise(resolve => {
			resolve({...dormContent, equipContent});
		});
	},

	finishRepair: async function (dormName, roomNum, eID) {
		const query = `update equipment set e_condition = 1 ` +
			`where equipment.dorm_name = '${dormName}' and equipment.r_number = '${roomNum}' and equipment.e_ID = '${eID}';`;
		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = public;