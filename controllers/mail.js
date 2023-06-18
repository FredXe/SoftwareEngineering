const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const mail = require('../models/mail');

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: process.env.MAIL_ACCOUNT, // generated ethereal user
		pass: process.env.MAIL_PASSWORD, // generated ethereal password
	},
});

// // send mail with defined transport object
// let info = await transporter.sendMail({
// 	to: "a1095532@mail.nuk.edu.tw, a1095510@mail.nuk.edu.tw", // list of receivers
// 	subject: ":D:D:D", // Subject line
// 	text: "Hello world?", // plain text body
// 	html: "<b>http://localhost:8888/mail/forgotpassword</b>", // html body
// });

const public = {
	postForgotPassword: async (req, res) => {
		const user_ID = req.body.user_ID;

		const userMail = await mail.selectMail(user_ID);
		const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (15 * 60), user: user_ID }, process.env.SECRET)

		console.log(userMail);
		try {
			await transporter.sendMail({
				to: userMail, // list of receivers
				subject: "Reset your password in 15 minutes", // Subject line
				html: `點擊下方的超連結以重新設定您的密碼，如果您沒有進行嘗試重設您的密碼的動作，請再麻煩您忽略我們系統自動發送的這封電子郵件。 \
					<br> <a href="http://localhost:8888/mail/changepassword?token=${token}">點擊我這邊以重新設定您的密碼</a> <br> \
					請勿回覆這封電子郵件。`, // html body
			});

		} catch (err) {
			console.log(err);
		}

	},

	getForgotPassword: async (req, res) => {

		res.render('forgotPassword');

	},

	getChangePassword: async (req, res) => {

		res.render('changePassword');
	},


	test: async () => {
		decode = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (15 * 60), user: 'test' }, process.env.SECRET, function (err, token) {
			console.log(token);
			console.log(jwt.verify(token, process.env.SECRET));
		});
	},

	main: async function () {

	}


}

// public.main().catch(console.error);
// public.test();

module.exports = public;