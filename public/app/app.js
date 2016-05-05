(function () {
    var app = angular.module('MeanBook', ['ngResource', 'ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home',
                controller: 'MainCtrl'
            })
    }]);

    app.controller('MainCtrl', ['$scope', function ($scope) {
        $scope.greeting = 'Hello';
    }])
}());