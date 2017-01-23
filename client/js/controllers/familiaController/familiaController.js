/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: FamiliaController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var FamiliaController = (function () {
		function FamiliaController($location) {
			var self 				= this;
			self.familia = self.getFamilia();
		}

		/**
		 * Busca na base de dados os integrantes cadastrados como família,
		 * para o usuário logado.
		 **/
		FamiliaController.prototype.getFamilia = function(){
			var imagePath = 'img/60.png';
			return [
				{
					foto:imagePath,
					nome:'Teste esposa',
					posicaoFamilia:'esposa',
					cpf:'08695315908',
					idade:'35',
					tiposanguineo:'O+',
					altura:'1,68',
					sexo:'F',
					peso:'55'
				},
				{
					foto:imagePath,
					nome:'Teste filho',
					posicaoFamilia:'filho',
					cpf:'08695315908',
					idade:'12',
					tiposanguineo:'O+',
					altura:'1,40',
					sexo:'M',
					peso:'47'
				},
				{
					foto:imagePath,
					nome:'Teste mae',
					posicaoFamilia:'mãe',
					cpf:'08695315908',
					idade:'60',
					tiposanguineo:'A+',
					altura:'1,68',
					sexo:'M',
					peso:'75'
				},
				{
					foto:imagePath,
					nome:'Teste mae',
					posicaoFamilia:'mãe',
					cpf:'08695315908',
					idade:'60',
					tiposanguineo:'A+',
					altura:'1,68',
					sexo:'M',
					peso:'75'
				},
				{
					foto:imagePath,
					nome:'Teste mae',
					posicaoFamilia:'mãe',
					cpf:'08695315908',
					idade:'60',
					tiposanguineo:'A+',
					altura:'1,68',
					sexo:'M',
					peso:'75'
				},
				{
					foto:imagePath,
					nome:'Teste mae',
					posicaoFamilia:'mãe',
					cpf:'08695315908',
					idade:'60',
					tiposanguineo:'A+',
					altura:'1,68',
					sexo:'M',
					peso:'75'
				}
			]
		}

		FamiliaController.$inject = [
			'$location',
		];
		return FamiliaController;
	}());

	angular.module('app.controllers').controller('FamiliaController', FamiliaController);

})(window.angular);