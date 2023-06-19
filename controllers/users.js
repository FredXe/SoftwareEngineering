const users = require('../models/users');
const hash = require('./hash');


const public = {
	getRoot: async (req, res) => {
		res.redirect('/users/show');
	},

	getShow: async (req, res) => {
		const role = req.session.role;

		if (role == 'admin') {
			res.redirect('/users/show/all');
		} else {
			res.redirect('/users/show/myown');
		}
	},

	getShowAll: async (req, res) => {
		const user = await users.showUsers();
		console.log(user, '🤯');
		res.renderInjected('users');
	},

	getShowDetail: async (req, res) => {
		const role = req.session.role;
		const user_ID = (role == 'admin') ? req.params.user_ID : req.session.user_ID;
		const user = await users.showUsers(user_ID);
		console.log(user);
		res.renderInjected('users');
	},

	postUpdate: async (req, res) => {
		const role = req.session.role;
		let user_ID = req.session.user_ID;

		const { user_name, sex, email, phnumber } = req.body;

		if (role == 'admin') {
			user_ID = req.body.user_ID;
		}

		try {
			await users.updateUser(
				{
					user_ID: user_ID,
					user_name: user_name,
					sex: sex,
					email: email,
					phnumber: phnumber,
				}
			);

			res.redirect('/users/show');
		} catch (err) {
			console.error(err);
		}
	},

	postInsert: async (req, res) => {
		const { role, user_ID, user_name, sex, email, eroll_year, phnumber } = req.body;

		try {
			const password = await hash.hash(req.body.password);

			await users.insertUser(
				{
					role: role,
					user_ID: user_ID,
					user_name: user_name,
					sex: sex,
					password: password,
					email: email,
					eroll_year: eroll_year,
					phnumber: phnumber
				}
			);

			res.redirect('/users/show');
		} catch (err) {
			console.error(err);
		}
	},

	postDelete: async (req, res) => {
		const userRole = req.session.role;
		let user_ID = req.session.user_ID;
		let deleteRole = req.session.role;

		if (userRole == 'admin') {
			user_ID = req.body.user_ID;
			deleteRole = req.body.role;
		}


		try {
			await users.insertUser({ role: deleteRole, user_ID: user_ID, });

			res.redirect('/users/show');
		} catch (err) {
			console.error(err);
		}
	},
}

module.exports = public;