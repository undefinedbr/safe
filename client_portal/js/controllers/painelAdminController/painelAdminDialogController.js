/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: PainelAdminDialogController, responsável por detalhar a visialização de uma viagem.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var PainelAdminDialogController = (function () {
		function PainelAdminDialogController($mdDialog, locals) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.viagem				= locals.viagem ? locals.viagem : {};

			console.log(self.viagem);
		}

		PainelAdminDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		PainelAdminDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		PainelAdminDialogController.$inject = [
			'$mdDialog',
			'locals',
		];
		
		return PainelAdminDialogController;
	}());

	angular.module('app.controllers').controller('PainelAdminDialogController', PainelAdminDialogController);

})(window.angular);