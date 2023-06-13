const db = require('./db');
const fs = require('fs/promises');

const utils = require('./utils');

const public = {

	/* 顯示布告欄(單純顯示大標題) */
	showBulletion: async function () {
		const rows = await db.query(
			'select user_name, bulletion_board.housemaster_ID, bb_title,' +
			' release_time from bulletion_board, users where' +
			' bulletion_board.housemaster_ID = users.user_ID;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	showBulletionContent: async function (click_ID) {
		// 先挑出公告內容
		const bulletionRows = await db.query(
			`select user_name as housemaster_name, bb_title, bb_text, ` +
			`release_time  from bulletion_board , users where bulletion_board.housemaster_ID` +
			` = users.user_ID and bulletion_board.bb_ID = ${click_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(bulletionRows));
		});
	},

	/* 顯示布告欄內文以及留言 */
	showStudentChat: async function (click_ID) { // 因為是點擊某個公告
		// 再挑出此公告的學生留言
		const studentChatRows = await db.query(
			`select user_name, student_chat.resident_ID, mes_text, ` +
			`mes_time from student_chat, users where student_chat.resident_ID ` +
			`= users.user_ID and student_chat.bb_ID = ${click_ID}`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(studentChatRows));
		});
	},

	showHousemasterChat: async function (click_ID) { // 因為是點擊某個公告
		// 再挑出此公告的舍監留言
		const housemasterChatRows = await db.query(
			`select user_name, housemaster_chat.housemaster_ID, mes_text, ` +
			`mes_time from housemaster_chat , users where housemaster_chat.housemaster_ID ` +
			`= users.user_ID and housemaster_chat.bb_ID = ${click_ID}`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(housemasterChatRows));
		});
	},

	/* 新增布告欄 */
	insertBulletion: async function () {
		const query = '...';

		try {
			db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	/* 新增學生留言 */
	insertStudentChat: async function () {
		const query = '...';

		try {
			db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	/* 新增舍監留言 */
	insertStudentChat: async function () {
		const query = '...';

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	deleteBulletion: async function (bb_ID, housemaster_ID) {
		//還沒寫驗權限
		await db.query(`delete from bulletion_board where ${housemaster_ID} ` +
			`= bulletion_board.housemaster_ID and ${bb_ID} = bulletion_board.bb_ID`);
		await db.query(`delete from student_chat where ${bb_ID} = student_chat.bb_ID`);
		await db.query(`delete from housemaster_chat where ${bb_ID} = student_chat.bb_ID`);

		console.log('deleteBulletion()');
	},

	deleteStudentChat: async function (mes_ID, resident_ID) {
		//還沒寫驗權限
		await db.query(`delete from student_chat where student_chat.mes_ID ` +
			`= ${mes_ID} and student_chat.resident_ID = ${resident_ID}`);

		console.log('deleteStudentChat()');
	},

	deleteHousemasterChat: async function (want_delete_ID, owner_ID) {
		//還沒寫驗權限
		await db.query(`delete from housemaster_chat where housemaster_chat.mes_ID ` +
			`= ${want_delete_ID} and housemaster_chat.resident_ID = ${owner_ID}`);

		console.log('deleteHousemasterChat()');
	},
}

module.exports = public;
