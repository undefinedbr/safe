'use strict';

var _ = require('lodash');
var Familia = require('./familia.model');

// Busca uma lista de família
exports.index = function(req, res) {
	Familia.find(function (err, familias) {
		if(err) { return handleError(res, err); }
		return res.status(200).json(familias);
	});
};

// Busca apenas um registro de família
exports.show = function(req, res) {
	Familia.findById(req.params.id, function (err, familia) {
		if(err) { return handleError(res, err); }
		if(!familia) { return res.status(404).send('Não foi encontrado'); }
		return res.json(familia);
	});
};

// Busca uma lista de família de uma pessoa.
exports.getByPessoa = function(req, res) {
  Familia.find({ pessoa: req.params.pessoa }, function (err, familia) {
    if(err) { return handleError(res, err); }
    if(!familia) { return res.status(404).send('Não foi encontrado'); }
    return res.json(familia);
  });
};


// Cria uma nova família.
exports.create = function(req, res) {
	Familia.create(req.body, function(err, familia) {
		if(err) { return handleError(res, err); }
		return res.status(201).json(familia);
	});
};

// Altera um registro.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Familia.findById(req.params.id, function (err, familia) {
		if (err) { return handleError(res, err); }
		if(!familia) { return res.status(404).send('Não foi encontrado'); }
		var updated = _.merge(familia, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.status(200).json(familia);
		});
	});
};

// Exclui um registro.
exports.destroy = function(req, res) {
	Familia.findById(req.params.id, function (err, familia) {
		if(err) { return handleError(res, err); }
		if(!familia) { return res.status(404).send('Não foi encontrado'); }
		familia.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.status(204).send('No Content');
		});
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}