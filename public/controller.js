var app = angular.module('tracing', ["angucomplete-alt"]);
app.controller('controller', function($scope, $http) {
	$http.defaults.headers.common.Authorization = 'Basic ciedidensingerearapersel';
	$scope.nbr_of_categories = 2;
	$scope.available_categories = ['ost', 'kex', 'bläckfisk'];
	$scope.used_categories = [];
	$scope.values = [];
	$scope.query_response = "";

	$scope.send = function() {
		var obj = {};
		for(var i = 0; i < $scope.values.length; i++) {
			var category = $scope.used_categories[i]; // category is already defined
			var value = $scope.values[i]; // value is already defined
			if(category && value) {
				obj[category] = value;
			}
		}
		console.log(obj);
		$scope.query(obj);
	} ;

	$scope.range = function(lower, upper) {
		var li = [];
		for(var i = lower; i < upper; i++) {
			li.push(i);
		}
		return li;
	};

	$scope.add_field = function() {
		$scope.nbr_of_categories++;
	};

	$scope.get_categories = function() {
		var url = "/categories";
		$http({
			url: url,
			method: 'GET'
		})
		.then(function(response){
			$scope.available_categories = response.data.categories;
		}, function(error){

		});
	};

	$scope.query = function(query) {
		console.log("query called");
		console.log(query);
		var url = "/query";
		$http.post(url, query)
		.then(function(response){
			$scope.query_result = response;
			console.log(response);
		}, function(error){});
	};

	$scope.get_categories();
});
