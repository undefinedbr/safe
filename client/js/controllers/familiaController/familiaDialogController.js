/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: FamiliaDialogController, responsável por funções de cadastro e edição de cada pessoa da familia
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var FamiliaDialogController = (function () {
		function FamiliaDialogController($mdDialog, locals) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.pessoa				= locals ? locals : {};
			//temporario
			self.pessoa.foto = 'img/60.png'
		}

		FamiliaDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		FamiliaDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		FamiliaDialogController.prototype.save = function(pessoa) {
			this.$mdDialog.hide(pessoa);
		};

		FamiliaDialogController.$inject = [
			'$mdDialog',
			'locals'
		];
		
		return FamiliaDialogController;
	}());

	angular.module('app.controllers').controller('FamiliaDialogController', FamiliaDialogController);

})(window.angular);