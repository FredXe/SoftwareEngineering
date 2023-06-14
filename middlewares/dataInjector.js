module.exports = (req, res, next) => {

	if (req.session.user_ID) {
		req.userData = {
			user_ID: req.session.user_ID,
			user_name: req.session.user_name,
			role: req.session.role,
			sex: req.session.sex,
			email: req.session.email,
			eroll_year: req.session.eroll_year,
			phnumber: req.session.phnumber,

		};
	} else {
		req.userData = null;
	}

	console.log(req.userData);

	res.renderInjected = (view, data, callback) => {
		res.render(view, {
			userData: req.userData,

			...data,
		}, callback);
	};

	next();
};