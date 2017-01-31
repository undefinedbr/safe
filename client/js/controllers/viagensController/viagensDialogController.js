/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: ViagensDialogController, responsável por funções de cadastro e edição de cada pessoa da familia
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensDialogController = (function () {
		function ViagensDialogController($mdDialog, locals,showToast) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.viagem				= locals.viagem ? locals.viagem : {};
			self.showToast			= showToast;
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
			this.$mdDialog.hide(viagem);
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
					console.log(self.directionsDisplay);
				} else {
					self.showToast.showSimpleToast('Não foi possível carregar o mapa!');
				}
			});
		}

		ViagensDialogController.$inject = [
			'$mdDialog',
			'locals',
			'showToast'
		];
		
		return ViagensDialogController;
	}());

	angular.module('app.controllers').controller('ViagensDialogController', ViagensDialogController);

})(window.angular);