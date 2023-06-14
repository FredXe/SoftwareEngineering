const hash = require('./hash');
const root = require('../models/root');

const public = {
	getLogin: async (req, res) => {
		res.render('login');
	},

	postLogin: async (req, res) => {
		const user_ID = req.body.user_ID;
		const password = req.body.password;
		const hashpasswd = await root.showPassword(user_ID);

		const success = await hash.compare(password, hashpasswd);

		if (success) {
			req.session.regenerate(async (err) => {
				if (err)
					next(err);

				const data = await root.showUserData(user_ID);

				req.session.user_ID = data.user_ID;
				req.session.user_name = data.user_name;
				req.session.role = data.role;
				req.session.sex = data.sex;
				req.session.email = data.email;
				req.session.eroll_year = data.eroll_year;
				req.session.phnumber = data.phnumber;

				res.redirect('/db');
			});

		} else
			res.send('wrong');
	},

	postLogout: async (req, res) => {
		req.session.destroy((err) => {
			if (err) next(err);

			res.redirect('/db');
		});
	}
}

module.exports = public;