'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FamiliaSchema = new Schema({
	nome: String,
	cpf: String,
	altura: Number,
	sexo: String, 
	peso: Number,
	idade: Number,
	posicaoVeiculo: String,
	posicaoFamiliar: String,
	password: String,
	foto:String,
	pessoa:String
});

module.exports = mongoose.model('Familia', FamiliaSchema);