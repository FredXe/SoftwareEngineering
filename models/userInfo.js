const db = require('./db');
const fs = require('fs/promises');
const utils = require('./utils');

const public = {
    show: async function () {
        const rows = await db.query('select users.user_ID , users.user_name , resident_student.dorm_name , resident_student.r_number ' + 
                                    'from resident_student , users , room ' + 
                                    'where resident_student.user_ID = users.user_ID;');
        const content = utils.decodeRows(rows);

        return new Promise(resolve => {
            resolve(content);
            });
    },

    delete: async function (student_ID) {
        const query = db.query(`delete from resident_student where resident_student.user_ID = ${student_ID};`);

        try {
			db.query(query);
		} catch (err) {
			console.error(err);
		}
    }
}

module.exports = public;