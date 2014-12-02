angular.module('starter')

.factory('GeolocationService',function(){

	var watchId = null;

	return {

		watch : function(callback){
			if (navigator.geolocation){
	  			 this.watchId = navigator.geolocation.watchPosition(callback, this.errorCallback, 
	  			 							{enableHighAccuracy:true,maximumAge:30000, timeout:27000});
		  	}else{
			   alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
		    }
		},

		stopWatch: function(){
			navigator.geolocation.clearWatch(this.watchId);
		},

		errorCallback: function(error){
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
		}
	}

});