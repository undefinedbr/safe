'use strict';

var _ = require('lodash');
var Pessoa = require('./pessoa.model');
var jwt    = require('jsonwebtoken');
var http = require("https");
// Busca uma lista pessoas
exports.index = function(req, res) {
	Pessoa.find(function (err, pessoas) {
		if(err) { return handleError(res, err); }
		console.log(pessoas);
		return res.status(200).json(pessoas);
	});
};

// Busca apenas um registro de pessoa
exports.show = function(req, res) {
	Pessoa.findById(req.params.id, function (err, pessoa) {
		if(err) { return handleError(res, err); }
		if(!pessoa) { return res.status(404).send('Nada encontrado'); }
		return res.json(pessoa);
	});
};

// Cria uma nova pessoa no banco.
exports.create = function(req, res) {
	Pessoa.create(req.body, function(err, pessoa) {
		if(err) { return handleError(res, err); }
		return res.status(201).json(pessoa);
	});
};

// Altera uma pessoa já existente no banco.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Pessoa.findById(req.params.id, function (err, pessoa) {
		if (err) { return handleError(res, err); }
		if(!pessoa) { return res.status(404).send('Nada encontrado'); }
		var updated = _.merge(pessoa, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.status(200).json(pessoa);
		});
	});
};

// Exclui uma pessoa do banco.
exports.destroy = function(req, res) {
	Pessoa.findById(req.params.id, function (err, pessoa) {
		if(err) { return handleError(res, err); }
		if(!pessoa) { return res.status(404).send('Nada encontrado'); }
		pessoa.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.status(204).send('No Content');
		});
	});
};

//Login
exports.login = function(req, res) {
	Pessoa.findOne({
		name: req.body.name
	}, function(err, pessoa) {

		if (err) throw err;

		if (!pessoa) {
			res.json({ success: false, message: 'Usuário não encontrado.' });
		} else if (pessoa) {

			if (pessoa.password != req.body.password) {
				res.json({ success: false, message: 'Senha incorreta.' });
			} else {
				var token = jwt.sign(pessoa, app.get('superSecret'), {
					expiresIn: 86400 //24h
				});

				res.json({
					success: true,
					message: 'Login efetuado com sucesso!',
					token: token
				});
			}		

		}

	});
};

exports.getCarroPorPlaca = function(req, res) {

	var url = "https://www.veiculoroubado.com.br/webservice/veiculo?fonte=detran&tipo=placa&valor="+req.body.placa+"&token=80f28c4e954eb0cde2c83d71d8be63bb34caeab6";
	var request = http.get(url, function (response) {
	var buffer = "",data,route;
		response.on("data", function (chunk) {
			buffer += chunk;
		}); 
		response.on("end", function (err) {
			return res.status(200).json(buffer);
		}); 
	});
}

function handleError(res, err) {
	return res.status(500).send(err);
}