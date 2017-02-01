const fs = require('fs');

var users = JSON.parse(fs.readFileSync('./users.json'));

module.exports = {
	getUsers: function() {
		return users;
	},
};


