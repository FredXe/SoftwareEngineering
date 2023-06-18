const nodemailer = require('nodemailer');

const public = {
	postForgotPassword: async (req, res) => {
		res.send('postForgotPassword');
	},

	getForgotPassword: async (req, res) => {
		res.renderInjected('forgotPassword');
	},

	main: async function () {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: process.env.MAIL_ACCOUNT, // generated ethereal user
				pass: process.env.MAIL_PASSWORD, // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			to: "a1095532@mail.nuk.edu.tw, a1095510@mail.nuk.edu.tw", // list of receivers
			subject: ":D:D:D", // Subject line
			text: "Hello world?", // plain text body
			html: "<b>http://localhost:8888/mail/forgotpassword</b>", // html body
		});

		console.log("Message sent: %s", info.messageId);
	}

}

// public.main().catch(console.error);

module.exports = public;