var app = angular.module('MeanBook', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider) {

    var routeUserChecks = {
        admin: {
            autha: function (auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            autha: function (auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: 'partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/courses', {
            templateUrl: 'partials/courses/courses-list',
            controller: 'CoursesListCtrl'
        })
        .when('/courses/:id', {
            templateUrl: 'partials/courses/course-details',
            controller: 'CoursesDetailsCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.admin
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl',
            // resolve: routeRoleChecks.admin
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
}]);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.greeting = 'Hello';
}]);

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, curr, prev, rej) {
        if (rej === 'not authorized') {
            $location.path('/');
        }
    })
});