/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
<<<<<<< HEAD
 * Controller: ViagensController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
=======
 * Controller: ViagensController, responsável por funções de cadastro e listagem das viagens.
>>>>>>> aed7f327379594d899c66d5371181c0e4ca853ca
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensController = (function () {
<<<<<<< HEAD
		function ViagensController($location, $mdDialog,dialogService,showToast, $scope) {
			var self 				= this;
			self.$mdDialog 			= $mdDialog;
			self.dialogService 		= dialogService;
			self.$scope				= $scope;
			self.showToast			= showToast;

			self.viagens 			= self.getViagens();
		}

		/**
		 * Busca na base de dados os integrantes cadastrados como família,
		 * para o usuário logado.
		 **/
		ViagensController.prototype.getViagens = function(){
			return [
				{
					origem: 'Pato Branco',
					destino: 'Chopinzinho',
					horasaida: new Date(),
					previsaochegada: new Date(),
					kilometragem:50,
					status:'realizada'
				},{
					origem: 'Pato Branco',
					destino: 'Chopinzinho',
					horasaida: new Date(),
					previsaochegada: new Date(),
					kilometragem:50,
					status:'realizada'
				},{
					origem: 'Pato Branco',
					destino: 'Chopinzinho',
					horasaida: new Date(),
					previsaochegada: new Date(),
					kilometragem:50,
					status:'realizada'
				},{
					origem: 'Pato Branco',
					destino: 'Chopinzinho',
					horasaida: new Date(),
					previsaochegada: new Date(),
					kilometragem:50,
					status:'realizada'
				},{
					origem: 'Pato Branco',
					destino: 'Chopinzinho',
					horasaida: new Date(),
					previsaochegada: new Date(),
					kilometragem:50,
					status:'realizada'
				},{
					origem: 'Pato Branco',
					destino: 'Chopinzinho',
					horasaida: new Date(),
					previsaochegada: new Date(),
					kilometragem:50,
					status:'a fazer'
				},
			]
		};

		ViagensController.prototype.showDialog = function(ev, viagem) {
			var self = this;
			self.dialogService.openDialog(
				'partials/dialog/viagens.html', 'ViagensDialogController',
				(function(viagem){
					self.viagens.push(viagem);
					self.showToast.showSimpleToast('Alterações cadastrados com sucesso.', '');
				}), ev, viagem, 
				self.$scope
			)
		};

		ViagensController.$inject = [
			'$location',
			'$mdDialog',
			'dialogService',
			'showToast',
			'$scope'
		];

=======
		function ViagensController($mdSidenav, $location) {
			var self 				= this;
		}

		ViagensController.$inject = [
			'$mdSidenav',
			'$location',
		];
>>>>>>> aed7f327379594d899c66d5371181c0e4ca853ca
		return ViagensController;
	}());

	angular.module('app.controllers').controller('ViagensController', ViagensController);

})(window.angular);