app.controller('CoursesDetailsCtrl', function ($scope, $routeParams, CourseResource) {
    $scope.course = CourseResource.get({id: $routeParams.id});
});