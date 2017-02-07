// CREATE A MODULE THAT READS AND PARSES JSON FILE

// import necessary library, in this case the FileSystem for readFile()
const fs = require('fs');

// read the JSON file with the users info and parse it (convert text into a JS object)
// and store it into variable 'users'
var users = JSON.parse(fs.readFileSync('./users.json'));

// return users and store it it a new variable getUsers
var getUsers = function () {
	return users;
}

// read and parsed users are now stored and exported in getUsers variable
// now this module stored in getUsers is available in other files
module.exports = getUsers;

// module.exports = {
// 	getUsers: function() {
// 		return users;
// 	},
// };


