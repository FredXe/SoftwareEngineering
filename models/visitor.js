const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');
const { log } = require('console');


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

    import: async function () {
		const content = (await fs.readFile('./models/json/import.json')).toString();
		const data = JSON.parse(content);

		for (let [table, rows] of utils.itObject(data)) {
			for (let index = 0; index < rows.length; index++) {
				const row = rows[index];

				var column = '';
				var value = '';

				for (let [attribute, val] of utils.itObject(row)) {
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
    

    insertVisitor: async function (guest_id, dorm_name, visit_date, visit_approve) {
        const row = await db.query(`SELECT * FROM apply_visit WHERE guest_id=${guest_id};`);
        if (row === null) {
            await db.query(`INSERT INTO apply_visit (guest_id, dorm_name, visit_date, visit_approve) VALUES(${guest_id},${dorm_name},${visit_date},${visit_approve});`);
        }
    },
    
    deleteVisitor: async function (guest_id) {
        await db.query(`DELETE FROM apply_visit WHERE guest_id=${guest_id};`);
    },

    modifyVisitor: async function (guest_id, dorm_name, visit_date, visit_approve) {
        await db.query(`UPDATE apply_visit SET dorm_name=${dorm_name}, visit_date=${visit_date}, visit_approve=${visit_approve} WHERE guest_id=${guest_id};`);
    },

    selectVisitor: async function (guest_id) {
        const row = await db.query(`SELECT * FROM apply_visit WHERE guest_id=${guest_id};`);
        console.log(row);
    },
	selectAllVisitor: async function () {
		const rows = await db.query('SELECT * FROM apply_visit;');
		const content = JSON.parse(JSON.stringify(rows));
		console.log(content);
	},

	isApprove: async function (guest_id) {
		const visit_approve = await db.query(`SELECT visit_approve FROM apply_visit WHERE guest_id=${guest_id};`);
		console.log(visit_approve);
	},

	approveVisit: async function (guest_id) {
		let approve = 1;
		await db.query(`UPDATE apply_visit SET visit_approve=${approve} WHERE guest_id=${guest_id};`);
	}
	
}

// public.import();

module.exports = public;