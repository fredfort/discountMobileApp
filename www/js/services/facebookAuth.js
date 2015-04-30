angular.module('starter').factory('FacebookAuth',['Facebook','dataService','$state','$location','toaster',
	function(Facebook,dataService,$state,$location,toaster){

	var user = {};

	return{

		me: function(){
		  Facebook.api('/me', function(response) {
        this.user = response;
        localStorage.facebook_id = this.user.id;
        dataService.registerFacebookUser(this.user).success(function(data, status, headers, config){
        	dataService.setUser(data.user);
          $state.go('app.products');
      	}).error(function(data, status, headers, config){
  				toaster.pop('error',data);
    		});
      });
    },

		intendLogin:function(){
			var t = this;

			Facebook.getLoginStatus(function(response) {
				if(response.authResponse && response.authResponse.accessToken){
					localStorage.token = response.authResponse.accessToken;
				}
        if (response.status == 'connected') {
          	t.me();
        }else{
          t.login();
        }
	    },function(error){
	    	toaster.pop('error',error);
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



