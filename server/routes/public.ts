'use strict';

///  <reference path="../../typings/tsd.d.ts"/>

import Q = require ('q');
import CryptoJS = require('crypto-js');
import jwt = require('jsonwebtoken');

import MongoDB = require('../common/MongoDB');

var config = require('../config.json');

module.exports = function(app) {

  app.all('*', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*"); // TODO evori.ch http://stackoverflow.com/questions/1653308/access-control-allow-origin-multiple-origin-domains
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, X-HTTP-Method-Override, Accept, x-access-token, x-user-token'); //  <field-name>[, <field-name>]*
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  });

  // index
  app.get('/', function (req, res) {
    res.render('index', { title : 'Home' });
  });



  app.route('/api/register')
    .post(function(req, res) {

      if (typeof req.body.user !== 'undefined' && req.body.user &&
          typeof req.body.password !== 'undefined' && req.body.password) {

        var user:string = req.body.user;
        var password:string = CryptoJS.SHA3(req.body.password).toString();
        var mongodb = new MongoDB();

        // TODO gewährleisten, dass user unique ist --> mongodb schema update

        Q.fcall(function() {
          return mongodb.openConnection(config.app.dev.mongodb)
        })
        .then(function(result:any) {
          return mongodb.insertCollection(result.db, 'Users', [ { "user" : user, "password" : password } ]);
        })
        .then(function(result:any) {
          mongodb.closeConnection(result.db)
          return result;
        })
        .then(function(result:any) {

          var signOptions:any = {
            expiresIn: 86400 // expires in 24 hours
          };

          console.log(JSON.stringify(result.collections[0]));
          // jsonwebtoken (payload, secret, config)
          var token = jwt.sign(JSON.stringify(result.collections[0]), config.app.secret, signOptions);

          res.send(200, {
            'x-user-token' : token
          });

        })
        .catch(function (err) {
          console.log(err);
          res.send(500); // Server error
        })
        .done();

      } else {
        res.send(400); // bad request
      }
    });

  // auth
  app.route('/api/auth')
    .post(function(req, res) {

      if (typeof req.body.user !== 'undefined' && req.body.user &&
          typeof req.body.password !== 'undefined' && req.body.password) {

        var user:string = req.body.user;
        var password:string = CryptoJS.SHA3(req.body.password).toString();
        var mongodb = new MongoDB();

        Q.fcall(function() {
          return mongodb.openConnection(config.app.dev.mongodb)
        })
        .then(function(result:any) {
          return mongodb.findCollection(result.db, 'Users', { "user" : user, "password" : password });
        })
        .then(function(result:any) {
          mongodb.closeConnection(result.db)
          return result;
        })
        .then(function(result:any) {
          if (result.collections.length > 0) {

            var signOptions:any = {
              expiresIn: 86400 // expires in 24 hours
            };
            // jsonwebtoken (payload, secret, config)
            var token = jwt.sign(JSON.stringify(result.collections[0]), config.app.secret, signOptions);

            res.send(200, {
              'x-user-token' : token
            });

          } else {
            res.send(401);
          }
          return result;
        })
        .catch(function (err) {
          console.log(err);
          res.send(500); // Server error
        })
        .done();

      } else {
        res.send(400);
      }
    });

  app.route('/api/init')
   .get(function(req, res) {

     var mongodb = new MongoDB();

     Q.fcall(function() {
       return mongodb.openConnection(config.app.dev.mongodb)
     })
     .then(function(result:any) {
       return mongodb.dropCollection(result.db, 'Users', '{}');
     })
     .then(function(result:any) {
       return mongodb.dropCollection(result.db, 'Messages', '{}');
     })
     .then(function(result:any) {
       mongodb.closeConnection(result.db)
       return result;
     })
     .then(function(result:any) {
       res.send(200);
     })
     .catch(function (err) {
       console.log(err);
       res.send(500); // Server error
     })
     .done();
  });

  // check auth
  app.use(function(req, res, next) {

   // TODO: Check if Handshake was provided..
   var token = req.body.token || req.query.token || req.headers['x-user-token'];

   // decode token
   if (token) {

     // verifies secret and checks exp
     jwt.verify(token, config.app.secret, function(err, decoded) {
       if (err) {
         return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
       } else {
         // if everything is good, save to request for use in other routes
         // req.decoded = decoded;

         next();
       }
     });

   } else {

     // if there is no token
     // return an error
     return res.status(400).send({
         success: false,
         message: 'No token provided.'
     });

   }
  });


}
