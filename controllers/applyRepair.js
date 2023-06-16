const dormitory = require('../models/dormitory');

const public = {
	showApplyRepair: async (req, res) => {
		const repairContent = await dormitory.showApplyRepair();
		res.renderInjected('applyRepairMaintainer', {
			repairContent
		});
	},

	showResidentEquip: async (req , res) => {
		const residentEquip = await dormitory.showResidentEqui(req.session.user_ID);
		res.renderInjected('applyRepairResident' , {
			dormName: residentEquip.dorm_name,
			roomNum: residentEquip.r_number,
			equips: residentEquip.equipContent,
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
		if(req.session.role == 'resident_student'){
			res.redirect('/applyRepair/residentList');
		}else{
			res.redirect('/applyRepair/maintainerList');
		}
	}
}

module.exports = public;