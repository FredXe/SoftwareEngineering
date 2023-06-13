
const tables = require('../models/tables');

const public = {
	getDbAdmin: (req, res) => {
		res.render('foo');
	},

	postDrop: (req, res) => {
		tables.drop();
		res.redirect('/db');
	},

	postInit: (req, res) => {
		tables.init();
		res.redirect('/db');
	},

	postReset: (req, res) => {
		tables.reset();
		res.redirect('/db');
	},

	postImport: (req, res) => {
		tables.import();
		res.redirect('/db');
	},

	postSelectUser: (req, res) => {
		tables.selectUser();
		res.redirect('/db');
	}


}



module.exports = public;