const dormitory = require('../models/dormitory');

const public = {
	showApplyRepair: async (req, res) => {
		const repairContent = await dormitory.showApplyRepair();
		res.renderInjected('applyRepair', {
			repairContent
		});
	},

	showResidentEquip: async (req , res) => {
		const residentEquip = dormitory.showResidentEqui(req.body.userID);
		res.renderInjected('residentEquip' , {
			residentEquip
		});
	},

	applyRepair: (req, res) => {
		dormitory.applyRepair(req.body.dormName, req.body.roomNum, req.body.equipmentID);
		res.redirect('/applyRepair');
	},

	finishRepair: (req, res) => {
		dormitory.finishRepair(req.body.dormName, req.body.roomNum, req.body.equipmentID);
		res.redirect('/applyRepair');
	},

	getApplyRepair: (req, res) => {
		res.redirect('/applyRepair/maintainerList');
	}
}

module.exports = public;