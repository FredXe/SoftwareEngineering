const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');
const { log } = require('console');


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

	deleteVR: async function (vr_ID) {
		try {
			await db.query(`DELETE FROM violation_record WHERE vr_ID=${vr_ID};`);
		} catch (err) {
			console.error(err);
		}

		console.log('deleteVR()');
	},

	modifyVR: async function (vr_ID, vr_date, vr_type, resident_ID, housemaster_ID) {
		try {
			await db.query(`UPDATE violation_record 
					SET vr_date=${vr_date}, vr_type=${vr_type}, resident_ID=${resident_ID}, 
					housemaster_ID=${housemaster_ID} 
					WHERE guest_id=${vr_ID};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('modifyVR()');
		});
	},

	selectVR: async function (vr_ID) {
		const row = await db.query(`SELECT * FROM violation_record WHERE vr_ID=${vr_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	selectAllVR: async function () {
		const rows = await db.query('SELECT * FROM violation_record;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	}

}

module.exports = public;