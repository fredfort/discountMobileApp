angular.module('starter')

.factory('dataService',['$http','md5',function($http,md5){
	var localAPI = "http://localhost/PHP_API_2/api.php?request=";
	var remoteAPI = "http://discount-dublinshop.rhcloud.com/PHP_API_2/api.php?request=";
	var nodeAPI = 'http://localhost:3000/';
	var baseURL = nodeAPI;
	var userId = null;


	return {

		setUserId: function(id){
			this.userId = id;
		},
		getUserId: function(){
			return this.userId;
		},

		getCategories :function(category){
			return $http.get(baseURL+'cat_products');
		},

		getOffers :function(lat,lng){
			return $http.get(baseURL+'offers',
		    	{params:{'id':this.userId, 'lat':lat, 'lng': lng}});
		},

		login : function(loginInformation){
			return $http.post(baseURL+'users',
		    	{'email':loginInformation.username, 'password':md5.createHash(loginInformation.password)});
		},
		registerFacebookUser: function(user){
			console.log(user);
		},

	}

}]);