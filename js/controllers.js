var app = angular.module('FDM', []);

app.factory('dataFactory', ['$http', function($http) {
    var dataFactory = {};

    dataFactory.getData = function() {
        return $http.get('data.json');
    };

    return dataFactory;
}]);

app.controller('AppController', ['$scope', 'dataFactory', function ($scope, dataFactory) {
    $scope.title = "Fredagsmoro";
    $scope.author = "Fredagsmoro - samlet av Ragnar Bergvik";

    dataFactory.getData().success(function (data) {
        $scope.pageTree = data;
    });

    $scope.load = function(year, month, day, files) {
        $scope.title = year + "-" + month + "-" + day;
        $scope.files = files;

    };

    $scope.clear = function() {
        $scope.title = "Fredagsmoro";
        $scope.files = [];
    };
}]);

