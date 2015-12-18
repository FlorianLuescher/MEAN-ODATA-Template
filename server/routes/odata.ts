'use strict';

///  <reference path="../../typings/tsd.d.ts"/>

import Security = require('../common/Security');
var $data = require('jaydata');

declare var nodejstemplate:any; // declaration to remove warnings from TypeScript

module.exports = function(app) {

  var security:Security = new Security();

  // start odata
  app.use("/api/odata", function (req, res, next) {
    if (security.isCollectionProtected(req.url, req.method)) {
      res.send(403); // forbidden
    } else {
      next();
    }
  });

  // attention: it is not possible to combine socket.io and odata
  // the client has to check if response is ok and afterwards send a trigger

  require('../common/odata_model.js'); // model
  app.use("/api/odata", $data.JayService.OData.Utils.simpleBodyReader());
  app.use("/api/odata", $data.JayService.createAdapter(nodejstemplate.Context, function (req, res) {
    return new nodejstemplate.Context({name: "mongoDB", databaseName:"nodejstemplate", address: "localhost", port: 27017 });
  }));

}
