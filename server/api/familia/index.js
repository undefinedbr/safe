'use strict';

var express = require('express');
var controller = require('./familia.controller');

var router = express.Router();

/*router.use(function (req, res, next) {
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Falha ao autenticar token.' });		
			} else {
				req.decoded = decoded;	
				next();
			}
		});
	} else {
		return res.status(403).send({ 
			success: false, 
			message: 'Não foi encontrado token.'
		});
	}
});*/

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;