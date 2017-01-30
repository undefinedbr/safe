'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FamiliaSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Familia', FamiliaSchema);