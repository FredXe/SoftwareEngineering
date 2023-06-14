const bulletionBoard = require('../models/bulletionBoard');

const public = {
	showBulletionTitles: async (req, res) => {
		const bulletionTitle = await bulletionBoard.showBulletion();
		console.log(bulletionTitle);
		res.renderInjected('bulletion', bulletionTitle);
	},

	bulletionDump: async (req, res) => {
		var bulletion = await bulletionBoard.showBulletionContent();

		for (let index = 0; index < bulletion.length; index++) {
			const element = bulletion[index];
			const chat = await bulletionBoard.showComment(element.bb_ID);
			element.comments = chat;
		}

		let viewInd = req.params.bb_ID || -1;

		res.renderInjected(`bulletion`, {
			bulletion,
			viewInd,
		});
	},

	postPost: async (req, res) => {
		await bulletionBoard.insertBulletion(req.body.housemasterID, req.body.title, req.body.text);
		res.redirect('/bulletion');
	},

	comment: async (req, res) => {
		const bb_ID = req.params.bb_ID;
		const user_ID = req.body.user_ID;
		const content = req.body.content;

		await bulletionBoard.insertComment(bb_ID, user_ID, content);

		res.redirect('/bulletion/' + bb_ID);
	},

	delBulletion: async (req, res) => {
		await bulletionBoard.deleteBulletion(req.body.bb_ID, req.body.housemaster_ID);
		res.redirect('/bulletion');
	},

	delComment: async (req, res) => {
		const bb_ID = req.params.bb_ID;
		bulletionBoard.deleteComment(req.body.bb_ID, req.body.comment_ID);

		res.redirect('/bulletion/' + bb_ID);
	},

}


module.exports = public;