const dormitory = require('../models/dormitory');

const public = {
	showApplyRepair: async (req, res) => {
		const repairContent = await dormitory.showApplyRepair();
		res.reder('applyRepair', repairContent);
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
		res.render('applyRepair');
	}
}

module.exports = public;