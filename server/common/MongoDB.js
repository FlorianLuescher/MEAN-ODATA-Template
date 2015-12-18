'use strict';
var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var MongoDB = (function () {
    function MongoDB() {
    }
    MongoDB.prototype.openConnection = function (connection) {
        var deferred = Q.defer();
        MongoClient.connect(connection, function (err, db) {
            if (err) {
                throw err;
            }
            console.log("Connected correctly to server");
            var res = { db: db };
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    MongoDB.prototype.findCollection = function (db, collection, filter) {
        var deferred = Q.defer();
        var coll = db.collection(collection);
        coll.find(filter).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            var res = { db: db, collections: result };
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    MongoDB.prototype.insertCollection = function (db, collection, documents) {
        var deferred = Q.defer();
        var coll = db.collection(collection);
        coll.insert(documents, function (err, result) {
            if (err) {
                throw err;
            }
            var res = { db: db, collections: result };
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    MongoDB.prototype.dropCollection = function (db, collection, filter) {
        var deferred = Q.defer();
        db.collectionNames(collection, function (err, names) {
            if (err) {
                throw err;
            }
            ;
            if (names.length > 0) {
                var coll = db.collection(collection);
                coll.drop(function (err, result) {
                    if (err) {
                        throw err;
                    }
                    var res = { db: db, collections: result };
                    deferred.resolve(res);
                });
            }
            else {
                var res = { db: db, collections: '' };
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    };
    MongoDB.prototype.closeConnection = function (db) {
        db.close();
        console.log("Disconnected correctly from server");
    };
    return MongoDB;
})();
module.exports = MongoDB;
