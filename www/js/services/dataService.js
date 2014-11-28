angular.module('starter')

.factory('dataService',['$http',function($http){
	var localAPI = "http://localhost/PHP_API/server/";
	var remoteAPI = "http://discount-dublinshop.rhcloud.com/PHP_API/server/";
	var baseURL = remoteAPI;


	return {

		getCategories :function(category){
			return $http.get(baseURL+'produit_api.php?action=getAllCategoriesMerchant');
		},

		getOffers :function(id,lat,lng){
			return $http.post(baseURL+'produit_api.php?action=getOffers',
				{'id':id, 'lat':lat, 'lng': lng});
		}

	}

}]);