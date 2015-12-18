'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var stylus = require('stylus');
var nib = require('nib');
var config = require('./server/config.json');
var Logger = require('./server/common/Logger');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var logger = new Logger();
app.set('port', process.env.PORT || config.app.dev.port);
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/client/public'));
app.use(stylus.middleware({ src: __dirname + '/client/public/css',
    compile: compile
}));
server.listen(app.get('port'), function () {
    logger.info('Express server listening on port: ' + app.get('port'));
});
require('./server/routes/public')(app);
require('./server/routes/private')(app);
require('./server/routes/odata')(app);
require('./server/routes/socket')(io);
app.use(function (req, res) {
    res.send(404);
});
