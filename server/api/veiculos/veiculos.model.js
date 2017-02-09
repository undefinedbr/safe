'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VeiculosSchema = new Schema({
	placa: String,
	modelo: String,
	cor: String,
	ano: String,
	cidade: String,
	quantidadeLugares: String
});

module.exports = mongoose.model('Veiculos', VeiculosSchema);