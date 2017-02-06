var express = require('express');
// To make use of Express' routing capabilities you need to initiate a new Express Router.
var router = express.Router();
var parsedUsers = require('./../userreader');

var app = express();

// tell Express to use your router
app.use(router);



