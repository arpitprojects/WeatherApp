//Module
var weatherApp = angular.module('weatherApp' , ['ngRoute' , 'ngResource']);
//Controller
weatherApp.controller('control_main' , ['$location','$scope' , 'weatherApp_service' , function($location,$scope , weatherApp_service){
	$scope.city = weatherApp_service.city;
	$scope.submit = function(){
		$location.path('/fore');
	};
	
	$scope.$watch(function(){
		weatherApp_service.city = $scope.city;
	});
}]);

weatherApp.controller('control_fore' , ['$scope','$resource','weatherApp_service','$routeParams' , function($scope ,$resource, weatherApp_service,$routeParams){
	$scope.days  = $routeParams.days || '2';
	console.log($routeParams.days);
	console.info($scope.days);
	$scope.city = weatherApp_service.city;
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"} , {get :{method :"JSONP"} });
	$scope.result = $scope.weatherAPI.get({q :$scope.city , cnt  : $scope.days , appid : '97c2f1f54f6122034c60c95c760735db'});
	//console.log($scope);
	
	$scope.convertToDate = function(x){
	return new Date(x*1000);
};
}]);
//Routing
weatherApp.config(function($routeProvider){
	$routeProvider
	
	.when('/' , {
		templateUrl: 'pages/home.html',
		controller :'control_main'
	})
	.when('/fore' , {
		templateUrl : 'pages/fore.html',
		controller: 'control_fore'
	})
	.when('/fore/:days' , {
		templateUrl : 'pages/fore.html',
		controller: 'control_fore'
	})
});
//Service 
weatherApp.service('weatherApp_service' ,function(){
	this.city = "Kolkata";
});

//Directive