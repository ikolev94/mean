var UsersController = require('../controllers/UsersController'),
    coursesController = require('../controllers/courses-controller');

module.exports = {
    users: UsersController,
    courses: coursesController
};