const residentApplication = require('../models/residentApplication');

const public = {
	//查詢所有資料
	getResidentApplyList: async (req, res) => {
		const residentApplicationInfos = await residentApplication.selectAllRA();
		res.renderInjected('residentApplication', { residentApplicationInfos });
	},

	//申請宿舍
	postResidentApply: async (req, res) => {
		residentApplication.insertRA(req, body.rA_semester,
			req, body.dorm_name, req, body.rA_fee, req, body.student_ID);
		res.redirect('residentApplication/Info');
	},

	//駁回申請
	postResidentApplyDelete: async (req, res) => {
		residentApplication.deleteRA(req.body.rA_ID);
		res.redirect('residentApplication/');
	},

	//取消申請
	postResidentApplyStudentDelete: async (req, res) => {
		residentApplication.deleteStudentRA(req.body.student_ID);
		res.redirect('residentApplication/');
	},

	//更改申請表
	postResidentApplyModify: async (req, res) => {
		residentApplication.modifyRA(req, body.rA_semester,
			req, body.dorm_name, req, body.rA_fee, req, body.student_ID);
		res.redirect('residentApplication/Info');
	},

	//查詢已核可學生之住宿費
	getApproveResidentFee: async (req, res) => {
		const residentFee = await residentApplication.selectALLRAFee();
		res.renderInjected('residentApplication', { residentFee });
	},

	//查詢一筆申請資料
	getResidentApplyInfo: async (req, res) => {
		const residentApplicationInfo = await residentApplication.selectRA(req.body.rA_ID);
		res.renderInjected('residentApplication', { residentApplicationInfo });
	},

	//查詢某學生申請資料
	getResidentApplyStudent: async (req, res) => {
		const residentApplicationStudent = await residentApplication.selectStudentRA(req.body.student_ID);
		res.renderInjected('residentApplication', { residentApplicationStudent });
	},

	//核可某申請
	postResidentApprove: async (req, res) => {
		residentApplication.approveRA(req.body.rA_ID, req.body.dorm_name);
		res.redirect('residentApplication/list');
	},



}

module.exports = public;