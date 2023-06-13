const public = {
	getRoot: async (req, res) => {
		res.render('users');
	},

	getUserShow: async (req, res) => {
		console.log('getUserShow');
	},

	postAdminInsert: async (req, res) => {
		res.send('postAdminInsert');
	},

	postHousemasterInsert: async (req, res) => {
	},


}

module.exports = public;