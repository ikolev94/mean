var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');
module.exports = {
    createUser: function (req, res, next) {
        var newUser = req.body;
        newUser.salt = encryption.generateSalt();
        newUser.hashPass = encryption.generateHashedPassword(newUser.salt, newUser.password);

        User.create(newUser, function (err, user) {
            if (err) {
                console.log('faild to register new user' + err);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({message: err.toString()});
                }
                console.log(user);
                res.send(user);
            })
        })
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUser = req.body;
            console.log(updatedUser);
            if (updatedUser.password) {
                updatedUser.salt = encryption.generateSalt();
                updatedUser.hashPass = encryption.generateHashedPassword(updatedUser.salt, updatedUser.password);
            }
            User.update({_id: req.body._id}, updatedUser, function () {
                res.end();
            });

        } else {

            res.send({message: 'You do not have permission'})
        }

    },
    getAllUsers: function (req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Users could not be loaded : ' + err);
            }

            res.send(collection);
        })
    }
};