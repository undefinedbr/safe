//requires
var express = require("express"),
	path = require("path"),
	pessoa = require('./pessoa.js'),
	veiculo = require('./veiculo.js'),
	model = require('../models/mainModel.js');


var init = function(app){
	model.init();

	pessoa.init(app);
	veiculo.init(app);
}

//export
module.exports = {
	init: init
}