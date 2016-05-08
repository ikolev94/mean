app.controller('LoginCtrl', function ($scope, identity, auth, $location) {

    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user)
            .then(function (success) {
                if (success) {
                    console.log(identity.currentUser);
                } else {
                    console.log('reeeeeeee');
                }
            },function (err) {
                console.log(err);
            })
    };

    $scope.logout = function () {
        auth.logout()
            .then(function () {
                console.log('Logout');
                $location.path('/');
            })
    }
});