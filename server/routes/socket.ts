'use strict';

///  <reference path="../../typings/tsd.d.ts"/>

module.exports = function(io) {

  // TODO: Implement Socket / Trigger
  // start socket
  var chat = io
    .of('/chat')
    .on('connection', function (socket) {
      console.log('hier');
      socket.emit('a message', {
          that: 'only'
        , '/chat': 'will get'
      });
      chat.emit('a message', {
          everyone: 'in'
        , '/chat': 'will get'
      });
    });

  var news = io
    .of('/news')
    .on('connection', function (socket) {
      socket.emit('item', { news: 'item' });
    });
  // end socket

}
