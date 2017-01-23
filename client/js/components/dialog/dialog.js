$scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: DialogComponent, responsável por criar os dialogs de acordo com as configurações passadas por paramtro.
 * data: 18/01/2017
 */
(function (angular) {
  'use strict';
  var DialogComponent = (function () {
    function DialogComponent($location) {
      var self        = this;
      self.familia = self.getFamilia();
    }


    DialogComponent.$inject = [
      '$location',
    ];
    return DialogComponent;
  }());

  angular.module('app.controllers').controller('DialogComponent', DialogComponent);

})(window.angular);