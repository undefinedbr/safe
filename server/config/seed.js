/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Viagem = require('../api/viagem/viagem.model');
var Familia = require('../api/familia/familia.model');
var Pessoa = require('../api/pessoa/pessoa.model');


// Insert seed data below
var viagemSeed = require('../api/viagem/viagem.seed.json');
var familiaSeed = require('../api/familia/familia.seed.json');
var pessoaSeed = require('../api/pessoa/pessoa.seed.json');

// Insert seed inserts below
Viagem.find({}).remove(function() {
	Viagem.create(viagemSeed);
});

Familia.find({}).remove(function() {
	Familia.create(familiaSeed);
});

Pessoa.find({}).remove(function() {
	Pessoa.create(pessoaSeed);
});
