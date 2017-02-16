// import the necessary libraries/declare the necessary objects
var express = require('express'); // load the express library and store it into a variable called 'express'
var bodyparser = require('body-parser') //bodyparser is necessary for the middleware
var app = express(); // call the express function, and store it into a variable called 'app'
var fs = require('fs') // load the fs (filesystem) library for the readFile() method

// view engine setup
app.set('view engine', 'pug'); // pug is defined as the view engine in the express application
app.set('views', './views') // this defaults to the view directory in the application root directory

//MIDDLEWARE
app.use(express.static('static'));
// for all the routing make use of the bodyparser --> Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body. 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (request, response) => {
	console.log('de / is nu getriggered')
	fs.readFile('./users.json', (error, data) => { 	//stap 1. zorg dat je users.json inleest
		if (error) {
			throw error
		};
		console.log('file is read');
		var parsedUsers = JSON.parse(data); // parse users.json file 
		response.render('index', {parsedUsers: parsedUsers}); 	//render is how we take a pug template and render it as normal HTML
	});															// the second parameter of .render() MUST be an object --> {<randomkeyname>: parsedUsers} here, value is the array with al the users
});

// render the search.pug file and send it to the browser (displays a form which is the search bar)
app.get('/search', (request, response) => {
	response.render('search')
});

//render the register.pug file, and send it to the browser (displays a registration form for new users)
app.get('/register', (request, response) => {
	response.render('register')
});

// SEARCH BAR 
// post results in new page searchResults.pug
// app.post('/search', function (request, response) {
// 	var searchQuery = request.body.searchquery; //request the value written in the searchbar and store it into var

// 	fs.readFile('./users.json', (error, data) => { 	//lees users.json in
// 		if (error) {
// 			throw error
// 		};
// 		var parsedUsers = JSON.parse(data); // parse users.json file 

// 		for(var i=0; i < parsedUsers.length; i++) {
// 			if (searchQuery === parsedUsers[i].firstname || searchQuery === parsedUsers[i].lastname || searchQuery === parsedUsers[i].email){
// 				console.log('found!')
// 				console.log(parsedUsers[i])
// 				response.render('searchResults', {foundUser: parsedUsers[i]})
// 			}
// 		};
// 	});
// });

// SEARCH BAR W/ AUTOCOMPLETE
// post results in new page searchResults.pug
app.post('/searchKeyUp', function (request, response) {
	const searchQuery = request.body.userInput; //request the value written in the searchbar and store it into var
	const result =[]
	fs.readFile('./users.json', (error, data) => { 	//lees users.json in
		if (error) {
			throw error
		};
		
		const parsedUsers = JSON.parse(data); // parse users.json file, now it is an array with objects  
		for(var i=0; i < parsedUsers.length; i++) { // loop through the array
			const firstname = parsedUsers[i].firstname
			const lastname = parsedUsers[i].lastname
			const email = parsedUsers[i].email
			if (firstname.indexOf(searchQuery) >=0 ||lastname.indexOf(searchQuery) >=0 ||email.indexOf(searchQuery) >=0){
				console.log(parsedUsers[i])
				result.push(parsedUsers[i])
			}
		};
		response.send({result:result});
	});

});




// CREATE NEW USER
app.post('/register', (request, response) => {
	fs.readFile(__dirname + '/users.json', 'utf-8', (error, data) => { 	//lees users.json in
		if (error) {
			throw error
		};
		const parsedUsers = JSON.parse(data); // parse users.json file 

		const newuser = {
			firstname: request.body.newfirstname, 
			lastname: request.body.newlastname, 
			email: request.body.newemail
		}

		parsedUsers.push(newuser)
		const usersStringified = JSON.stringify(parsedUsers)

		fs.writeFile(__dirname + '/users.json', usersStringified, 'utf-8', (error, data) => {     //Convert a JavaScript object into a string with JSON.stringify().
			if (error) {
				throw error
			}
		})
		response.redirect('/')
	});
});

app.listen(3000, () => {
	console.log('Web Server is running on port 3000')
});
