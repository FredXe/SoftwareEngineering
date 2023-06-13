const public = {
	getBulletionBoard: async (req, res) => {

	},

	postBulletionBoard: async (req, res) => {

	},

	postDelBulletionBoard: async (req, res) => {

	},

	postDelComment: async (req, res) => {
		console.log('postDelComment');
	},

	getComment: async (req, res) => {


	},

	postComment: (req, res) => {
		console.log(req.body);

		res.redirect('/db');
	},

}


module.exports = public;