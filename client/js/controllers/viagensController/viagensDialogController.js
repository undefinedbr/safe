/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: ViagensDialogController, responsável por funções de cadastro e edição de cada pessoa da familia
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensDialogController = (function () {
		function ViagensDialogController($mdDialog, locals) {
			var self 				= this;
			self.$mdDialog			= $mdDialog;
			self.viagem				= locals ? locals : {};
			        var mapa;
	        self.geocoder;

	        self.view = {
	            addressInput: '',
	            places: [],
	            selectedPlace: '',
	            markers: [],
	        };
	        setTimeout(function() {
	        	self.initializeComponents();
	        }, 500);

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

		//Inicializa o mapa e outros components
        ViagensDialogController.prototype.initializeComponents = function() {
        	var self = this,
            mapConfig = {
                center: { lat: 13.676445, lng: -89.281736 },
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            mapa = new google.maps.Map(document.getElementById('map'), mapConfig);
            self.geocoder = new google.maps.Geocoder();
        }

        //Busca diferentes ubicaciones segun la direccion dada
        ViagensDialogController.prototype.buscaDirecao = function() {
        	var self = this;
            if (self.geocoder !== undefined) {
                self.geocoder.geocode(
                    { address: self.view.addressInput },
                    function (results, status) {
                        self.view.places = [];
                        self.view.selectedPlace = '';
                        switch (status) {
                            case google.maps.GeocoderStatus.OK:
                                console.log(results);
                                self.view.places = results;
                                if (results.length < 2) {
                                    self.view.selectedPlace = results[0].place_id;
                                    self.view.addressInput = results[0].formatted_address;
                                    self.centralizarLocal();
                                } else self.showMsg('Encontrado ' + self.view.places.length + ' locais');
                                break;
                            case google.maps.GeocoderStatus.ZERO_RESULTS:
                                self.showMsg('Não foram encontrados resultados');
                                break;
                            case google.maps.GeocoderStatus.REQUEST_DENIED:
                                self.showMsg('A solicitação de pesquisa foi negada');
                                break;
                            case google.maps.GeocoderStatus.INVALID_REQUEST:
                                self.showMsg('solicitação invalida');
                                break;
                        }
                        self.$apply();
                    }
                );
            }
        }

        //Posiciona en el centro de la vista del mapa la ubicacion seleccionada
        ViagensDialogController.prototype.centralizarLocal = function() {
        	var self = this;
            if (self.view.selectedPlace !== undefined & self.view.selectedPlace !== '') {
                var location = _.result(_.find(self.view.places, function (x) { return x.place_id === self.view.selectedPlace; }), 'geometry.location');
                if (location !== undefined) {
                    var marker = new google.maps.Marker({ position: location, map: mapa });
                    self.view.markers.push(marker);
                    mapa.setCenter(location);
                }
                else {
                    self.showMsg('No se pudo mostrar la ubicación');
                }
            }
        }

        //Apaga os marcadores
        ViagensDialogController.prototype.apagarMarcadores = function() {
        	var self = this;
            for (var i = 0; i < self.view.markers.length; i++) {
                self.view.markers[i].setMap(null);
            }
            self.view.markers = [];
        }

        //Mostra a mensagem
        ViagensDialogController.prototype.showMsg = function(mensagem) {
        	var self = this;
        	self.showToast.showSimpleToast(mensagem, '');
        }

		ViagensDialogController.$inject = [
			'$mdDialog',
			'locals'
		];
		
		return ViagensDialogController;
	}());

	angular.module('app.controllers').controller('ViagensDialogController', ViagensDialogController);

})(window.angular);