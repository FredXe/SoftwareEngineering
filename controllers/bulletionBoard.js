const public = {
	postComment: (req, res) => {
		console.log(req.body);

		res.redirect('/db');
	}

}


module.exports = public;