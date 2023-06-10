const db = require('./db');

db.query('SELECT * FROM test;', (err, rows) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(rows);
});