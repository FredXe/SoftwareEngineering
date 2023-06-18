const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const hash = require('./hash');

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
		const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (5 * 60), user: user_ID }, process.env.SECRET)

		try {
			await transporter.sendMail({
				to: userMail, // list of receivers
				subject: "請在五分鐘以內重新設定您的密碼", // Subject line
				html: `點擊下方的超連結以重新設定您的密碼，如果您沒有進行嘗試重設您的密碼的動作，請再麻煩您忽略我們系統自動發送的這封電子郵件。 \
					<br> <a href="http://localhost:8888/mail/changepassword?token=${token}">點擊我這邊以重新設定您的密碼</a> <br> \
					請勿回覆這封電子郵件。`, // html body
			});

			res.send('page for password change has been mailed to your email');
		} catch (err) {
			console.error(err);
		}

	},

	getForgotPassword: async (req, res) => {

		res.render('forgotPassword');
	},

	getChangePassword: async (req, res) => {
		const token = req.query.token;
		const secret = process.env.SECRET;
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.redirect('/login');
				return;
			}
		});
		res.render('changePassword', { token: token });
	},

	postChangePassword: async (req, res) => {
		const token = req.body.token;
		const secret = process.env.SECRET;
		let user_ID;
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.redirect('/login');
				return;
			}
			user_ID = decoded.user;
		});

		const newPassword = req.body.newPassword;
		const newPasswdHashed = await hash.hash(newPassword);
		try {
			await mail.changePassword(user_ID, newPasswdHashed);
		} catch (err) {
			console.error(err);
		}
		res.send('changed password successfully');
	},

}


module.exports = public;