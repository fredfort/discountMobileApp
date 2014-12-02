
angular.module('starter.controllers')
.controller('LoginCtrl',['$scope','$state','dataService', function($scope,$state,dataService) {


  if(localStorage.token && localStorage.token !== null){
    $state.go('app.products');
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    dataService.login($scope.loginData).success(function(data, status, headers, config){
    	if(data.res === "OK"){
        dataService.setUserId(data.id);
    		$state.go('app.products');
    		localStorage.token = data.token;
    	}else{
    		alert("wrong login/password");
    	}
   	}).error(function(data, status, headers, config){

   	});
  };
}]);