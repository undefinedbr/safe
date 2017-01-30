'use strict';

var _ = require('lodash');
var Pessoa = require('./pessoa.model');
var jwt    = require('jsonwebtoken');

// Get list of pessoas
exports.index = function(req, res) {
	Pessoa.find(function (err, pessoas) {
		if(err) { return handleError(res, err); }
		return res.status(200).json(pessoas);
	});
};

// Get a single pessoa
exports.show = function(req, res) {
	Pessoa.findById(req.params.id, function (err, pessoa) {
		if(err) { return handleError(res, err); }
		if(!pessoa) { return res.status(404).send('Not Found'); }
		return res.json(pessoa);
	});
};

// Creates a new pessoa in the DB.
exports.create = function(req, res) {
	Pessoa.create(req.body, function(err, pessoa) {
		if(err) { return handleError(res, err); }
		return res.status(201).json(pessoa);
	});
};

// Updates an existing pessoa in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	Pessoa.findById(req.params.id, function (err, pessoa) {
		if (err) { return handleError(res, err); }
		if(!pessoa) { return res.status(404).send('Not Found'); }
		var updated = _.merge(pessoa, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.status(200).json(pessoa);
		});
	});
};

// Deletes a pessoa from the DB.
exports.destroy = function(req, res) {
	Pessoa.findById(req.params.id, function (err, pessoa) {
		if(err) { return handleError(res, err); }
		if(!pessoa) { return res.status(404).send('Not Found'); }
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

function handleError(res, err) {
	return res.status(500).send(err);
}