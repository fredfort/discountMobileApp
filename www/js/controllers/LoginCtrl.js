
angular.module('starter.controllers')
.controller('LoginCtrl',['$scope','$state','$timeout','Facebook','FacebookAuth','dataService', 'toaster',
  function($scope,$state, $timeout,Facebook, FacebookAuth,dataService, toaster) {


  if(localStorage.token && localStorage.token !== null){
    $state.go('app.products');
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    dataService.login($scope.loginData).success(function(data, status, headers, config){
    	if(data.token){
        dataService.setUser(data.user);
        $scope.user.data = data.user;
        localStorage.token = data.token;
    		$state.go('app.products');
    	}else{
    		alert("wrong login/password");
    	}
   	}).error(function(data, status, headers, config){
      toaster.pop('error',data);
   	});
  };


  $scope.signUp = function(){
    dataService.signUp($scope.loginData).success(function(data, status, headers, config){
      if(data.token){
        dataService.setUser(data.user);
        $scope.user.data = data.user;
        localStorage.token = data.token;
        $state.go('app.products');
      }else{
        alert("something wrong happened");
      }
    }).error(function(data, status, headers, config){
         toaster.pop('error',data);
    });
  }
    
  /**
   * Watch for Facebook to be ready.
   * There's also the event that could be used
   */
  $scope.$watch(
    function() {
      return Facebook.isReady();
    },
    function(newVal) {
      if (newVal)
        $scope.facebookReady = true;
    }
  );

  $scope.IntentLogin = function(){
    FacebookAuth.intendLogin();
  };



}]);