'use strict';
var request = require('request');
exports['http-ping'] = function (test) {
    request('http://localhost:3000/', function (error, response, body) {
        test.equals(response.statusCode, 200);
        test.done();
    });
};
exports['http-init'] = function (test) {
    request('http://localhost:3000/api/init', function (error, response, body) {
        test.equals(response.statusCode, 200);
        test.done();
    });
};
exports['http-auth-false'] = function (test) {
    request('http://localhost:3000/api/odata/$metadata', function (error, response, body) {
        test.equals(response.statusCode, 400);
        var postData = {
            user: 'florian',
            password: 'abcd#'
        };
        var options = {
            method: 'post',
            body: postData,
            json: true,
            url: 'http://localhost:3000/api/auth'
        };
        request(options, function (err, res, body) {
            test.equals(res.statusCode, 401);
            test.done();
        });
    });
};
exports['http-auth-true'] = function (test) {
    var postData = {
        user: 'florian',
        password: 'abcd#'
    };
    var options = {
        method: 'post',
        body: postData,
        json: true,
        url: 'http://localhost:3000/api/register',
        headers: { 'x-user-token': '' }
    };
    request(options, function (err, res, body) {
        test.equals(res.statusCode, 200);
        test.notEqual(typeof body, 'undefined');
        options.url = 'http://localhost:3000/api/auth';
        request(options, function (err, res, body) {
            test.equals(res.statusCode, 200);
            test.notEqual(typeof body, 'undefined');
            var options = {
                url: 'http://localhost:3000/api/odata/$metadata',
                headers: {
                    'x-user-token': body['x-user-token']
                }
            };
            request(options, function (error, response, body) {
                test.equals(response.statusCode, 200);
                test.done();
            });
        });
    });
};
