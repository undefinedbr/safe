'use strict';

var _ = require('lodash');
var Familia = require('./familia.model');

// Get list of familias
exports.index = function(req, res) {
  Familia.find(function (err, familias) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(familias);
  });
};

// Get a single familia
exports.show = function(req, res) {
  Familia.findById(req.params.id, function (err, familia) {
    if(err) { return handleError(res, err); }
    if(!familia) { return res.status(404).send('Not Found'); }
    return res.json(familia);
  });
};

// Creates a new familia in the DB.
exports.create = function(req, res) {
  Familia.create(req.body, function(err, familia) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(familia);
  });
};

// Updates an existing familia in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Familia.findById(req.params.id, function (err, familia) {
    if (err) { return handleError(res, err); }
    if(!familia) { return res.status(404).send('Not Found'); }
    var updated = _.merge(familia, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(familia);
    });
  });
};

// Deletes a familia from the DB.
exports.destroy = function(req, res) {
  Familia.findById(req.params.id, function (err, familia) {
    if(err) { return handleError(res, err); }
    if(!familia) { return res.status(404).send('Not Found'); }
    familia.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}