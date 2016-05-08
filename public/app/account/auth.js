app.factory('auth', function ($q, identity, $http, UsersResource) {
    return {
        signup: function (user) {
            var deferred = $q.defer();

            var user = new UsersResource(user);
            user.$save().then(function () {
                identity.currentUser = user;
                deferred.resolve();
            }, function (err) {
                deferred.reject(err);
            });

            // $http.post('/signup', user).success(function (response) {
            //     if (response.success) {
            //         var user = new UsersResource();
            //         angular.extend(user, response.user);
            //         identity.currentUser = user;
            //         deferred.resolve(true);
            //     } else {
            //         deferred.reject(false);
            //     }
            // });

            return deferred.promise;
        },
        login: function (user) {
            var deferred = $q.defer();
            $http.post('/login', user).success(function (response) {
                if (response.success) {
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },
        update: function (user) {
            var defer = $q.defer();

            var updatedUser = new UsersResource(user);
            updatedUser._id = identity.currentUser._id;
            updatedUser.$update().then(function () {
                identity.currentUser.firstName = updatedUser.firstName;
                identity.currentUser.lastName = updatedUser.lastName;
                defer.resolve();
            }, function () {
                defer.reject();
            });

            return defer.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/logout').success(function () {
                identity.currenUser = undefined;
                deferred.resolve();
            });

            return deferred.promise;
        },
        isAuthenticated: function () {
            if (identity.isAuthenticated()) {
                return true
            } else {
                return $q.reject('not authorized')
            }
        },
        isAuthorizedForRole: function (role) {
            if (identity.isAuthorizedForRole(role)) {
                return true
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});