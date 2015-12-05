var app = angular.module('tracing', ["angucomplete-alt"]);
app.controller('controller', function($scope, $http) {
	$http.defaults.headers.common.Authorization = 'Basic ciedidensingerearapersel';
	$scope.nbr_of_categories = 2
	$scope.available_categories = ['ost', 'kex', 'bläckfisk']
	$scope.used_categories = []
	$scope.values = []

	$scope.send = function(category, value) {
		var obj = {}
		for(var i = 0; i < $scope.values.length; i++) {
			var category = $scope.used_categories[i]
			var value = $scope.values[i]
			if(category && value) {
				obj[category] = value
			}
		}
		console.log(obj)
	} 

	$scope.range = function(lower, upper) {
		var li = []
		for(var i = lower; i < upper; i++) {
			li.push(i)
		}
		return li
	}

	$scope.add_field = function() {
		$scope.nbr_of_categories++
	}

	$scope.get_categories = function() {
		var url = "/categories"
		$http({
			url: url,
			method: 'GET'	
		})
		.then(function(response){
			$scope.available_categories = response.data.categories;
		}, function(error){

		});
	}

	$scope.get_categories()
});

