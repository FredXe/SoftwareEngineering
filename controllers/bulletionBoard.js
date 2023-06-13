const bulletionBoard = require('../models/bulletionBoard');

const public = {
	showBulletionTitles: async (req, res) => {
		const bulletionTitle = await bulletionBoard.showBulletion();
		res.render('bulletionBoard', bulletionTitle);
	},

	showBulletionContent: async (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		const bulletionText = await bulletionBoard.showBulletionContent();
		const chat = await bulletionBoard.showHousemasterChat();
		res.render(`bulletionBoard`, { bulletionText, chat });
	},

	addBulletion: (req, res) => {
		bulletionBoard.insertBulletion(req.body.housemasterID, req.doby.bbTitle, req.body.bbText);
		res.redirect('/bulletionBoard');
	},

	addStuChat: (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		bulletionBoard.insertStudentChat(req.body.bbID, req.body.residentID, req.body.mestext);
		res.redirect(`/bulletionBoard/${bulletionTitle}`);
	},

	addHouseChat: (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		bulletionBoard.insertHousemasterChat(req.body.bbID, req.body.housemasterID, req.body.mestext);
		res.redirect(`/bulletionBoard/${bulletionTitle}`);
	},

	delBulletion: (req, res) => {
		bulletionBoard.deleteBulletion(req.body.bbID, req.body.housemasterID);
		res.redirect('/bulletionBoard');
	},

	delStuChat: (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		bulletionBoard.deleteStudentChat(req.body.bbID, req.body.mesID, req.body.residentID);
		res.redirect(`/bulletionboard/${bulletionTitle}`);
	},

	delHouseChat: (req, res) => {
		const bulletionTitle = req.url.split('/')[3];
		bulletionBoard.deleteHousemasterChat(req.body.bbID, req.body.mesID, req.body.housemasterID);
		res.redirect(`/bulletionboard/${bulletionTitle}`);
	},

	directList: (req, res) => {
		// res.redirect('/bulletionBoard');
		res.render('bulletionBoard');
	}

}


module.exports = public;