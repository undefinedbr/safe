//requires
var express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	path = require("path"),
	mainController = require('./server/controllers/main.js');

//body parser to encode requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));      

//initialize server
app.listen(3000);

mainController.init(app);

console.log("Running at Port 3000");