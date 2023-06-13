const bulletionBoard = require('../models/bulletionBoard');

const public = {
	showBulletionTitles: async (req, res) => {
		const bulletionTitle = await bulletionBoard.showBulletion();
		console.log(bulletionTitle);
		res.render('bulletion', bulletionTitle);
	},

	showBulletionContent: async (req, res) => {
		const bb_ID = req.url.split('/')[1];
		const bulletionText = await bulletionBoard.showBulletionContent(bb_ID);
		const chat = await bulletionBoard.showComment(bb_ID);

		console.log(bulletionText, chat);

		res.render(`bulletion`, { bulletionText, chat });
	},

	postPost: async (req, res) => {
		await bulletionBoard.insertBulletion(req.body.housemasterID, req.body.title, req.body.text);
		res.redirect('/bulletion');
	},

	comment: async (req, res) => {
		const bb_ID = req.url.split('/')[1];
		const user_ID = req.body.user_ID;
		const content = req.body.content;
		// if (req.session.role == 'non_resident_student') {
		// await bulletionBoard.insertStudentChat();
		// } else if (req.session.role == 'housemaster') {
		await bulletionBoard.insertComment(bb_ID, user_ID, content);
		// }
		res.redirect('/bulletion/' + bb_ID);
	},

	delBulletion: async (req, res) => {
		await bulletionBoard.deleteBulletion(req.body.bb_ID, req.body.housemasterID);
		res.redirect('/bulletion');
	},

	delComment: async (req, res) => {
		const bulletionTitle = req.url.split('/')[1];
		bulletionBoard.deleteStudentChat(req.body.bbID, req.body.mesID, req.body.residentID);
		res.redirect(`/bulletion/${bulletionTitle}`);

		res.redirect('/bulletion/' + bb_ID);
	},

	delStuChat: (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		bulletionBoard.deleteStudentChat(req.body.bbID, req.body.mesID, req.body.residentID);
		res.redirect(`/bulletion/${bulletionTitle}`);
	},

	delHouseChat: (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		bulletionBoard.deleteHousemasterChat(req.body.bbID, req.body.mesID, req.body.housemasterID);
		res.redirect(`/bulletion/${bulletionTitle}`);
	}

}


module.exports = public;