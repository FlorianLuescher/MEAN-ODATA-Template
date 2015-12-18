'use strict';

///  <reference path="./typings/tsd.d.ts"/>

// internal modules
import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import path = require('path');
import stylus = require('stylus');
var nib = require('nib');

// get config
var config = require('./server/config.json');

// get external modules
import Logger = require('./server/common/Logger');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// instantiation of global singelton-classes
var logger: Logger = new Logger();

// app set
app.set('port', process.env.PORT || config.app.dev.port);
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

// app use
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/client/public'));
app.use(stylus.middleware(
  { src: __dirname + '/client/public/css'
  , compile: compile
  }
));

server.listen(app.get('port'), function () {
  logger.info('Express server listening on port: ' + app.get('port'));
});

require('./server/routes/public')(app);
require('./server/routes/private')(app);
require('./server/routes/odata')(app);
require('./server/routes/socket')(io);

// catch 404 and forward to error handler
app.use(function(req, res/*next*/) {
  res.send(404);
  // TODO Not Found page
});
