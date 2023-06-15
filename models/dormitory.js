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

	showRoom: async function (dormName) {
		const rows = await db.query(`select dorm_name , r_volume , r_cost' +
            'from room where dorm_name = '${dormName}';`)
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
	},

	shwoEquip: async function (dormName, roomNum) {
		const rows = await db.query(`select * ` +
			`from equipment where dorm_name = '${dormName} and r_number = ${roomNum}';`)
		const content = utils.decodeRows(rows);

		return new Promise(resolve => {
			resolve(content);
		});
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

	insert: async function (dormName, dormVolume, housemasterID) {
		const query = `insert into dormitory (dorm_name , dorm_volume , housemaster_ID) ` +
			`values ( '${dormName}' , ${dormVolume} , '${housemasterID}');`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
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

	insertEquipment: async function (eType, eCondition, roomNum, dormName) {
		const query = `insert into equipment (e_type , e_condition , r_number , dorm_Name) ` +
			`values ( '${eType}' , ${eCondition} , ${roomNum} , '${dormName}');`;
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

	delEquip: async function (eID, dormName, roomNum) {
		const query = `delete from equipment where e_ID = ${eID} and dorm_name = '${dormName}' and r_number = ${roomNum};`;
		try {
			await db.query(query);
			await db.query(queryEquip);
		} catch (err) {
			console.error(err);
		}
	},

	applyRepair: async function (dorm_name, room_num, equipment_ID) {
		const query = `update equipment set e_condition = 0 from equipment ` +
			`where equipment.dorm_name = ${dorm_name} and equipment.r_number = ${room_num} and equipment.e_ID = ${equipment_ID};`;

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

	finishRepair: async function (dorm_name, room_num, equipment_ID) {
		const query = `update equipment set e_condition = 1 from equipment ` +
			`where equipment.dorm_name = ${dorm_name} and equipment.r_number = ${room_num} and equipment.e_ID = ${equipment_ID};`;
		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = public;