'use strict';

angular.module('openDoorApp')
.controller('MainCtrl', function ($scope) {
  $scope.captureKey = function(event) {
    if (event.keyCode == 8) {
      // backspace
      $scope.$broadcast('backspace');
    } else {
      var keyChar = String.fromCharCode(event.keyCode);
      if (keyChar.length > 0) {
        // some relevant key was pressed
        $scope.$broadcast('keypress', keyChar.toLowerCase());        
      }
    }
  };
});
