angular.module('starter.controllers')
.controller('ProductsCtrl',['$scope','dataService','ProductService', function($scope,dataService,ProductService) {
	
	$scope.preference = ProductService.getPreference() || [];
	dataService.getCategories()
	.success(function(data, status, headers, config){
		angular.forEach(data,function(category){
			var index = $scope.findIndex($scope.preference,function(cat){
				return category._id === cat._id;
			});
			if(index != -1){
				category.selected = true;
			}else{
				category.selected = false;
			}
		});
		$scope.categoriesProduct = data;			
	})
	.error(function(data, status, headers, config){
		console.log(data, status, headers, config);
	});

	$scope.selectCategory = function(category){
		category.selected = !category.selected;
		if(category.selected){
			ProductService.addCategory(category);
		}else{
			ProductService.removeCategory(category);
		}
	}


}]);

