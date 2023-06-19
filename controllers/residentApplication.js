const residentApplication = require('../models/residentApplication');

const public = {
	getRoot: async (req, res) => {
		const role = req.session.role;

		if (role == 'admin') {
			res.redirect('residentApplication/list');
		} else {
			res.redirect('residentApplication/info');
		}
	},


	//查詢所有資料
	getResidentApplicationList: async (req, res) => {
		const residentApplicationInfos = await residentApplication.selectAllRA();
		res.renderInjected('residentApplication/list', {
			residentApplicationInfos
		});
	},

	getResidentApplicationApprove: async (req, res) => {
		const residentApplicationInfos = await residentApplication.selectAllRA();
		res.renderInjected('residentApplication/list', {
			residentApplicationInfos
		});
	},

	//申請宿舍
	postResidentApplicationApply: async (req, res) => {
		residentApplication.insertRA(req, body.rA_semester,
			req, body.dorm_name, req, body.rA_fee, req, body.student_ID);
		res.redirect('residentApplication/Info');
	},

	//駁回申請
	postResidentApplicationDelete: async (req, res) => {
		residentApplication.deleteRA(req.body.student_ID);
		res.redirect('residentApplication/');
	},

	//查詢已核可學生之住宿費
	getApproveResidentFee: async (req, res) => {
		const residentFee = await residentApplication.selectALLRAFee();
		res.renderInjected('residentApplication', { residentFee });
	},

	//查詢一筆申請資料
	getResidentApplicationInfo: async (req, res) => {
		const residentApplicationInfo = await residentApplication.selectRA(req.body.student_ID);
		res.renderInjected('residentApplication/detail', { residentApplicationInfo });
	},

	//核可某申請
	postResidentApprove: async (req, res) => {
		residentApplication.approveRA(req.body.student_ID);
		res.redirect('residentApplication/list');
	},



}

module.exports = public;