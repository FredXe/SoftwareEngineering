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
		const residentApplicationInfo = await residentApplication.selectRA(req.params.student_ID);
		res.renderInjected('residentApplication/detail', {
			residentApplicationInfo: residentApplicationInfo[0],
		});
	},

	//申請宿舍
	postResidentApplicationApply: async (req, res) => {
		const student_ID = req.session.user_ID;
		const dorm_name = req.body.dorm_name;
		await residentApplication.insertRA(student_ID, dorm_name);
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
		const residentApplicationInfo = await residentApplication.selectRA(req.session.user_ID);
		res.renderInjected('residentApplication/detail', { 
			residentApplicationInfo: residentApplicationInfo[0],
		});
	},

	//核可某申請
	postResidentApprove: async (req, res) => {
		residentApplication.approveRA(req.body.student_ID);
		res.redirect('residentApplication/list');
	},

	postPayTheFee: async (req, res) => {
		const student_ID = req.body.student_ID;
		residentApplication.payTheFee(student_ID);
	},

}

module.exports = public;