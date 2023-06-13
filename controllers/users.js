const users = require('../models/users');
const hash = require('./hash');


const public = {
	getRoot: async (req, res) => {
		res.render('users');
	},

	getAdminShow: async (req, res) => {

		res.send(await users.showAdmin());
	},

	getHousemasterShow: async (req, res) => {
		res.send(await users.showHousemaster());
	},

	getNonResidentStudentShow: async (req, res) => {
		res.send(await users.showNonResidentStudent());
	},

	getMaintainerShow: async (req, res) => {
		res.send(await users.showUsers());
	},

	postAdminInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = (req.body.password);
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

		res.redirect('/users');
	},

	postNonResidentStudentInsert: async (req, res) => {
		const user_ID = req.body.user_ID;
		const user_name = req.body.user_name;
		const sex = req.body.sex;
		const password = req.body.password;
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

		res.redirect('/users');
	},
}

module.exports = public;