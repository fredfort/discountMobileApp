angular.module('starter.controllers', [])

.controller('AppCtrl',['$scope','$ionicModal','$state','GeolocationService', function($scope, $ionicModal,$state,GeolocationService) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.logout = function(){
    localStorage.removeItem('token');
    GeolocationService.stopWatch();
    $state.go("app.login");
  }

}]);