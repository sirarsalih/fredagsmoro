/* globals angular moment */

var app = angular.module("FDM");
// Inside the controller below, you can check the dependencies array of app and based on that
// show/hide the information div you've created in index.html 
app.controller("AppController", ["dataFactory", function (dataFactory) {
    "use strict";

    var self = this;

    dataFactory.years(function (years) {
        self.years = years;
    });

    dataFactory.latest(function (year, month, day) {
        self.latest = {
            "year": year,
            "month": month,
            "day": day,
            "title": moment(year + "-" + month + "-" + day, "YYYY-MM-DD hh:mm:ss").format("LL")
        };
    });
}]);

app.controller("ShowController", ["$routeParams", "dataFactory", function ($routeParams, dataFactory) {
    "use strict";

    var self = this;

    self.title = moment($routeParams.year + "-" + $routeParams.month + "-" + $routeParams.day, "YYYY-MM-DD hh:mm:ss").format("LL");

    self.year = $routeParams.year;
    self.month = $routeParams.month;
    self.day = $routeParams.day;

    self.slideInterval = 3000;

    dataFactory.filesForYearMonthDay($routeParams.year, $routeParams.month, $routeParams.day, function (files) {
        self.files = files;
    });

    self.setSpeed = function(speed) {
        self.slideInterval = speed;
    };
}]);

