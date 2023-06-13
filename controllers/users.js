const users = require('../models/users');


const public = {
	getRoot: async (req, res) => {
		res.render('users');
	},

	getUserShow: async (req, res) => {
		// users.
	},

	postAdminInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = req.body.password;
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

		res.render('users');
	},

	postHousemasterInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = req.body.password;
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

		res.render('users');
	},

	postNonResidentStudentInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = req.body.password;
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

		res.render('users');
	},

	postMaintainer: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = req.body.password;
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

		res.render('users');
	},
}

module.exports = public;