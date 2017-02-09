/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: NovoUsuarioController, registra um novo usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var NovoUsuarioController = (function () {
		function NovoUsuarioController($location, httpService, showToast, $scope, $rootScope) {
			var self 				= this;
			self.$location			= $location;
			self.httpService 		= httpService;
			self.showToast 			= showToast;
			self.$scope				= $scope;
			self.$rootScope			= $rootScope;
			self.pessoa = {
				foto:'img/60.png'
			}
		}

		NovoUsuarioController.prototype.save = function(pessoa) {
			var self = this;
			self.httpService.post(pessoa, 'pessoas').then(function(res) {
				self.showToast.showSimpleToast(res.data.nome+ ', cadatrado com sucesso.');
				self.$scope.$emit('userLogged',res.data);
				self.$location.url('home');
			});
		};


		NovoUsuarioController.$inject = [
			'$location',
			'httpService',
			'showToast',
			'$scope',
			'$rootScope'
		];
		return NovoUsuarioController;
	}());

	angular.module('app.controllers').controller('NovoUsuarioController', NovoUsuarioController);

})(window.angular);