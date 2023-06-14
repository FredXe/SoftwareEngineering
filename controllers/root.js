const hash = require('./hash');
const root = require('../models/root');

const public = {
	getLogin: async (req, res) => {
		res.render('login');
		console.log('login page');
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

				const role = await root.showRole(user_ID);

				req.session.user_ID = user_ID;
				req.session.role = role;

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