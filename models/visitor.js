const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');
const { log } = require('console');
const { query } = require('express');



/**
 * Table operations
 */
const public = {
	insertVisitor: async function (file) {
		const query = `...`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	deleteVisitor: async function (guest_id) {
		db.query(`DELETE FROM apply_visit WHERE guest_id=${guest_id};`);

		console.log('已刪除');
	},

	modifyVisitor: async function (guest_id, dorm_name, visit_date, visit_approve) {
		try {
			db.query(`UPDATE apply_visit SET dorm_name=${dorm_name},` +
				`visit_date=${visit_date}, visit_approve=${visit_approve} ` +
				`WHERE guest_id=${guest_id};`);
		} catch (err) {
			console.error(err);
		}

		return new Promise(resolve => {
			resolve('已更新');
		});
	},

	selectVisitor: async function (guest_id) {
		const row = await db.query(`SELECT * FROM apply_visit WHERE guest_id=${guest_id};`);

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

	isApprove: async function (guest_id) {
		const visitApprove = await db.query(`SELECT visit_approve FROM apply_visit 
											WHERE guest_id=${guest_id};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(visitApprove));
		});
	},

	approveVisit: async function (guest_id) {
		const approve = 1;
		await db.query(`UPDATE apply_visit SET visit_approve=${approve} 
						WHERE guest_id=${guest_id};`);

		return new Promise(resolve => {
			resolve('已准許訪問');
		});
	}

}


module.exports = public;