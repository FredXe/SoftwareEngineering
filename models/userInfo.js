const db = require('./db');
const fs = require('fs/promises');

const public = {
    show: async function () {
        const rows = await db.query('select users.user_ID , users.user_name , resident_student.dorm_name , resident_student.r_number , from resident_student , users , room where resident_student.user_ID = users.user_ID;');
        const content = JSON.parse(JSON.stringify(rows));

        return new Promise(resolve => {
            resolve(content , resident_content);
            });
    },

    delete: async function (student_ID) {
        db.query(`delete from resident_student where ${student_ID} = resident_student.user_ID;`);

        return new Promise(resolve => {
            resolve("刪除住宿生成功!");
            });
    }
}

module.exports = public;