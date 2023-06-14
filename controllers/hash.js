const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const public = {
	hash: async (password) => {
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hash = await bcrypt.hash(password, salt);
		return new Promise(resolve => {
			resolve(hash);
		})
	},

	compare: bcrypt.compare
};





module.exports = public;