var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, require: '{PATH} is required', unique: true},
    firstName: {type: String, require: '{PATH} is required'},
    lastName: {type: String, require: '{PATH} is required'},
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {

    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Find user error ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt = encryption.generateSalt(),
                hashedPassword = encryption.generateHashedPassword(salt, 'ikolev');
            User.create({
                username: 'ikolev',
                firstName: 'Ivan',
                lastName: 'Kolev',
                salt: salt,
                hashPass: hashedPassword,
                roles: ['admin']
            });
            salt = encryption.generateSalt();
            hashedPassword = encryption.generateHashedPassword(salt, '123');
            User.create({
                username: 'uz',
                firstName: 'UU',
                lastName: 'ZZ',
                salt: salt,
                hashPass: hashedPassword,
                roles: ['user']
            });
            console.log('Users added to db...');
        }


    });
};
