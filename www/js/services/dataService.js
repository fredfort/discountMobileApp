angular.module('starter')

.factory('dataService',['$http','md5',function($http,md5){
	var nodeAPI = 'http://localhost:3000/';
	//var nodeAPI = 'http://default-environment-tjdrvapm26.elasticbeanstalk.com/';
	var baseURL = nodeAPI;
	var user = null;


	return {

		setUser: function(user){
			this.user = user;
			localStorage.user = JSON.stringify(user);
		},
		getUser: function(){
			return this.user || 
			JSON.parse(localStorage.getItem('user'));
		},

		getCategories :function(category){
			return $http.get(baseURL+'cat_products');
		},

		getOffers :function(lat,lng,categoryIds){
			return $http.post(baseURL+'mymerchants',
		    	{'latitude':lat, 'longitude': lng,'categoryIds':categoryIds.join()});
		},

		login : function(loginInformation){
			return $http.post(baseURL+'users',
		    	{'email':loginInformation.username, 'password':md5.createHash(loginInformation.password)});
		},

		signUp : function(loginInformation){
			return $http.post(baseURL+'createuser',
		    	{'email':loginInformation.username,'name':loginInformation.name,'password':md5.createHash(loginInformation.password)});
		},

		registerFacebookUser: function(user){
			return $http.post(baseURL+'createuser',
		    	{'email':user.email,'name':user.first_name,'facebook_id':user.id});
		},

	}

}]);