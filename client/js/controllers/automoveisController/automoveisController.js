/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: AutomoveisController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var AutomoveisController = (function () {
		function AutomoveisController($location, $mdDialog,dialogService,showToast, $scope) {
			var self 				= this;
			self.$mdDialog 			= $mdDialog;
			self.dialogService 		= dialogService;
			self.$scope				= $scope;
			self.showToast			= showToast;

			self.automoveis 			= self.getAutomoveis();
		}

		/**
		 * Busca na base de dados os integrantes cadastrados como família,
		 * para o usuário logado.
		 **/
		AutomoveisController.prototype.getAutomoveis = function(){
			return [
				{
					placa: 'placa',
					modelo: 'modelo',
					cor: 'cor',
					ano: 'ano',
					cidade: 'cidade'
				},{
					placa: 'placa',
					modelo: 'modelo',
					cor: 'cor',
					ano: 'ano',
					cidade: 'cidade'
				},{
					placa: 'placa',
					modelo: 'modelo',
					cor: 'cor',
					ano: 'ano',
					cidade: 'cidade'
				},{
					placa: 'placa',
					modelo: 'modelo',
					cor: 'cor',
					ano: 'ano',
					cidade: 'cidade'
				},{
					placa: 'placa',
					modelo: 'modelo',
					cor: 'cor',
					ano: 'ano',
					cidade: 'cidade'
				},
			]
		};

		AutomoveisController.prototype.showDialog = function(ev, automovel) {
			var self = this;
			self.dialogService.openDialog(
				'partials/dialog/automoveis.html', 'AutomoveisDialogController',
				(function(automovel){
					self.automoveis.push(automovel);
					self.showToast.showSimpleToast('Alterações cadastrados com sucesso.', '');
				}), ev, automovel, 
				self.$scope
			)
		};

		AutomoveisController.$inject = [
			'$location',
			'$mdDialog',
			'dialogService',
			'showToast',
			'$scope'
		];

		return AutomoveisController;
	}());

	angular.module('app.controllers').controller('AutomoveisController', AutomoveisController);

})(window.angular);