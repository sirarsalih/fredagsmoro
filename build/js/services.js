/* global angular */

var app = angular.module("FDM");

app.factory("dataFactory", ["$http", function ($http) {
    "use strict";
    
    function getData(callback) {
        $http({
            method: "GET",
            url: "data.json",
            cache: true
        }).success(callback);
    }

    return {
        years: function (callback) {
            getData(function (data) {
                var years = [];

                angular.forEach(data, function (year) {
                    this.push({ "name": year.name });
                }, years);

                callback(years);
            });
        },
        monthsForYear: function (year, callback) {
            getData(function (data) {
                var months = [];

                angular.forEach(data.filter(function (candidate) {
                    return candidate.name === year;
                })[0].tree, function (month) {
                    var result = { "name": month.name };

                    var days = [];

                    angular.forEach(month.tree, function (day) {
                        this.push({ "name": day.name });
                    }, days);

                    result.days = days;

                    this.push(result);
                }, months);

                callback(months);
            });
        },
        filesForYearMonthDay: function (year, month, day, callback) {
            function filterTree(tree, match) {
                return tree.filter(function (candidate) {
                    return candidate.name === match;
                })[0].tree;
            }

            getData(function (data) {
                callback(filterTree(filterTree(filterTree(data, year), month), day));
            });
        },
        latest: function (callback) {
            var sortNameReverse = function (a, b) {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            };

            getData(function (data) {
                var year = data.sort(sortNameReverse)[0];

                var month = year.tree.sort(sortNameReverse)[0];

                var day = month.tree.sort(sortNameReverse)[0];

                callback(year.name, month.name, day.name);
            });
        }
    };
}]);
