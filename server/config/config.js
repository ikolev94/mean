var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/mean',
        port: process.env.PORT || 9000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:1admin2@ds011462.mlab.com:11462/ikolev',
        port: process.env.PORT || 9000
    }
};
