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

    insertRA: async function (file) {
		const content = (await fs.readFile(file)).toString();
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

    
    deleteRA: async function (rA_ID) {
        db.query(`DELETE FROM residentApplication WHERE rA_ID=${rA_ID};`);

		console.log('已刪除');
    },

    modifyRA: async function (rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) {
        db.query(`UPDATE residentApplication 
				SET rA_semester=${rA_semester}, dorm_name=${dorm_name}, rA_approve=${rA_approve},
				rA_fee=${rA_fee}, student_ID=${student_ID} 
				WHERE rA_ID=${rA_ID};`);
    
		return new Promise (resolve => {
			resolve('已更新');
		});
	},

    selectRA: async function (rA_ID) {
        const row = await db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID};`);
        
		return new Promise (resolve => {
			resolve(row);
		});
    },
	selectAllRA: async function () {
		const rows = await db.query('SELECT * FROM residentApplication;');
		const content = JSON.parse(JSON.stringify(rows));
		
		return new Promise (resolve => {
			resolve(content);
		});
	},
    selectALLRAFee: async function () { //已approve的fee
        let approve = 1
		const rows = await db.query(`SELECT rA_ID, rA_fee, student_ID 
									FROM residentApplication 
									WHERE rA_approve=${approve};`);
		const content = JSON.parse(JSON.stringify(rows));
		
		return new Promise (resolve => {
			resolve(content);
		});
	},
    isApprove: async function (rA_ID) {
		const visitApprove = await db.query(`SELECT rA_approve 
											FROM residentApplication 
											WHERE rA_ID=${rA_ID};`);
		
		return new Promise (resolve => {
			resolve(visitApprove);
		});
	},
    approveRA: async function (rA_ID) {
		let approve = 1;
		db.query(`UPDATE residentApplication SET rA_approve=${approve} WHERE rA_ID=${rA_ID};`);

		return new Promise (resolve => {
			resolve('已核准');
		});
	}
	
}

// public.import();

module.exports = public;