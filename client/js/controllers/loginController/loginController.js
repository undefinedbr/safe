/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: LoginController,controla entrada e saída de usuários.
 * data: 29/01/2017
 */
(function (angular) {
	'use strict';
	var LoginController = (function () {
		function LoginController(httpService, $location,showToast, $scope) {
			var self 				= this;
			self.$location 			= $location;
			self.httpService 		= httpService;
			self.showToast 			= showToast;
			self.$scope				= $scope;
			self.user = {
				foto: 'img/60.png'
			}
		}

		LoginController.prototype.login = function(user) {
			var self = this;
			self.httpService.post(user, 'pessoas').then(function(res){
				self.showToast.showSimpleToast(res.data.nome+ ', logado com sucesso.');
				self.$scope.$emit('userLogged',res.data);
				self.$location.url('home');
			})
		};

		LoginController.prototype.gotoSection = function (routeToGo) {
			this.$location.url(routeToGo);
		};

		LoginController.$inject = [
			'httpService',
			'$location',
			'showToast',
			'$scope'
		];
		return LoginController;
	}());

	angular.module('app.controllers').controller('LoginController', LoginController);

})(window.angular);