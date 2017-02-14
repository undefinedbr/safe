/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: AutomoveisDialogController, responsável por funções de cadastro e edição de cada automóvel da veiculos
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var AutomoveisDialogController = (function () {
		function AutomoveisDialogController($mdDialog, locals, httpService, showToast, $http) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.automóvel				= locals.automóvel ? locals.automóvel : {};
			self.httpService		= httpService;
			self.showToast 			= showToast;
			self.$http				= $http;

			var result = self.getAutoByPlaca('NGH5928');
			//console.log(result);
		}

		AutomoveisDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		AutomoveisDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		AutomoveisDialogController.prototype.save = function(automóvel) {
			var self = this;
			self.httpService.post(automóvel, 'veiculos').then(function(res) {
				self.showToast.showSimpleToast(res.data.nome+ ', cadatrado com sucesso.');
				self.$mdDialog.hide(res.data);
			});
		};

		AutomoveisDialogController.prototype.getAutoByPlaca = function(placa) {
			var self = this;

			self.httpService.get('pessoas/getcarroplaca&placa='+placa).then(function(res) {
				self.showToast.showSimpleToast(res.data);
				console.log(res.data);
			});
		};
		

		AutomoveisDialogController.$inject = [
			'$mdDialog',
			'locals',
			'httpService',
			'showToast',
			'$http'
		];
		
		return AutomoveisDialogController;
	}());

	angular.module('app.controllers').controller('AutomoveisDialogController', AutomoveisDialogController);

})(window.angular);