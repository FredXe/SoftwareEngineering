const hash = require('../models/hash');
const users = require('../models/users');

const public = {
	postLogin: async (req, res) => {
		const user_ID = req.body.user_ID;
		const password = req.body.password;
		const hashpasswd = await users.showPassword(user_ID);

		const success = await hash.compare(password, hashpasswd);

		if (success) {
			req.session.regenerate(async (err) => {
				if (err)
					next(err);

				const role = await users.showRole(user_ID);

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