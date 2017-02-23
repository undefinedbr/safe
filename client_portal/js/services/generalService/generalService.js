/**
 * Alter by lucas on 26/09/16.
 * @autor -  Lucas Henrique de Abreu - <lucas.henrique@viasoft.com>
 * data: 18/04/2016
 */
(function (angular) {
	'use strict';

	var HttpService = (function () {
		function HttpService($http,$cookies) {
			var self = this;
			self.$http = $http;
			self.$cookies = $cookies;
			self.contextPath = "http://localhost:9000/api/";
			//Debug
			//self.contextPath = "http://localhost:8080/api/";
		};

		HttpService.prototype.get = function (url,obj) {
			var self = this;
			return self.$http({
				method: 'GET',
				url: self.contextPath + url,
				data: JSON.stringify(obj),
				headers: {
					"X-Auth-Token": self.$cookies.get('X-Auth-Token')
				}
			});
		};

		HttpService.prototype.post = function (obj, url) {
			var self = this;
			return self.$http({
				method: 'POST',
				url: self.contextPath + url,
				data: JSON.stringify(obj),
				headers: {
					"X-Auth-Token": self.$cookies.get('X-Auth-Token')
				}
			});
		};

		HttpService.prototype.delete = function (url, obj) {
			var self = this;
			return self.$http({
				method: 'DELETE',
				url: self.contextPath + url,
				data: JSON.stringify(obj),
				contentType: "application/json",
				headers: {
					"X-Auth-Token": self.$cookies.get('X-Auth-Token')
				}
			});
		};

		HttpService.$inject = [
			'$http',
			'$cookies'
		];

		return HttpService;
	}());

	var ShowToast = (function () {
		function ShowToast($mdToast) {
			this.$mdToast = $mdToast;
			this.last = {
				bottom: false,
				top: true,
				left: false,
				right: true
			};
			this.toastPosition = angular.extend({}, this.last);
		};

		ShowToast.prototype.getToastPosition = function () {
			var self = this;
			self.sanitizePosition();
			return Object.keys(self.toastPosition)
				.filter(function (pos) {
					return self.toastPosition[pos];
				}).join(' ');
		};

		ShowToast.prototype.sanitizePosition = function () {
			var current = this.toastPosition;
			if (current.bottom && this.last.top) current.top = false;
			if (current.top && this.last.bottom) current.bottom = false;
			if (current.right && this.last.left) current.left = false;
			if (current.left && this.last.right) current.right = false;
			this.last = angular.extend({}, current);
		}

		ShowToast.prototype.showSimpleToast = function (msg, position) {
			var self = this;
			var pinTo = position ? position : self.getToastPosition();
			self.$mdToast.show({
				hideDelay   : 3000,
				position    : 'top right',
				controller  : 'ToastController as ctrl',
				template : '<md-toast>'+
						'<span class="md-toast-text" flex>'+unescape(encodeURIComponent(msg))+'</span>'+
							'<md-button ng-click="ctrl.closeToast()">'+
								'<md-icon style="color:#fff;">close</md-icon>'+
							'</md-button>'+
						'</md-toast>'
			});
		};


		ShowToast.$inject = [
			'$mdToast'
		];

		return ShowToast;
	}());


	var ToastController = (function () {
		function ToastController($mdToast) {
			this.$mdToast = $mdToast;
		};

		ToastController.prototype.closeToast = function() {
			var self = this;
			if (self.isDlgOpen) return;
			self.$mdToast.hide().then(function() {
				self.isDlgOpen = false;
			});
		};

		ToastController.$inject = [
			'$mdToast'
		];

		return ToastController;
	}());

	var DialogService = (function () {
		function DialogService($mdDialog) {
			this.$mdDialog = $mdDialog;
		};

		DialogService.prototype.openDialog = function (templateUrl, controller, callBack, ev, parameter, scope) {
			var self = this;
			self.$mdDialog.show({
				templateUrl: templateUrl,
				controller:  controller,
				controllerAs: 'ctrl',
				parent: angular.element(document.body),
				targetEvent: ev,
				locals:  parameter,
				clickOutsideToClose: true,
				fullscreen: true
			}).then(function(response) {
				callBack(response);
			}, function() {
				console.log('cancelado');
			});
		};

		DialogService.$inject = [
			'$mdDialog'
		];

		return DialogService;
	}());

	angular.module('app.services')
		.service("httpService", HttpService)
		//Apenas foi declarado um controller neste modulo por fazer parte do showToast
		.controller('ToastController', ToastController)
		.service("showToast", ShowToast)
		.service("dialogService", DialogService);
})(window.angular);