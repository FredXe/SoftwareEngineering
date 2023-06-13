const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');
const { log } = require('console');
const { query } = require('express');


async function sendSqlFromFile(sqlPath) {
	const content = (await fs.readFile(sqlPath)).toString();
	try {
		await db.query(content);
		return new Promise(resolve => {
			resolve('query done ' + sqlPath);
		});
	} catch {
		console.error('error while sendSqlFromFile');
		console.trace();
	}
}



/**
 * Table operations
 */
const public = {
    insertVisitor: async function (file) {
        const rows = (await fs.readFile(file)).toString();
		const data = JSON.parse(content);

		for (let [table, rows] of utils.isObject(data)) {
			for (let index = 0; index <rows.length; index++) {
				const row = rows[index];

				var column = '';
				var value = '';

				for (let [attribute, val] of utils.isObject(row)) {
					column = `${column} ${attribute}, `;
					value = (typeof val == 'string') ? `${value} '${val}', ` :
						`${value} ${val}, `;
				}

				column = column.slice(0, column.length - 2);
				value = value.slice(0, value.length - 2);

				const query = `INSERT INTO ${table} (${column}) VALUE (${value});`;
				db.query(query);
			}
		}
    },
    
    deleteVisitor: async function (guest_id) {
        db.query(`DELETE FROM apply_visit WHERE guest_id=${guest_id};`);

		console.log('已刪除');
    },

    modifyVisitor: async function (guest_id, dorm_name, visit_date, visit_approve) {
        db.query(`UPDATE apply_visit SET dorm_name=${dorm_name},
				visit_date=${visit_date}, visit_approve=${visit_approve} 
				WHERE guest_id=${guest_id};`);

		return new Promise (resolve => {
			resolve('已更新');
		});
    },

    selectVisitor: async function (guest_id) {
        const row = await db.query(`SELECT * FROM apply_visit WHERE guest_id=${guest_id};`);
        
		return new Promise (resolve => {
			resolve(row);
		});
    },
	selectAllVisitor: async function () {
		const rows = await db.query('SELECT * FROM apply_visit;');
		const content = JSON.parse(JSON.stringify(rows));
		
		return new Promise(resolve => {
			resolve(content);
		});
	},

	isApprove: async function (guest_id) {
		const visitApprove = db.query(`SELECT visit_approve FROM apply_visit 
											WHERE guest_id=${guest_id};`);
		
		return new Promise(resolve => {
			resolve(visitApprove);
		});
	},

	approveVisit: async function (guest_id) {
		let approve = 1;
		db.query(`UPDATE apply_visit SET visit_approve=${approve} 
						WHERE guest_id=${guest_id};`);

		return new Promise(resolve => {
			resolve('已准許訪問');
		});
	}
	
}

// public.import();

module.exports = public;