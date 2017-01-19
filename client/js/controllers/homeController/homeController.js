/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: HomeController, nem sei ainda.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var HomeController = (function () {
		function HomeController($mdSidenav, $location) {
			var self 				= this;
		}

		HomeController.$inject = [
			'$mdSidenav',
			'$location',
		];
		return HomeController;
	}());

	angular.module('app.controllers').controller('HomeController', HomeController);

})(window.angular);