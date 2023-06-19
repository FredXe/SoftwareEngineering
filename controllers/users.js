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

		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const email = req.body.email;

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
				}
			);

			res.redirect('/users/show');
		} catch (err) {
			console.error(err);
		}
	},

	postInsert: async (req, res) => {
		const role = req.session.role;
		let user_ID = req.session.user_ID;

		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const email = req.body.email;

		if (role == 'admin') {
			user_ID = req.body.user_ID;
		}
		// { role, user_ID, user_name, sex, password, email, eroll_year, phnumber }
		try {
			await users.insertUser(
				{
					user_ID: user_ID,
					user_name: user_name,
					sex: sex,
					email: email,
				}
			);

			res.redirect('/users/show');
		} catch (err) {
			console.error(err);
		}
	},

	postDelete: async (req, res) => {

	},

	postAdminInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = await hash.hash(req.body.password);
		const email = req.body.email;
		const eroll_year = req.body.eroll_year;
		const phnumber = req.body.phnumber;

		await users.insertAdmin(
			user_ID,
			user_name,
			sex,
			password,
			email,
			eroll_year,
			phnumber
		);

		res.redirect('/users');
	},

	postHousemasterInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = await hash.hash(req.body.password);
		const email = req.body.email;
		const eroll_year = req.body.eroll_year;
		const phnumber = req.body.phnumber;

		await users.insertHousemaster(
			user_ID,
			user_name,
			sex,
			password,
			email,
			eroll_year,
			phnumber
		);

		res.redirect('/users');
	},

	postNonResidentStudentInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = await hash.hash(req.body.password);
		const email = req.body.email;
		const eroll_year = req.body.eroll_year;
		const phnumber = req.body.phnumber;

		await users.insertNonResidentStudent(
			user_ID,
			user_name,
			sex,
			password,
			email,
			eroll_year,
			phnumber
		);

		res.redirect('/users');
	},

	postMaintainerInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = await hash.hash(req.body.password);
		const email = req.body.email;
		const eroll_year = req.body.eroll_year;
		const phnumber = req.body.phnumber;

		await users.insertMaintainer(
			user_ID,
			user_name,
			sex,
			password,
			email,
			eroll_year,
			phnumber
		);

		res.redirect('/users');
	},
}

module.exports = public;