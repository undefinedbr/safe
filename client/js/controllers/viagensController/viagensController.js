/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: ViagensController, responsável por funções de cadastro e listagem das viagens.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensController = (function () {
		function ViagensController($mdSidenav, $location) {
			var self 				= this;
		}

		ViagensController.$inject = [
			'$mdSidenav',
			'$location',
		];
		return ViagensController;
	}());

	angular.module('app.controllers').controller('ViagensController', ViagensController);

})(window.angular);