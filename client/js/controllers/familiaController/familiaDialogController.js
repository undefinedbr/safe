/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: FamiliaDialogController, responsável por funções de cadastro e edição de cada pessoa da familia
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var FamiliaDialogController = (function () {
		function FamiliaDialogController($mdDialog, locals, httpService, showToast) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.pessoa				= locals.pessoa ? locals.pessoa : {};
			self.httpService		= httpService;
			self.showToast 			= showToast;
			//temporario
			self.pessoa.foto = 'img/60.png'
			self.pessoa.pessoa = locals.userLogged;
		}

		FamiliaDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		FamiliaDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		FamiliaDialogController.prototype.save = function(pessoa) {
			var self = this;
			self.httpService.post(pessoa, 'familia').then(function(res) {
				self.showToast.showSimpleToast(res.data.nome+ ', cadatrado com sucesso.');
				this.$mdDialog.hide(res.data.nome);
			});
		};
		

		FamiliaDialogController.$inject = [
			'$mdDialog',
			'locals',
			'httpService',
			'showToast'
		];
		
		return FamiliaDialogController;
	}());

	angular.module('app.controllers').controller('FamiliaDialogController', FamiliaDialogController);

})(window.angular);