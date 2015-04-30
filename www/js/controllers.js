angular.module('starter.controllers', [])

.controller('AppCtrl',['$scope','FacebookAuth','GeolocationService','$state', 'dataService',function($scope,FacebookAuth,GeolocationService,$state,dataService) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.user = {data:dataService.getUser()};

  $scope.logout = function(){
    localStorage.clear();
    GeolocationService.stopWatch();
    FacebookAuth.logout();
    $state.go("app.login");
  }


}]);