/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: Main controller, responsável por funções do menu e redirecionamento de páginas.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var MainController = (function () {
		function MainController($mdSidenav, $location) {
			var self 				= this;
			self.$mdSidenav 		= $mdSidenav;
			self.$location  		= $location;
			
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

			self.user = self.getUserLogger();
		}

		/**
		 * Busca o usuário logado.
		 **/
		MainController.prototype.getUserLogger = function() {
			return {
				nome:'Usuário teste',
				email: 'lucasteste@teste.com',
				foto:'img/60.png'
			}
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
		];
		return MainController;
	}());

	angular.module('app.controllers').controller('MainController', MainController);

})(window.angular);