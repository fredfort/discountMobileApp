angular.module('starter').factory('sessionInjector',['$location',function($location) {
    var sessionInjector = {

    	request: function(config){
            if(localStorage.token){
                config.headers['Authorization'] = 'Basic '+localStorage.token;
            }
    		return config;

    	},
        response: function(config) {
            return config;
        },
        responseError: function(rejection){
            if(rejection.status === 403){
                $location.path('/app/login');
                localStorage.removeItem('token');
            }
             return rejection;
        }
    };
    return sessionInjector;
}]);