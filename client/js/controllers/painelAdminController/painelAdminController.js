/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: PainelAdminController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var PainelAdminController = (function () {
		function PainelAdminController($location, $mdDialog,dialogService,showToast, $scope, $rootScope, httpService) {
			var self 				= this;
			self.$mdDialog 			= $mdDialog;
			self.dialogService 		= dialogService;
			self.$scope				= $scope;
			self.showToast			= showToast;
			self.userLogged			= $rootScope.userLogged;
			self.httpService		= httpService;
			self.getViagens(self.userLogged);

		}

		/**
		 * Busca na base de dados viagens ,
		 * para o usuário logado.
		 **/
		PainelAdminController.prototype.getViagens = function(pessoa){
			var self = this;
			self.httpService.get('viagens').then(function(res) {
				self.viagens = res.data;
			});
		};

		PainelAdminController.prototype.showDialog = function(ev, viagem) {
			var self = this;
			self.dialogService.openDialog(
				'partials/dialog/painelAdmin.html', 'PainelAdminDialogController',
				(function(){
					self.showToast.showSimpleToast(':).', '');
				}), ev, {viagem: viagem, userLogged: self.userLogged}, 
				self.$scope
			)
		};

		PainelAdminController.$inject = [
			'$location',
			'$mdDialog',
			'dialogService',
			'showToast',
			'$scope',
			'$rootScope',
			'httpService'
		];
		return PainelAdminController;
	}());

	angular.module('app.controllers').controller('PainelAdminController', PainelAdminController);

})(window.angular);