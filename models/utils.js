const fs = require('fs/promises');

const public = {
	/**
	 * Convert Rows into Object with JSON's 
	 * static functions
	 * @param {RowDataPacket} rows Rows input
	 * @returns Object that `rows` expressed
	 */
	decodeRows: function (rows) {
		return JSON.parse(JSON.stringify(rows));
	},

	itObject: function* (obj) {
		for (let k in obj) yield [k, obj[k]];
	},

	json2InsertQuery: async function (file) {
		const content = (await fs.readFile(file)).toString();
		const data = JSON.parse(content);
		var query = '';

		for (let [table, rows] of this.itObject(data)) {
			for (let index = 0; index < rows.length; index++) {
				const row = rows[index];

				var column = '';
				var value = '';

				for (let [attribute, val] of this.itObject(row)) {
					column = `${column} ${attribute}, `;
					value = (typeof val == 'string') ? `${value} '${val}', ` :
						`${value} ${val}, `;
				}

				column = column.slice(0, column.length - 2);
				value = value.slice(0, value.length - 2);

				query = query + `INSERT INTO ${table} (${column}) VALUE (${value});\n`;
			}
		}
		return new Promise(
			resolve => {
				resolve(query);
			}
		);
	}
}



module.exports = public;