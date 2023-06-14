
const ROLE2NUM = {
	'admin': 0,
	'housemaster': 1,
	'resident_student': 2,
	'non_resident_student': 3,
	'GUEST': 4
}

const public = {

	auth: function (requiredRole) {
		return (req, res, next) => {
			const role = req.session.role;
			console.log(role);
			if (requiredRole == role) {
				next();
				return;
			}

			res.render('login');
		};
	}
}

module.exports = public;