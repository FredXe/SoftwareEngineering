const db = require('./db');
const fs = require('fs/promises');

const utils = require('./utils');
const { error } = require('console');
const { comment } = require('../controllers/bulletionBoard');

const public = {

	/* 顯示布告欄(單純顯示大標題) */
	showBulletion: async function () {
		const rows = await db.query(
			'select bb_ID, user_name, bulletion_board.housemaster_ID, bb_title,' +
			' release_time from bulletion_board, users where' +
			' bulletion_board.housemaster_ID = users.user_ID;');

		return new Promise(resolve => {
			resolve(utils.decodeRows(rows));
		});
	},

	showBulletionContent: async function (bb_ID) {
		// 先挑出公告內容
		const bulletionRows = await db.query(
			`select user_name as housemaster_name, bb_title, bb_text, ` +
			`release_time  from bulletion_board , users where bulletion_board.housemaster_ID` +
			` = users.user_ID and bulletion_board.bb_ID = ${bb_ID};`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(bulletionRows));
		});
	},

	/* 顯示布告欄內文以及留言 */
	showComment: async function (bb_ID) { // 因為是點擊某個公告
		// 再挑出此公告的學生留言
		const comment = await db.query(
			`select comment_ID, user_name, comment.user_ID, content, ` +
			`mes_time from comment, users where comment.user_ID ` +
			`= users.user_ID and comment.bb_ID = ${bb_ID}`);

		return new Promise(resolve => {
			resolve(utils.decodeRows(comment));
		});
	},

	/* 新增布告欄 */
	insertBulletion: async function (housemasterID, bbtitle, bbtext) {
		const query = `insert bulletion_board (housemaster_ID, bb_title, bb_text )` +
			`values ('${housemasterID}', '${bbtitle}', '${bbtext}');`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	insertComment: async function (bb_ID, user_ID, content) {
		const query = `insert into comment (bb_ID, user_ID, content) ` +
			`values (${bb_ID}, '${user_ID}', '${content}');`;

		try {
			await db.query(query);
		} catch (err) {
			console.error(err);
		}
	},

	deleteBulletion: async function (bb_ID, housemaster_ID) {
		//還沒寫驗權限
		try {
			await db.query(`delete from bulletion_board where '${housemaster_ID}' ` +
				`= bulletion_board.housemaster_ID and bb_ID = ${bb_ID}`);

			await db.query(`delete from comment where bb_ID = ${bb_ID}`);

		} catch (err) {
			console.error(err);
		}
	},

	deleteComment: async function (bb_ID, comment_ID) {
		try {
			await db.query(`delete from comment where bb_ID = ${bb_ID} and comment_ID = ${comment_ID}`);
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = public;
