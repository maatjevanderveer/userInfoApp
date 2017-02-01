console.log("hello world!")

var express = require('express');
var app = express();
var pug = require('pug');
var parsedJSON = require(__dirname + '/userreader');

app.set('view engine', 'pug');

app.get('/', (request, response) => {
	response.render('index', {users: parsedJSON.getUsers() });
});

app.listen(3000, () => {
	console.log('Web Server is running on port 3000')
});

