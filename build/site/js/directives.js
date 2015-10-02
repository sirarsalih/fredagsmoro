/* global angular */

var app = angular.module("FDM");

app.directive("calendar", ["dataFactory", function (dataFactory) {
    "use strict";
    
    return {
        templateUrl: "views/cal.html",
        restrict: "A",
        scope: {
            year: "="
        },
        /* eslint-disable no-unused-vars */
        link: function ($scope, $element, $attrs) {
            $scope.title = $scope.year.name;

            dataFactory.monthsForYear($scope.year.name, function (months) {
                $scope.months = months;
            });
        }
        /* eslint-enable no-unused-vars */
    };
}]);
