'use strict';

var _ = require('lodash');
var Viagem = require('./viagem.model');

// Get list of viagems
exports.index = function(req, res) {
  Viagem.find(function (err, viagems) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(viagems);
  });
};

// Get a single viagem
exports.show = function(req, res) {
  Viagem.findById(req.params.id, function (err, viagem) {
    if(err) { return handleError(res, err); }
    if(!viagem) { return res.status(404).send('Not Found'); }
    return res.json(viagem);
  });
};

// Creates a new viagem in the DB.
exports.create = function(req, res) {
  Viagem.create(req.body, function(err, viagem) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(viagem);
  });
};

// Updates an existing viagem in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Viagem.findById(req.params.id, function (err, viagem) {
    if (err) { return handleError(res, err); }
    if(!viagem) { return res.status(404).send('Not Found'); }
    var updated = _.merge(viagem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(viagem);
    });
  });
};

// Deletes a viagem from the DB.
exports.destroy = function(req, res) {
  Viagem.findById(req.params.id, function (err, viagem) {
    if(err) { return handleError(res, err); }
    if(!viagem) { return res.status(404).send('Not Found'); }
    viagem.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}