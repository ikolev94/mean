app.controller('ProfileCtrl', function ($scope, identity, auth,$location) {

    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    };

    $scope.update = function (user) {
        auth.update(user).then(function () {
            $location.path('/');
        })
    }

});