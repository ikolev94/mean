var express = require('express'),
    environment = process.env.NODE_ENV || 'development',
    app = express();

var config = require('./server/config/config')[environment];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')(config);
require('./server/config/routes')(app);


app.listen(config.port);
console.log(environment);
console.log("Server is running -> localhost -p " + config.port);