const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {
	insertVisitor: async function (guest_ID, dorm_name, visit_date, visit_approve) {

		const query = `INSERT INTO apply_visit (guest_ID, dorm_name, visit_date, visit_approve) 
						VALUES(${guest_ID},${dorm_name},${visit_date},${visit_approve});`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	deleteVisitor: async function (guest_ID) {
		try {
			await db.query(`DELETE FROM apply_visit WHERE guest_ID=${guest_ID};`);
		} catch (err) {
			console.error(err);
		}

		console.log('deleteVisitor()');
	},

	modifyVisitor: async function (guest_ID, dorm_name, visit_date, visit_approve) {
		try {
			await db.query(`UPDATE apply_visit SET dorm_name=${dorm_name},` +
				`visit_date=${visit_date}, visit_approve=${visit_approve} ` +
				`WHERE guest_ID=${guest_ID};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('modifyVisitor()');
		});
	},

	selectVisitor: async function (guest_ID) {
		const row = await db.query(`SELECT * FROM apply_visit WHERE guest_ID=${guest_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	selectAllVisitor: async function () {
		const rows = await db.query('SELECT * FROM apply_visit;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	isApprove: async function (guest_ID) {
		const visitApprove = await db.query(`SELECT visit_approve FROM apply_visit 
											WHERE guest_ID=${guest_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(visitApprove));
		});
	},

	approveVisit: async function (guest_ID) {
		const approve = 1;
		try {
			await db.query(`UPDATE apply_visit SET visit_approve=${approve} 
						WHERE guest_ID=${guest_ID};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('approveVisit()');
		});
	}

}


module.exports = public;