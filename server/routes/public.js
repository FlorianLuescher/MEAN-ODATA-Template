'use strict';
var Q = require('q');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
var MongoDB = require('../common/MongoDB');
var config = require('../config.json');
module.exports = function (app) {
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, X-HTTP-Method-Override, Accept, x-access-token, x-user-token');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            res.send(200);
        }
        else {
            next();
        }
    });
    app.get('/', function (req, res) {
        res.render('index', { title: 'Home' });
    });
    app.route('/api/register')
        .post(function (req, res) {
        if (typeof req.body.user !== 'undefined' && req.body.user &&
            typeof req.body.password !== 'undefined' && req.body.password) {
            var user = req.body.user;
            var password = CryptoJS.SHA3(req.body.password).toString();
            var mongodb = new MongoDB();
            Q.fcall(function () {
                return mongodb.openConnection(config.app.dev.mongodb);
            })
                .then(function (result) {
                return mongodb.insertCollection(result.db, 'Users', [{ "user": user, "password": password }]);
            })
                .then(function (result) {
                mongodb.closeConnection(result.db);
                return result;
            })
                .then(function (result) {
                var signOptions = {
                    expiresIn: 86400
                };
                console.log(JSON.stringify(result.collections[0]));
                var token = jwt.sign(JSON.stringify(result.collections[0]), config.app.secret, signOptions);
                res.send(200, {
                    'x-user-token': token
                });
            })
                .catch(function (err) {
                console.log(err);
                res.send(500);
            })
                .done();
        }
        else {
            res.send(400);
        }
    });
    app.route('/api/auth')
        .post(function (req, res) {
        if (typeof req.body.user !== 'undefined' && req.body.user &&
            typeof req.body.password !== 'undefined' && req.body.password) {
            var user = req.body.user;
            var password = CryptoJS.SHA3(req.body.password).toString();
            var mongodb = new MongoDB();
            Q.fcall(function () {
                return mongodb.openConnection(config.app.dev.mongodb);
            })
                .then(function (result) {
                return mongodb.findCollection(result.db, 'Users', { "user": user, "password": password });
            })
                .then(function (result) {
                mongodb.closeConnection(result.db);
                return result;
            })
                .then(function (result) {
                if (result.collections.length > 0) {
                    var signOptions = {
                        expiresIn: 86400
                    };
                    var token = jwt.sign(JSON.stringify(result.collections[0]), config.app.secret, signOptions);
                    res.send(200, {
                        'x-user-token': token
                    });
                }
                else {
                    res.send(401);
                }
                return result;
            })
                .catch(function (err) {
                console.log(err);
                res.send(500);
            })
                .done();
        }
        else {
            res.send(400);
        }
    });
    app.route('/api/init')
        .get(function (req, res) {
        var mongodb = new MongoDB();
        Q.fcall(function () {
            return mongodb.openConnection(config.app.dev.mongodb);
        })
            .then(function (result) {
            return mongodb.dropCollection(result.db, 'Users', '{}');
        })
            .then(function (result) {
            return mongodb.dropCollection(result.db, 'Messages', '{}');
        })
            .then(function (result) {
            mongodb.closeConnection(result.db);
            return result;
        })
            .then(function (result) {
            res.send(200);
        })
            .catch(function (err) {
            console.log(err);
            res.send(500);
        })
            .done();
    });
    app.use(function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-user-token'];
        if (token) {
            jwt.verify(token, config.app.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
                }
                else {
                    next();
                }
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
};
