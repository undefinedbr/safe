/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: FamiliaController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var FamiliaController = (function () {
		function FamiliaController($location, $mdDialog,dialogService,showToast, $scope, httpService, $rootScope) {
			var self 				= this;
			self.$mdDialog 			= $mdDialog;
			self.dialogService 		= dialogService;
			self.$scope				= $scope;
			self.showToast			= showToast;
			self.httpService 		= httpService;
			self.userLogged	= $rootScope.userLogged;

			if (self.userLogged) {
				self.getFamilia(self.userLogged);
			} else {
				self.showToast.showSimpleToast('Você deve estar logado para vizualizar esta tela.', '');
				$location.url('login')
			}
		}

		/**
		 * Busca na base de dados os integrantes cadastrados como família,
		 * para o usuário logado.
		 **/
		FamiliaController.prototype.getFamilia = function(pessoa){
			var self = this;
			self.httpService.get('familia?id='+pessoa._id).then(function(res) {
				self.familia = res.data;
			});
		};

		FamiliaController.prototype.showDialog = function(ev, pessoa) {
			var self = this;
			self.dialogService.openDialog(
				'partials/dialog/familia.html', 'FamiliaDialogController',
				(function(pessoa){
					self.familia.push(pessoa);
					self.showToast.showSimpleToast('Alterações cadastrados com sucesso.', '');
				}), ev, {pessoa: pessoa, userLogged: self.userLogged}, 
				self.$scope
			)
		};

		FamiliaController.$inject = [
			'$location',
			'$mdDialog',
			'dialogService',
			'showToast',
			'$scope',
			'httpService',
			'$rootScope'
		];

		return FamiliaController;
	}());

	angular.module('app.controllers').controller('FamiliaController', FamiliaController);

})(window.angular);