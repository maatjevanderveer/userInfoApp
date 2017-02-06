// CREATE THE ROUTE

var express = require('express');
var app = express();

// To make use of Express' routing capabilities you need to initiate a new Express Router.
var router = express.Router();
// tell Express to use your router
app.use(router);

var bodyparser = require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var parsedUsers = require('./../userreader');

// post results in new page searchResults.pug
app.post('/searchResults', function (request, response) {
	var searchQuery = request.body.name;
	// response.end('Search Query: ' + search)
	console.log(searchQuery)
});




