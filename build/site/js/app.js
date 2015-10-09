/* global angular */

var dependencies = ["ngRoute" , "ui.bootstrap"];

if(typeof window.angulartics !== 'undefined') {
    dependencies.push("angulartics");
    dependencies.push("angulartics.google.analytics");
}

var app = angular.module("FDM", dependencies);

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
