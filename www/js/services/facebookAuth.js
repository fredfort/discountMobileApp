angular.module('starter').factory('FacebookAuth',['Facebook','dataService','$state','$location',
	function(Facebook,dataService,$state,$location){

	var user = {};

	return{

		me: function(){
		  Facebook.api('/me', function(response) {
              this.user = response;
              dataService.registerFacebookUser(this.user);
              $state.go('app.products');
          });
        },

		intendLogin:function(){
			var t = this;

			Facebook.getLoginStatus(function(response) {
				console.log(response);
				if(response.authResponse && response.authResponse.accessToken){
					localStorage.token = response.authResponse.accessToken;
				}
	            if (response.status == 'connected') {
	              	t.me();
	            }else{
	              t.login();
	            }
	        },function(error){
	        	debugger;
	        });
		},

		login:function(){
			var t = this;
			Facebook.login(function(response) {
	          if (response.status == 'connected') {
	            t.me();
	          }
	        },{scope: 'public_profile,email'});
		},

		logout:function(){
			Facebook.logout(function() {
	        	$location.path('/app/login');
	            localStorage.removeItem('token');
	            this.user   = {};
        	});
		}
		
        /*      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }
        
        
      });*/
		
	}
}]);



