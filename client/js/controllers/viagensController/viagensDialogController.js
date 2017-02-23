/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: ViagensDialogController, responsável por funções de cadastro e edição de cada pessoa da familia
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensDialogController = (function () {
		function ViagensDialogController($mdDialog, locals,showToast, httpService, $location, $q, $timeout) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.viagem				= locals.viagem ? locals.viagem : {};
			self.showToast			= showToast;
			self.httpService		= httpService;
			self.userLogged 		= locals.userLogged;
			self.$location			= $location;
			self.$q 				= $q;
			self.$timeout 			= $timeout;
			self.passageiros 		= self.viagem.passageiros ? JSON.parse(self.viagem.passageiros) : []; 
			self.automoveis 		= self.viagem.veiculo ? [JSON.parse(self.viagem.veiculo)] : []; 
			// map object
			self.map = {
				control: {},
				center: {
					latitude: -37.812150,
					longitude: 144.971008
				},
				zoom: 14
			};
			
			// marker object
			self.marker = {
				center: {
					latitude: -37.812150,
					longitude: 144.971008
				}
			}
			// instantiate google map objects for directions
			self.directionsDisplay = new google.maps.DirectionsRenderer();
			self.directionsService = new google.maps.DirectionsService();
			self.geocoder = new google.maps.Geocoder();
				
			// directions object -- with defaults
			self.directions = {
				origin: "Pato Branco, Parana",
				destination: "Chopinzinho, Parana",
				showList: true
			}
			if (self.viagem.origem) {
				self.directions.origin = self.viagem.origem;
				self.directions.destination = self.viagem.destino;
				self.passageiros = JSON.parse(self.viagem.passageiros);
				self.getDirections();
			}
			self.getFamilia(self.userLogged);
			self.getAutomovel(self.userLogged);
		}

		ViagensDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		ViagensDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		ViagensDialogController.prototype.save = function() {
			var self = this, viagem = {};
			viagem.distancia = self.directionsDisplay.directions.routes[0].legs[0].distance.text;
			viagem.duracao = self.directionsDisplay.directions.routes[0].legs[0].duration.text;
			viagem.origem = self.directionsDisplay.directions.routes[0].legs[0].start_address;
			viagem.destino = self.directionsDisplay.directions.routes[0].legs[0].end_address;
			viagem.pessoa= self.userLogged._id;
			viagem.observacao = self.viagem.observacao;
			viagem.passageiros = JSON.stringify(self.passageiros);
			viagem.veiculo = JSON.stringify(self.automovel.display);
			viagem.motorista = JSON.stringify(self.userLogged);

			self.httpService.post(viagem, 'viagens').then(function(res) {
				self.showToast.showSimpleToast('cadatrado realizado com sucesso.');
				self.$mdDialog.hide(res.data);
			});
		};
		
		
		// get directions using google maps api
		ViagensDialogController.prototype.getDirections = function () {
			var self = this;
			var request = {
				origin: self.directions.origin,
				destination: self.directions.destination,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			self.directionsService.route(request, function (response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					self.directionsDisplay.setDirections(response);
					self.directionsDisplay.setMap(self.map.control.getGMap());
					self.directionsDisplay.setPanel(document.getElementById('directionsList'));
					self.directions.showList = true;
				} else {
					self.showToast.showSimpleToast('Não foi possível carregar o mapa!');
				}
			});
		};

		/**
		 * Busca na base de dados os integrantes cadastrados como família,
		 * para o usuário logado.
		 **/
		ViagensDialogController.prototype.getFamilia = function(pessoa){
			var self = this;
			self.httpService.get('familia?id='+pessoa._id).then(function(res) {
				self.familiares = res.data.map(function (pessoa) {
					return {
						value: pessoa.nome.toLowerCase(),
						display: pessoa
					}
				});
			});
		};

		/**
		 * Busca na base de dados os integrantes cadastrados como família,
		 * para o usuário logado.
		 **/
		ViagensDialogController.prototype.getAutomovel = function(pessoa){
			var self = this;
			self.httpService.get('veiculos?id='+pessoa._id).then(function(res) {
				self.automoveisPesquisa = res.data.map(function (veiculo) {
					return {
						value: veiculo.modelo.toLowerCase() + veiculo.placa.toLowerCase(),
						display: veiculo
					}
				});
			});
		};

		ViagensDialogController.prototype.novo = function() {
			this.$mdDialog.cancel();
			this.$location.url('familia');
		};

		/**
		 * Procura por familiares
		 */
		ViagensDialogController.prototype.querySearch = function (query, list) {
			var self = this,
			results = query ? list.filter( self.createFilterFor(query) ) : list,
			deferred = self.$q.defer();
			self.$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
			return deferred.promise;
		};

		/**
		 * Cria um filtro para a função de query.
		 */
		ViagensDialogController.prototype.createFilterFor = function(query) {
			var self = this;
			var lowercaseQuery = angular.lowercase(query);

			return function filterFn(pessoa) {
				return (pessoa.value.indexOf(lowercaseQuery) === 0);
			};

		};

		/**
		 * Adiciona um novo passageiro na lista.
		 */
		ViagensDialogController.prototype.adicionaPassageiro = function(passageiro) {
			if (passageiro) {
				if ((this.passageiros.length -1 ) < this.automovel.display.quantidadeLugares) {
					this.passageiros.push(passageiro);
				} else {
					this.showToast.showSimpleToast('Seu automóvel tem capacidade para apenas '+ this.automovel.display.quantidadeLugares+' passageiros.');
				}
			}
		};

		/**
		 * Remove um passageiro da lista.
		 */
		ViagensDialogController.prototype.removePassageiro = function(passageiro) {
			var self = this;
			for (var i = self.passageiros.length - 1; i >= 0; i--) {
				if (self.passageiros[i]._id = passageiro._id)
					self.passageiros.splice(i, 1);
			}
		};

		ViagensDialogController.$inject = [
			'$mdDialog',
			'locals',
			'showToast',
			'httpService',
			'$location',
			'$q',
			'$timeout'
		];
		
		return ViagensDialogController;
	}());

	angular.module('app.controllers').controller('ViagensDialogController', ViagensDialogController);

})(window.angular);