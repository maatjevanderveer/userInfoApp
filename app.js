console.log("this is the app.js file")


var express = require('express'); // load the express library and store it into a variable called 'express'
var app = express(); // call the express function, and store it into a variable called 'app'
var pug = require('pug'); // load the pug library, and store it into a variable called 'pug'
var parsedUsers = require(__dirname + '/userreader'); // load the userreader.js file, and store it into a variable called 'parsedJSON'

// view engine setup
app.set('view engine', 'pug'); // pug is defined as the view engine in the express application

app.get('/', (request, response) => {
	response.render('index', {users: parsedUsers.getUsers() });
});
// render a page, that displays a form which is the search bar
app.get('/search', (request, response) => {
	response.render('search')
});
//render a page that displays a registration form for new users
app.get('/register', (request, response) => {
	response.render('register')
})
// takes in the post request from your form. 

app.listen(3000, () => {
	console.log('Web Server is running on port 3000')
});

