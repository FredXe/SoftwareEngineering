const public = {
	/**
	 * Convert Rows into Object with JSON's 
	 * static functions
	 * @param {RowDataPacket} rows Rows input
	 * @returns Object that `rows` expressed
	 */
	decodeRows: function (rows) {
		return JSON.parse(JSON.stringify(rows));
	}
}


module.exports = public;