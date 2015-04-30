angular.module('starter')

.factory('ProductService',function(){

	var productsPreference = angular.fromJson(localStorage.productsPreference) || [];

	return {

		addCategory :function(category){
			productsPreference.push(category);
			this.setPreference();
		},

		removeCategory :function(category){
			var index = _.findIndex(productsPreference,function(cat){
				return category.id === cat.id;
			});
			if(index > -1){
				productsPreference.splice(index,1);
			}
			this.setPreference();
		},

		setPreference: function(){
			localStorage.productsPreference = angular.toJson(productsPreference);
		},

		getPreference: function(){
			return angular.fromJson(localStorage.productsPreference);
		}

	}

});