var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    environment = process.env.NODE_ENV || 'development',
    app = express(),
    port = 8900;

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }
    }
));

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialName', function (req, res) {
    res.render('partials/' + req.params.partialName);
});

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(port);
console.log("Server is running -> localhost -p " + port);