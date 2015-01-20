
angular.module('starter.controllers')
.controller('LoginCtrl',['$scope','$state','$timeout','Facebook','FacebookAuth','dataService', 
  function($scope,$state, $timeout,Facebook, FacebookAuth,dataService) {


  if(localStorage.token && localStorage.token !== null){
    $state.go('app.products');
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    dataService.login($scope.loginData).success(function(data, status, headers, config){
    	if(data.token){
        dataService.setUserId(data.id);
    		$state.go('app.products');
    		localStorage.token = data.token;
    	}else{
    		alert("wrong login/password");
    	}
   	}).error(function(data, status, headers, config){

   	});
  };
    
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