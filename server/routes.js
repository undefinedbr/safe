/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  app.use(function (req, res, next) {
  	res.setHeader('Access-Control-Allow-Origin', '*');
  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  	res.setHeader('Access-Control-Allow-Credentials', true);
  	next();
  });

  app.use('/api/viagens', require('./api/viagem'));
  app.use('/api/familia', require('./api/familia'));
  app.use('/api/pessoas', require('./api/pessoa'));
  app.use('/api/veiculos', require('./api/veiculos'));

};
