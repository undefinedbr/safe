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

			/*var result = self.getAutoByPlaca('NGH5928');*/
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

		/*AutomoveisDialogController.prototype.getAutoByPlaca = function(placa) {
			var self = this, param = {
					fonte:'detran',tipo:'placa',
					valor: placa.toUpperCase(),token :'80f28c4e954eb0cde2c83d71d8be63bb34caeab6'
			}
			self.$http.defaults.useXDomain = true;
			self.$http.get('http://www.veiculoroubado.com.br/webservice/veiculo?fonte=detran&tipo=placa&valor=NGH5928&token=80f28c4e954eb0cde2c83d71d8be63bb34caeab6').then(function(res){
				console.log(res.data);
			})
		}*/
		

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