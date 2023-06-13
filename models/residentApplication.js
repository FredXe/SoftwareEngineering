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
    

    insertRA: async function (rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) {
        const row = await db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID};`)
        if (row === null) {
            await db.query(`INSERT INTO residentApplication (rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) VALUES(${rA_ID},${rA_semester},${dorm_name},${rA_approve},${rA_fee},${student_ID});`);
        }
    },
    
    deleteRA: async function (rA_ID) {
        await db.query(`DELETE FROM residentApplication WHERE rA_ID=${rA_ID};`);
    },

    modifyRA: async function (rA_ID, rA_semester, dorm_name, rA_approve, rA_fee, student_ID) {
        await db.query(`UPDATE residentApplication SET rA_semester=${rA_semester}, dorm_name=${dorm_name}, rA_approve=${rA_approve}, rA_fee=${rA_fee}, student_ID=${student_ID} WHERE rA_ID=${rA_ID};`);
    },

    selectRA: async function (rA_ID) {
        const row = await db.query(`SELECT * FROM residentApplication WHERE rA_ID=${rA_ID};`);
        console.log(row);
    },
	selectAllRA: async function () {
		const rows = await db.query('SELECT * FROM residentApplication;');
		const content = JSON.parse(JSON.stringify(rows));
		console.log(content);
	},
    selectALLRAFee: async function () { //已approve的fee
        let approve = 1
		const rows = await db.query(`SELECT rA_ID, rA_fee, student_ID FROM residentApplication WHERE rA_approve=${approve};`);
		const content = JSON.parse(JSON.stringify(rows));
		console.log(content);
	},
    isApprove: async function (rA_ID) {
		const visit_approve = await db.query(`SELECT rA_approve FROM residentApplication WHERE rA_ID=${rA_ID};`);
		console.log(visit_approve);
	},
    approveRA: async function (rA_ID) {
		let approve = 1;
		await db.query(`UPDATE residentApplication SET rA_approve=${approve} WHERE rA_ID=${rA_ID};`);
	}
	
}

// public.import();

module.exports = public;