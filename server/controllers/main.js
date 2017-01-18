//requires
var express = require("express"),
	path = require("path"),
	pessoa = require('./pessoa.js'),
	model = require('../models/mainModel.js');


var init = function(app){
	model.init();

	pessoa.init(app);
}

//export
module.exports = {
	init: init
}