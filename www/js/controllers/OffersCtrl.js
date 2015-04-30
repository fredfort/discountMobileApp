
angular.module('starter.controllers')
.controller('OffersCtrl',['$scope','dataService','ProductService','GeolocationService','toaster',
 function($scope,dataService,ProductService,GeolocationService,toaster) {

	$scope.center = {};
	$scope.markers = [];
	$scope.position = {
		latitude: 0,
	 	longitude: 0,
	 	distance: 0,
	 	accuracy: 0
	}
	 
	$scope.map = L.map('map');
	  // add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo($scope.map);

	var RedIcon = L.Icon.Default.extend({
		options:{
			iconUrl:'img/marker-icon-red.png'
		}
	});
	$scope.redIcon = new RedIcon();


	$scope.preference = ProductService.getPreference() || [];

	var categorieIds = _.map($scope.preference, function(category){
		return category._id
	});

	$scope.successCallback = function(position){
		if($scope.position.latitude === 0){
			if($scope.position.latitude === 0){
				$scope.map.setView([position.coords.latitude, position.coords.longitude], 14);
			}
		}
		if($scope.distance(position.coords.latitude,position.coords.longitude, $scope.position.latitude,$scope.position.longitude) > 1){
			$scope.$apply(function(){
				$scope.position.latitude  = position.coords.latitude;
				$scope.position.longitude = position.coords.longitude;
				$scope.position.accuracy = position.coords.accuracy;
			});	

		  // add a marker in the given location, attach some popup content to it and open the popup
			$scope.removeAllMarker();
			if($scope.myself){
				$scope.map.removeLayer($scope.myself);
			}
			$scope.myself = L.marker([$scope.position.latitude, $scope.position.longitude],{icon:$scope.redIcon}).addTo($scope.map)
		    .bindPopup('Me');

		    if(categorieIds.length >0){
				dataService.getOffers(position.coords.latitude, position.coords.longitude,categorieIds)
				.success(function(merchants, status, headers, config){
					$scope.products = [];
				    angular.forEach(merchants,function(merchant){
				    	$scope.products = $scope.products.concat(merchant.products);
				    	var lat = parseFloat(merchant.latitude);
				    	var lng = parseFloat(merchant.longitude)
				    	$scope.marker = L.marker([lat,lng]).addTo($scope.map).bindPopup(merchant.name);
			    	});					
				 })
				.error(function(data, status, headers, config){
					console.log(data, status, headers, config);
				});
			}else{
				toaster.pop('info','You haven\'t selected any products! Please go back to product and pick at least one of them');
			}
		}
	};

	$scope.removeAllMarker = function(){
		angular.forEach($scope.markers,function(marker){
			$scope.map.removeLayer($marker);
		});
	};

	//Conversion des degrés en radian
   $scope.convertRad = function(input){
	  return (Math.PI * input)/180;
	},

	$scope.distance = function(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre){
	    var R = 6378000 //Rayon de la terre en mètre
	    var lat_a = $scope.convertRad(lat_a_degre);
	    var lon_a = $scope.convertRad(lon_a_degre);
	    var lat_b = $scope.convertRad(lat_b_degre);
	    var lon_b = $scope.convertRad(lon_b_degre);
	    var d = R * (Math.PI/2 - Math.asin( Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
	    return d;//distance (meter)
	},
	 
	GeolocationService.watch($scope.successCallback);

}]);