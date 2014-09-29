var app = angular.module('FDM', ['ngRoute' ,'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/front.html'
    }).when('/:year/:month/:day', {
        templateUrl: 'views/show.html'
    }).when('/slide/:year/:month/:day', {
        templateUrl: 'views/carousel.html'
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
        },
        latest: function(callback) {
            var sortNameReverse = function(a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            };

            getData(function(data) {
                var year = data.sort(sortNameReverse)[0];

                var month = year.tree.sort(sortNameReverse)[0];

                var day = month.tree.sort(sortNameReverse)[0];

                callback(year.name, month.name, day.name);
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

    dataFactory.latest(function(year, month, day) {
        self.latest = {
            'year': year,
            'month': month,
            'day': day,
            'title': moment(year + "-" + month + "-" + day, "YYYY-MM-DD hh:mm:ss").format("LL")
        };
    });
}]);

app.controller('ShowController', ['$routeParams', 'dataFactory', function ($routeParams, dataFactory) {
    var self = this;

    self.title = moment($routeParams.year + "-" + $routeParams.month + "-" + $routeParams.day, "YYYY-MM-DD hh:mm:ss").format("LL");

    self.year = $routeParams.year;
    self.month = $routeParams.month;
    self.day = $routeParams.day;

    self.slideInterval = 3000;

    dataFactory.filesForYearMonthDay($routeParams.year, $routeParams.month, $routeParams.day, function (files) {
        self.files = files;
    });
}]);

