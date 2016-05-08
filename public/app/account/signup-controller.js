app.controller('SignUpCtrl', function ($scope, auth) {
    $scope.signup = function (user) {
        auth.signup(user).then(function () {
                console.log('Registration');
        },function (err) {
            console.log(err);
        })
    }
});