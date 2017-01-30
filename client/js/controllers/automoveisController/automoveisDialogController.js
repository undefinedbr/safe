/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: AutomoveisDialogController, responsável por funções de cadastro e edição de cada automóvel
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var AutomoveisDialogController = (function () {
		function AutomoveisDialogController($mdDialog, locals) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.automovel			= locals ? locals : {};

		}

		AutomoveisDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		AutomoveisDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		AutomoveisDialogController.prototype.save = function(automovel) {
			this.$mdDialog.hide(automovel);
		};

		AutomoveisDialogController.$inject = [
			'$mdDialog',
			'locals'
		];
		
		return AutomoveisDialogController;
	}());

	angular.module('app.controllers').controller('AutomoveisDialogController', AutomoveisDialogController);

})(window.angular);