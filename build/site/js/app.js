/* global angular */

var app = angular.module("FDM", ["ngRoute" , "ui.bootstrap", "angulartics", "angulartics.google.analytics"]);

app.config(["$routeProvider", function ($routeProvider) {
    "use strict";
    
    $routeProvider.when("/", {
        templateUrl: "views/front.html"
    }).when("/:year/:month/:day", {
        templateUrl: "views/show.html"
    }).when("/slide/:year/:month/:day", {
        templateUrl: "views/carousel.html"
    }).when("/archive", {
        templateUrl: "views/archive.html"
    }).otherwise({redirectTo: "/"});
}]);
