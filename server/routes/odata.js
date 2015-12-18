'use strict';
var Security = require('../common/Security');
var $data = require('jaydata');
module.exports = function (app) {
    var security = new Security();
    app.use("/api/odata", function (req, res, next) {
        if (security.isCollectionProtected(req.url, req.method)) {
            res.send(403);
        }
        else {
            next();
        }
    });
    require('../common/odata_model.js');
    app.use("/api/odata", $data.JayService.OData.Utils.simpleBodyReader());
    app.use("/api/odata", $data.JayService.createAdapter(nodejstemplate.Context, function (req, res) {
        return new nodejstemplate.Context({ name: "mongoDB", databaseName: "nodejstemplate", address: "localhost", port: 27017 });
    }));
};
