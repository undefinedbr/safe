//requires
var express = require("express"),
	path = require("path"),
	models = require('../models/pessoaModel.js');

var init = function(app){
	app.post('/api/pessoa', function(req, res) {
		var pessoa = {};
		pessoa.nome = req.body.nome;
		pessoa.cpf = req.body.cpf;
		pessoa.altura = req.body.altura;
		pessoa.sexo = req.body.sexo;
		pessoa.peso = req.body.peso;
		pessoa.idade = req.body.idade;
		pessoa.posicaoVeiculo = req.body.posicaoVeiculo;
		pessoa.posicaoFamiliar = req.body.posicaoFamiliar;

		if (req.body._id) {
			pessoa._id = req.body._id;

			models.updatePessoa(pessoa).then(function(book){
				res.json(book);
			});
		}else{
			models.savePessoa(pessoa).then(function(book){
				res.json(book);
			});
		}
	});

	app.get('/api/pessoa', function(req, res) {
		res.json('teste');
	});

	app.delete('/api/pessoa/:id', function(req, res) {
		var id = req.params.id;
		models.deletePessoa(id).then(function(book){
			res.json({status:'Ok'});
		})
	});
}

//export
module.exports = {
	init: init
}