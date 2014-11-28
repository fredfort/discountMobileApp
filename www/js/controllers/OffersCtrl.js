
angular.module('starter.controllers')
.controller('OffersCtrl',['$scope','dataService','ProductService', function($scope,dataService,ProductService) {
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

	$scope.successCallback = function(position){
		if($scope.position.latitude === 0){
			if($scope.position.latitude === 0){
				$scope.map.setView([position.coords.latitude, position.coords.longitude], 14);
			}
		}
		if($scope.distance(position.coords.latitude,position.coords.longitude, $scope.position.latitude,$scope.position.longitude) > 1){
			$scope.$apply(function(){
				$scope.position.distance  = $scope.distance(position.coords.latitude,position.coords.longitude, 53.339107899999995,-6.243373999999999);
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

		    $scope.preference = ProductService.getPreference() || [];

			dataService.getOffers(1, position.coords.latitude, position.coords.longitude)
			.success(function(data, status, headers, config){
				var products = $scope.filter(data,function(offer){
					var index = $scope.findIndex($scope.preference,function(cat){
						return cat.typeP === offer.typeP;
					});
					if(index > -1 ){
						return true;
					}
				});
				$scope.products = products;
			    angular.forEach(products,function(product){
			    	var lat = parseFloat(product.latitude);
			    	var lng = parseFloat(product.longitude)
			    	$scope.marker = L.marker([lat,lng]).addTo($scope.map).bindPopup(product.merchantName);
		    	});					
			 })
			.error(function(data, status, headers, config){
				console.log(data, status, headers, config);
			});

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
	 
	$scope.errorCallback = function(error){
	  switch(error.code){
	    case error.PERMISSION_DENIED:
	      alert("L'utilisateur n'a pas autorisé l'accès à sa position");
	      break;      
	    case error.POSITION_UNAVAILABLE:
	      alert("L'emplacement de l'utilisateur n'a pas pu être déterminé");
	      break;
	    case error.TIMEOUT:
	      alert("Le service n'a pas répondu à temps");
	      break;
	    }
	},
	 
	$scope.stopWatch = function(){
	  navigator.geolocation.clearWatch(watchId);
	} 

	if (navigator.geolocation){
	   var watchId = navigator.geolocation.watchPosition($scope.successCallback, $scope.errorCallback, {enableHighAccuracy:true,maximumAge:30000, timeout:27000});
  	}else{
	   alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
    }
}]);

