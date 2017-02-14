'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ViagemSchema = new Schema({
	distancia: String,
	duracao: String,
	origem: String,
	destino: String,
	pessoa:String,
	passageiros: String,
	veiculo:String,
	observacao:String
});

module.exports = mongoose.model('Viagem', ViagemSchema);