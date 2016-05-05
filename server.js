var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    environment = process.env.NODE_ENV || 'development',
    app = express(),
    port = process.env.PORT || 8900;

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

if (environment == 'development') {
    mongoose.connect('mongodb://localhost/mean');
} else {
    mongoose.connect('mongodb://admin:1admin2@ds011462.mlab.com:11462/ikolev');
}
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

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);
var messageFromDb;
Message.remove({}).exec(function (err) {
    if (err) {
        console.log('Message could not be remove');
    } else {
        console.log('Message deleted');

        Message.create({message: 'Hi from Mongoose'})
            .then(function (model) {
                messageFromDb = model.message;
                console.log(model.message);
            });
    }
});

app.get('/partials/:partialName', function (req, res) {
    res.render('partials/' + req.params.partialName);
});

app.get('*', function (req, res) {
    res.render('index', {message: messageFromDb});
});

app.listen(port);
console.log(environment);
console.log("Server is running -> localhost -p " + port);