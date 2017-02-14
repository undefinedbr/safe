/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: Main controller, responsável por funções do menu e redirecionamento de páginas.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var MainController = (function () {
		function MainController($mdSidenav, $location, $scope, $rootScope) {
			var self 				= this;
			self.$mdSidenav 		= $mdSidenav;
			self.$location  		= $location;
			self.userLogged			= $rootScope.userLogged;
			self.style				= {display: 'block'};
			self.stylenone			= {display: 'none'};
			
			self.mainMenuItems = [
				{
					label: "Família",
					location: "familia",
					icon: 'favorite',
				}, 
				{
					label: "Automóveis",
					location: "automoveis",
					icon: 'directions_car',
				}, 
				{
					label: "Viagens",
					location: "viagens",
					icon: 'card_travel',
				}
			];

			$scope.$on('userLogged', function(ev, user){
				self.userLogged = user;
				self.userLogged.foto = 'img/60.png';
				$rootScope.userLogged = self.userLogged;
			})
		}

		MainController.prototype.toggleSidenav = function (menu) {
			this.$mdSidenav(menu).toggle();
		};

		MainController.prototype.gotoSection = function (routeToGo) {
			this.$mdSidenav('left').toggle();
			this.$location.url(routeToGo);
		};


		MainController.$inject = [
			'$mdSidenav',
			'$location',
			'$scope',
			'$rootScope'
		];
		return MainController;
	}());

	angular.module('app.controllers').controller('MainController', MainController);

})(window.angular);