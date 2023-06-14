
const ROLE2NUM = {
	'admin': 0,
	'housemaster': 1,
	'resident_student': 2,
	'non_resident_student': 3,
	'guest': 4
}

const public = {

	auth: function (requiredRole, only) {
		return (req, res, next) => {
			const role = req.session.role;

			const pass = only ? requiredRole == role : ROLE2NUM[requiredRole] >= ROLE2NUM[role];

			console.log('required=' + requiredRole + ' role=' + role + ' pass=' + pass);

			if (pass) {
				next();
				return;
			}

			res.redirect('/login');
		};
	}
}

module.exports = public;