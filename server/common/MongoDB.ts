'use strict';

var MongoClient = require('mongodb').MongoClient;
import Q = require ('q');

// TODO connect - transaction - close immer in einer methode... -> somit muss db nicht zurückgegeben werden
class MongoDB {

  openConnection(connection:string) {

    var deferred = Q.defer();

    MongoClient.connect(connection, function(err, db) {
      if (err) { throw err }
      console.log("Connected correctly to server");
      var res =  { db : db };
      deferred.resolve(res);
    });

    return deferred.promise;
  }

  /**
   * finds documents in collection
   * @param  {any}    db         connection
   * @param  {string} collection collection name
   * @param  {string} filter     filter (json)
   * @return {[type]}            promise with { db, collections }
   */
  findCollection(db: any, collection:string, filter:any) {

    var deferred = Q.defer();

    var coll = db.collection(collection);
    coll.find(filter).toArray(function(err, result) {
      if (err) { throw err }
      var res =  { db : db , collections : result};
      deferred.resolve(res);
    });

    return deferred.promise;
  }

  /**
   * inserts documents into collection
   * @param  {any}    db         connection
   * @param  {string} collection collection name
   * @param  {any}    objects    Json Array
   * @return {[type]}            promise with { db, collections }
   */
  insertCollection(db: any, collection:string, documents:any) {
    var deferred = Q.defer();

    var coll = db.collection(collection);
    coll.insert(documents, function(err, result) {
      if (err) { throw err }
      var res =  { db : db , collections : result};
      deferred.resolve(res);
    });

    return deferred.promise;
  }

  /**
   * inserts documents into collection
   * @param  {any}    db         connection
   * @param  {string} collection collection name
   * @param  {any}    objects    Json Array
   * @return {[type]}            promise with { db, collections }
   */
  dropCollection(db: any, collection:string, filter:any) {
    var deferred = Q.defer();

    // check if collection exists
    db.collectionNames(collection, function(err, names) {
        if (err) { throw err };

        if (names.length > 0) {

          var coll = db.collection(collection);

          // drop collection
          coll.drop( function(err, result) {
            if (err) { throw err }
            var res =  { db : db , collections : result};
            deferred.resolve(res);
          });
        } else {
          var res =  { db : db , collections : ''};
          deferred.resolve(res);
        }
    });

    return deferred.promise;
  }

  closeConnection(db:any) {
    db.close();
    console.log("Disconnected correctly from server");
  }


}
export = MongoDB;
