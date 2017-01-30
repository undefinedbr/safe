'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ViagemSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Viagem', ViagemSchema);