var app = angular.module('FDM', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/front.html'
    }).when('/:year/:month/:day', {
        templateUrl: 'views/show.html'
    }).otherwise({redirectTo: '/'});
}]);

app.factory('dataFactory', ['$http', function ($http) {
    function getData(callback) {
        $http({
            method: 'GET',
            url: 'data.json',
            cache: true
        }).success(callback);
    }

    return {
        years: function (callback) {
            getData(function (data) {
                var years = [];

                angular.forEach(data, function (year) {
                    this.push({ 'name': year.name });
                }, years);

                callback(years);
            });
        },
        monthsForYear: function (year, callback) {
            getData(function (data) {
                var months = [];

                angular.forEach(data.filter(function (candidate) {
                    return candidate.name == year;
                })[0].tree, function (month) {
                    var result = { 'name': month.name };

                    var days = [];

                    angular.forEach(month.tree, function (day) {
                        this.push({ 'name': day.name });
                    }, days);

                    result['days'] = days;

                    this.push(result);
                }, months);

                callback(months);
            });
        },
        filesForYearMonthDay: function (year, month, day, callback) {
            getData(function (data) {
                var yearTree = data.filter(function (candidate) {
                    return candidate.name == year;
                })[0].tree;

                var monthTree = yearTree.filter(function (candidate) {
                    return candidate.name == month;
                })[0].tree;

                var dayTree = monthTree.filter(function (candidate) {
                    return candidate.name == day;
                });

                callback(dayTree[0].tree);
            });
        }
    };
}]);

app.directive('calendar', ['dataFactory', function (dataFactory) {
    return {
        templateUrl: 'views/cal.html',
        restrict: 'A',
        scope: {
            year: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.title = $scope.year.name;

            dataFactory.monthsForYear($scope.year.name, function (months) {
                $scope.months = months;
            });
        }
    }
}]);

app.controller('AppController', ['dataFactory', function (dataFactory) {
    var self = this;

    dataFactory.years(function (years) {
        self.years = years;
    });
}]);

app.controller('ShowController', ['$routeParams', 'dataFactory', function ($routeParams, dataFactory) {
    var self = this;

    self.title = moment($routeParams.year + "-" + $routeParams.month + "-" + $routeParams.day).format("LL");

    dataFactory.filesForYearMonthDay($routeParams.year, $routeParams.month, $routeParams.day, function (files) {
        self.files = files;
    });
}]);

