const querystring = require('querystring');

const ROLE2NUM = {
	'admin': 0,
	'housemaster': 1,
	'resident_student': 2,
	'non_resident_student': 3,
	'maintainer': 4,
	'guest': 5
}

const public = {

	auth: function (requiredRole, only) {
		return (req, res, next) => {
			const role = req.session.role;

			if(!role){
				const query = querystring.stringify({
					'redirect': req.url,
				});
				res.redirect('/login?' + query);
				return;
			}

			const pass = only ? requiredRole == role : ROLE2NUM[requiredRole] >= ROLE2NUM[role];

			console.log('required=' + requiredRole + ' role=' + role + ' pass=' + pass);

			if (pass) {
				next();
				return;
			} else {
				res.status(403).renderInjected('info/forbidden');
				return;
			}
		};
	}
}

module.exports = public;