/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: AutomoveisController, responsável por funções de cadastro e listagem dos automóveis.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var AutomoveisController = (function () {
		function AutomoveisController($mdSidenav, $location) {
			var self 				= this;
		}

		AutomoveisController.$inject = [
			'$mdSidenav',
			'$location',
		];
		return AutomoveisController;
	}());

	angular.module('app.controllers').controller('AutomoveisController', AutomoveisController);

})(window.angular);