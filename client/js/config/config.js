/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Modulo : Módulo de configurações.
 * data: 18/01/2017
 */
(function(angular) {
	'use strict';
	angular.module('app.routes', ['ngRoute', 'ngMaterial'])

	.config(function ($mdDateLocaleProvider, $mdThemingProvider, $mdAriaProvider) {
		$mdDateLocaleProvider.formatDate = function (date) {
			return date ? moment(date).format('DD/MM/YYYY') : '';
		};

		$mdDateLocaleProvider.parseDate = function (dateString) {
			var m = moment(dateString, 'DD/MM/YYYY', true);
			return m.isValid() ? m.toDate() : new Date(NaN);
		};
<<<<<<< HEAD
		$mdThemingProvider.theme('default').primaryPalette('red');
		//$mdThemingProvider.theme('default').primaryPalette('teal');
=======
		// $mdThemingProvider.theme('default').primaryPalette('red');
		$mdThemingProvider.theme('default').primaryPalette('teal');
>>>>>>> aed7f327379594d899c66d5371181c0e4ca853ca
		$mdAriaProvider.disableWarnings();
	})
	.config(['$routeProvider', function (routeProvider) {
		routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController',
			controllerAs: 'ctrl'
		}).when('/familia', {
			templateUrl: 'partials/familia.html',
			controller: 'FamiliaController',
			controllerAs: 'ctrl'
		}).when('/automoveis', {
			templateUrl: 'partials/automoveis.html',
			controller: 'AutomoveisController',
			controllerAs: 'ctrl'
		}).when('/viagens', {
			templateUrl: 'partials/viagens.html',
			controller: 'ViagensController',
			controllerAs: 'ctrl'
<<<<<<< HEAD
		}).when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		}).when('/novousuario', {
			templateUrl: 'partials/novousuario.html',
			controller: 'NovoUsuarioController',
			controllerAs: 'ctrl'
=======
>>>>>>> aed7f327379594d899c66d5371181c0e4ca853ca
		}).otherwise({
			redirectTo: '/crud'
		});
	}])
	.run(function ($rootScope, $location) {
		var history = [];

		$rootScope.$on('$routeChangeSuccess', function () {
			history.push($location.$$path);
		});

		$rootScope.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			$location.path(prevUrl);
		};
	});
})(window.angular);