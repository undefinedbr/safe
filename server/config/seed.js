/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Veiculos = require('../api/veiculos/veiculos.model');
var Viagem = require('../api/viagem/viagem.model');
var Familia = require('../api/familia/familia.model');
var Pessoa = require('../api/pessoa/pessoa.model');


// Insert seed data below
var veiculosSeed = require('../api/veiculos/veiculos.seed.json');
var viagemSeed = require('../api/viagem/viagem.seed.json');
var familiaSeed = require('../api/familia/familia.seed.json');
var pessoaSeed = require('../api/pessoa/pessoa.seed.json');

// Insert seed inserts below
Veiculos.find({}).remove(function() {
	Veiculos.create(veiculosSeed);
});

Viagem.find({}).remove(function() {
	Viagem.create(viagemSeed);
});

Familia.find({}).remove(function() {
	Familia.create(familiaSeed);
});

Pessoa.find({}).remove(function() {
	Pessoa.create(pessoaSeed);
});
