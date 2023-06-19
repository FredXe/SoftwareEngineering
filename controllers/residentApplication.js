const nodemailer = require('nodemailer');

const residentApplication = require('../models/residentApplication');
const mail = require('../models/mail');

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: process.env.MAIL_ACCOUNT, // generated ethereal user
		pass: process.env.MAIL_PASSWORD, // generated ethereal password
	},
});

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
		const student_ID = req.body.student_ID;
		residentApplication.approveRA(student_ID);

		try {
			const userMail = await mail.selectMail(student_ID);

			transporter.sendMail({
				to: userMail, // list of receivers
				subject: "您的住宿申請已通過", // Subject line
				html: `請在繳交期限前繳交費用`, // html body
			});

			res.redirect('residentApplication/list');
		} catch (err) {
			console.error(err);
		}

	},

	postPayTheFee: async (req, res) => {
		const student_ID = req.body.student_ID;

		try {
			const { dorm_name, room } = await residentApplication.payTheFee(student_ID);
			const userMail = await mail.selectMail(user_ID);

			transporter.sendMail({
				to: userMail, // list of receivers
				subject: "您的住宿費用已繳交", // Subject line
				html: `您已經入住 ${dorm_name} ${room} 號房`, // html body
			});
		} catch (err) {
			console.error(err);
		}
	},

}

module.exports = public;