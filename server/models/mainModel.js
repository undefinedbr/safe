//require
var Mongoose = require('Mongoose');	

//create connection
var db = Mongoose.connection;

var init = function(){
	//create connection
	var db = Mongoose.connection;
	db.on('error', console.error);

	db.once('open', function() {
		console.log('Conectado ao MongoDB.');
	})

	Mongoose.connect('mongodb://localhost/rotas');
}

 module.exports = {
	init: init
};