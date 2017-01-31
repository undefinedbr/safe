'use strict';

var _ = require('lodash');
var Veiculos = require('./veiculos.model');

// Get list of veiculoss
exports.index = function(req, res) {
  Veiculos.find(function (err, veiculoss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(veiculoss);
  });
};

// Get a single veiculos
exports.show = function(req, res) {
  Veiculos.findById(req.params.id, function (err, veiculos) {
    if(err) { return handleError(res, err); }
    if(!veiculos) { return res.status(404).send('Not Found'); }
    return res.json(veiculos);
  });
};

// Creates a new veiculos in the DB.
exports.create = function(req, res) {
  Veiculos.create(req.body, function(err, veiculos) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(veiculos);
  });
};

// Updates an existing veiculos in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Veiculos.findById(req.params.id, function (err, veiculos) {
    if (err) { return handleError(res, err); }
    if(!veiculos) { return res.status(404).send('Not Found'); }
    var updated = _.merge(veiculos, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(veiculos);
    });
  });
};

// Deletes a veiculos from the DB.
exports.destroy = function(req, res) {
  Veiculos.findById(req.params.id, function (err, veiculos) {
    if(err) { return handleError(res, err); }
    if(!veiculos) { return res.status(404).send('Not Found'); }
    veiculos.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}