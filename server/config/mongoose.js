var mongoose = require('mongoose'),
    user = require('../models/userModel'),
    course = require('../models/course');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be open' + err);
            return;
        }
        console.log('Database is running');
    });

    db.on('error', function (err) {
        console.error('Database error' + err);
    });

   user.seedInitialUsers();
    course.seedInitialCourses();
};
