const db = require('./db');
const fs = require('fs/promises');

const public = {

    /* 顯示布告欄(單純顯示大標題) */
    show_bulletion: async function () {
        const rows = await db.query('select user_name , bulletion_board.housemaster_ID , bb_title , release_time  from bulletion_board , users where bulletion_board.housemaster_ID = users.user_ID;');
        const content = JSON.parse(JSON.stringify(rows));
        
         // console.log(content);
        return new Promise(resolve => {
        resolve(content);
        });
    },

    show_bulletion_content: async function (click_ID) {
         // 先挑出公告內容
         const bulletion_rows = await db.query(`select user_name as housemaster_name, bb_title , bb_text , release_time  from bulletion_board , users where bulletion_board.housemaster_ID = users.user_ID and bulletion_board.bb_ID = ${click_ID};`);
         const bulletion_content = JSON.parse(JSON.stringify(bulletion_rows));

         return new Promise(resolve => {
            resolve(content);
         });
    },

    /* 顯示布告欄內文以及留言 */
    show_student_chat: async function (click_ID) { // 因為是點擊某個公告
        // 再挑出此公告的學生留言
        const student_chat_rows = await db.query(`select user_name , student_chat.resident_ID , mes_text , mes_time from student_chat , users where student_chat.resident_ID = users.user_ID and student_chat.bb_ID = ${click_ID}`);
        const student_chat_content = JSON.parse(JSON.stringify(student_chat_rows));

        return new Promise(resolve => {
            resolve(student_chat_content);
         });
    },

    show_housemaster_chat: async function (click_ID) { // 因為是點擊某個公告
        // 再挑出此公告的舍監留言
        const housemaster_chat_rows = await db.query(`select user_name , housemaster_chat.housemaster_ID , mes_text , mes_time from housemaster_chat , users where housemaster_chat.housemaster_ID = users.user_ID and housemaster_chat.bb_ID = ${click_ID}`);
        const housemaster_chat_content = JSON.parse(JSON.stringify(housemaster_chat_rows));

        return new Promise(resolve => {
            resolve(housemaster_chat_content);
         });
    },

    /* 新增布告欄 */
    insert_bulletion: async function () {
        const rows = (await fs.readFile('./json/insert_bulletion.json')).toString();
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

    /* 新增學生留言 */
    insert_student_chat: async function () {
        const rows = (await fs.readFile('./json/insert_student_chat.json')).toString();
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

    /* 新增舍監留言 */
    insert_student_chat: async function () {
        const rows = (await fs.readFile('./json/insert_housemaster_chat.json')).toString();
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

    delete_bulletion: async function (want_delete_ID , owner_ID) {
        //還沒寫驗權限
        db.query(`delete from bulletion_board where ${owner_ID} = bulletion_board.housemaster_ID and ${want_delete_ID} = bulletion_board.bb_ID`);
        db.query(`delete from student_chat where ${want_delete_ID} = student_chat.bb_ID`);
        db.query(`delete from housemaster_chat where ${want_delete_ID} = student_chat.bb_ID`);

        console.log('已刪除')
    },

    delete_student_chat: async function (want_delete_ID , owner_ID) {
        //還沒寫驗權限
        db.query(`delete from student_chat where ${want_delete_ID} = student_chat.mes_ID and student_chat.resident_ID = ${owner_ID}`);

        console.log('已刪除')
    },

    delete_housemaster_chat: async function (want_delete_ID , owner_ID) {
        //還沒寫驗權限
        db.query(`delete from housemaster_chat where ${want_delete_ID} = housemaster_chat.mes_ID and housemaster_chat.resident_ID = ${owner_ID}`);

        console.log('已刪除')
    },
}

module.exports = public;
