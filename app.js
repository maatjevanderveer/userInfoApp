var express = require('express'); // load the express library and store it into a variable called 'express'
var pug = require('pug'); // load the pug library, and store it into a variable called 'pug'
var bodyparser = require('body-parser') //bodyparser is necessary for the middleware

var parsedUsers = require(__dirname + '/userreader'); // load the userreader.js file, and store it into a variable called 'parsedJSON'

var app = express(); // call the express function, and store it into a variable called 'app'

// view engine setup
app.set('view engine', 'pug'); // pug is defined as the view engine in the express application

//for all the routing make use of the bodyparser
app.use(bodyparser());

app.get('/', (request, response) => {
	response.render('index', {users: parsedUsers.getUsers() }); //render is how we take a pug template and render it as normal HTML
});
// render a page, that displays a form which is the search bar
app.get('/search', (request, response) => {
	response.render('search')
});
//render a page that displays a registration form for new users
app.get('/register', (request, response) => {
	response.render('register')
});

// takes in the post request from your search bar.
app.post('/search', (request, response) => {
	var searchQuery = 
	// receive the form data and store in variable
});

// takes in the post request from your register form.
app.post('/register', (request, response) => {
	// receive the form data
});

app.listen(3000, () => {
	console.log('Web Server is running on port 3000')
});

