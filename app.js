// import the necessary libraries/declare the necessary objects
var express = require('express'); // load the express library and store it into a variable called 'express'
var pug = require('pug'); // load the pug library, and store it into a variable called 'pug'
var router = express.Router(); // To make use of Express' routing capabilities you need to initiate a new Express Router.
var bodyparser = require('body-parser') //bodyparser is necessary for the middleware
var searchRoutes = require(__dirname + '/routes/searchRoutes'); // load the searchRoutes.js file, and store it into a variable called 'searchRoutes'

var parsedUsers = require(__dirname + '/userreader'); // load the userreader.js file, and store it into a variable called 'parsedJSON'
var app = express(); // call the express function, and store it into a variable called 'app'

// view engine setup
app.set('view engine', 'pug'); // pug is defined as the view engine in the express application

// tell Express to use your router
app.use(router);

//for all the routing make use of the bodyparser --> Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body. 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
// app.use('/search', searchRoutes;)

app.get('/', (request, response) => {
	response.render('index', {users: parsedUsers.getUsers() }); //render is how we take a pug template and render it as normal HTML
});

// render the search.pug file and send it to the browser (displays a form which is the search bar)
app.get('/search', (request, response) => {
	response.render('search')
});

//render the register.pug file, and send it to the browser (displays a registration form for new users)
app.get('/register', (request, response) => {
	response.render('register')
});

// takes in the post request from your search bar.
// app.post('/search', (request, response) => {
// 	var searchQuery = request.body.search
// 	// receive the form data and store in variable
// });

// takes in the post request from your register form.
app.post('/register', (request, response) => {
	// receive the form data
});

app.listen(3000, () => {
	console.log('Web Server is running on port 3000')
});

