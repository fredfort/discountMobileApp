angular.module('starter.controllers', [])

.controller('AppCtrl',['$scope','FacebookAuth','GeolocationService','$state', function($scope,FacebookAuth,GeolocationService,$state) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.logout = function(){
    localStorage.removeItem('token');
    GeolocationService.stopWatch();
    FacebookAuth.logout();
    $state.go("app.login");
  }

}]);