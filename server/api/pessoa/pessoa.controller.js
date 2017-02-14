'use strict';

var _ = require('lodash');
var Pessoa = require('./pessoa.model');
var jwt    = require('jsonwebtoken');
var crypto = require('crypto');
var requests = require('request');
var parseXML = require('xml2js').parseString;
const uuidV4 = require('uuid/v4');
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

exports.getVeiculoByPlaca = function(req, res) {

	/** Verifica se a placa foi informada */
	console.log(req.body.id);
	console.log(req.query)
	if (!req.query.id) {
		res.json({ error: 'Informe o parâmetro placa.' });
	} else {
		var placa = req.query.id;
	}

	/** Chave secreta para criptografia */
	var secret = 'TRwf1iBwvCoSboSscGne';

	/** Criptografa a placa usando a chave do aplicativo */
	var token = crypto.createHmac('sha1', placa+secret).update(placa).digest('hex');

	/** Gerar a data da requisição */
	var data = new Date().toISOString().replace("T", " ").substr(0, 19);

	/** Cria o XML de chamada do serviço SOAP */
	var xml = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>\
				<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\
					<soap:Header>\
						<b>samsung GT-I9192</b>\
						<c>ANDROID</c>\
						<i>-38.5284057</i>\
						<d>4.4.2</d>\
						<e>SinespCidadao</e>\
						<f>10.0.0.1</f>\
						<g>'+token+'</g>\
						<k>'+uuidV4()+'</k>\
						<h>-3.7583078</h>\
						<l>'+data+'</l>\
						<m>8797e74f0d6eb7b1ff3dc114d4aa12d3</m>\
					</soap:Header>\
					<soap:Body>\
						<webs:getStatus xmlns:webs="http://soap.ws.placa.service.sinesp.serpro.gov.br/">\
							<a>'+placa+'</a>\
						</webs:getStatus>\
					</soap:Body>\
				</soap:Envelope>';

	xml = xml.replace(/[\t\n]/gi, '');

	/** Montagem dos cabeçalhos da requisição */
	var headers = {
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Accept": "text/plain, */*; q=0.01",
		"Cache-Control": "no-cache",
		"Pragma": "no-cache",
		"Host": "sinespcidadao.sinesp.gov.br",
		"Content-length": xml.length,
		"User-Agent": "SinespCidadao / 3.0.2.1 CFNetwork / 758.2.8 Darwin / 15.0.0",
		"Connection": "close"
	};

	/** Tenta realizar a requisição */
	try {

		requests.post({
				headers: headers,
				url: 'http://sinespcidadao.sinesp.gov.br/sinesp-cidadao/mobile/consultar-placa',
				body: xml
			}, function(error, response, body){

				/** Se não ocorrer nenhum erro */
				if (error===null) {
					/** Faz o parse do XML recebido */
					parseXML(body, {
						explicitArray: false
					}, function (err, result) {
						resultado = result['soap:Envelope']['soap:Body']['ns2:getStatusResponse']['return'];
					});

					/** Retorna para o browser o resultado final */
					res.json(resultado);
				/** Retorna o erro que ocorreu na chamada (se houve) */
				} else {
					res.json({ error: error });
				}
			}
		);

	} catch (err) {
		/** Retorna erro se não conseguir fazer a requisição do SOAP por qualquer motivo */
		res.json({ error: err });
	}

};

function handleError(res, err) {
	return res.status(500).send(err);
}