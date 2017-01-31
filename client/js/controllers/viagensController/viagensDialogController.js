/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: ViagensDialogController, responsável por funções de cadastro e edição de cada pessoa da familia
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensDialogController = (function () {
		function ViagensDialogController($mdDialog, locals,showToast, httpService) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.viagem				= locals.viagem ? locals.viagem : {};
			self.showToast			= showToast;
			self.httpService		= httpService;
			self.userLogged 		= locals.userLogged;
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
		}

		ViagensDialogController.prototype.hide = function() {
			this.$mdDialog.hide();
		};

		ViagensDialogController.prototype.cancel = function() {
			this.$mdDialog.cancel();
		};

		ViagensDialogController.prototype.save = function(viagem) {
			var self = this;
			viagem = {
				distancia : self.directionsDisplay.directions.routes[0].legs[0].distance.text,
				duracao : self.directionsDisplay.directions.routes[0].legs[0].duration.text,
				origem : self.directionsDisplay.directions.routes[0].legs[0].start_address,
				destino : self.directionsDisplay.directions.routes[0].legs[0].end_address,
				pessoa: self.userLogged._id
			}

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
		}

		ViagensDialogController.$inject = [
			'$mdDialog',
			'locals',
			'showToast',
			'httpService'
		];
		
		return ViagensDialogController;
	}());

	angular.module('app.controllers').controller('ViagensDialogController', ViagensDialogController);

})(window.angular);