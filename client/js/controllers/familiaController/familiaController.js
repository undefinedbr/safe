/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: FamiliaController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var FamiliaController = (function () {
		function FamiliaController($mdSidenav, $location) {
			var self 				= this;
		}

		FamiliaController.$inject = [
			'$mdSidenav',
			'$location',
		];
		return FamiliaController;
	}());

	angular.module('app.controllers').controller('FamiliaController', FamiliaController);

})(window.angular);