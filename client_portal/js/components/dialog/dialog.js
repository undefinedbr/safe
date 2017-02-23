/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: DialogComponentController, responsável por criar os dialogs de acordo com as configurações passadas por paramtro.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var DialogComponentController = (function () {
		function DialogComponentController($location,$mdDialog) {
			var self        = this;
			self.$mdDialog 	= $mdDialog;
			self.familia 	= self.getFamilia();
		}

	DialogComponentController.prototype.showAdvanced = function() {
		var self = this;
		self.$mdDialog.show({
			controller: self.controller,
			templateUrl: self.template,
			parent: angular.element(document.body),
			targetEvent: self.event,
			clickOutsideToClose:true,
			fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(response) {
			self.callback(response)
		}, function() {
			self.callback();
		});
	};


		DialogComponentController.$inject = [
			'$location',
			'$mdDialog'
		];
		return DialogComponentController;
	}());

	angular.module('app.controllers').controller('DialogComponent', {
		bindings: {
				template: '='
				controller: '=',
				event:'='
				callback:'='
		},
		controller: DialogComponentController
	});

})(window.angular);