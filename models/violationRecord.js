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
    

    insertVR: async function (vr_ID, vr_date, vr_type, resident_ID, housemaster_ID) {
        await db.query(`INSERT INTO violation_record (vr_ID, vr_date, vr_type, resident_ID, housemaster_ID) VALUES(${vr_ID},${vr_date},${vr_type},${resident_ID},${housemaster_ID});`);
    },
    
    deleteVR: async function (vr_ID) {
        await db.query(`DELETE FROM violation_record WHERE vr_ID=${vr_ID};`);
    },

    modifyVR: async function (vr_ID, vr_date, vr_type, resident_ID, housemaster_ID) {
        await db.query(`UPDATE violation_record SET vr_date=${vr_date}, vr_type=${vr_type}, resident_ID=${resident_ID}, housemaster_ID=${housemaster_ID} WHERE guest_id=${vr_ID};`);
    },

    selectVR: async function (vr_ID) {
        const row = await db.query(`SELECT * FROM violation_record WHERE vr_ID=${vr_ID};`);
        console.log(row);
    },
	selectAllVR: async function () {
		const rows = await db.query('SELECT * FROM violation_record;');
		const content = JSON.parse(JSON.stringify(rows));
		console.log(content);
	}
	
}

// public.import();

module.exports = public;