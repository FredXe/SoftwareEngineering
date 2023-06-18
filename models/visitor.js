const db = require('./db');
const utils = require('./utils');

/**
 * Table operations
 */
const public = {
	insertVisitor: async function (guest_ID, dorm_name, visit_date, visit_approve) {
		const query1 = `SELECT * FROM guest WHERE guest_ID=${guest_ID};`;
		if ((db.query(query1)) === null) {
			const query2 = `INSERT INTO apply_visit (guest_ID, dorm_name, visit_date, visit_approve) 
						VALUES(${guest_ID},${dorm_name},${visit_date},${visit_approve});`;

			try {
				await db.query(query2);
				console.log('insertVisitor()')
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('no this guest, fail insertVisitor().');
		}
		
	},

	deleteVisitor: async function (guest_ID) {
		const query = `SELECT * FROM apply_visit WHERE guest_ID=${guest_ID};`;
		if ((db.query(query)) === null) {
			try {
				await db.query(`DELETE FROM apply_visit WHERE guest_ID=${guest_ID};`);
				console.log('deleteVisitor');
			} catch (err) {
				console.error(err);
			}
	
			console.log('deleteVisitor()');
		} else {
			console.log('no this apply_visit, fail deleteVisitor().');
		}
		
	},

	modifyVisitor: async function (guest_ID, dorm_name, visit_date, visit_approve) {
		const query = `SELECT * FROM apply_visit WHERE guest_ID=${guest_ID};`;
		if ((db.query(query)) === null) {
			try {
			await db.query(`UPDATE apply_visit SET` +
				`visit_date=${visit_date}, visit_approve=${visit_approve} ` +
				`WHERE guest_ID=${guest_ID};`);
				console.log('modifyVisitor()');
			
			} catch (err) {
				console.error(err);
			}

		} else {
			console.log('no this apply_visit, fail modifyVisitor().');
		}
		
	},

	selectVisitor: async function (guest_ID) {
		const row = await db.query(`SELECT * FROM apply_visit WHERE guest_ID=${guest_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(row));
		});
	},

	selectAllVisitor: async function () {
		const rows = await db.query('SELECT * FROM apply_visit;');

		//console.log(rows);
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
		let approve = 0;
		const query = `SELECT * FROM apply_visit WHERE guest_ID=${guest_ID} AND rA_approve=${approve};`;
		if((db.query(query)) === null) {
			try {
				approve = 1;
				await db.query(`UPDATE apply_visit SET visit_approve=${approve} 
							WHERE guest_ID=${guest_ID};`);
				console.log('approveVisit()');
			} catch (err) {
				console.error(err);
			}
		} else {
			console.log('no this apply_visit, fail approveVisit().');
		}
		
	}

}


module.exports = public;