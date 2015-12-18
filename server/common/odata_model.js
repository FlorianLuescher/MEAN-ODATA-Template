'use strict';
var $data = require('jaydata');
$data.Class.define("nodejstemplate.Messages", $data.Entity, null, {
    id: { type: "id", key: true, computed: true, nullable: false },
    created_by: { type: "string" },
    created_at: { type: Date, default: Date.now },
    message: { type: "string" }
}, null);
$data.Class.define("nodejstemplate.Users", $data.Entity, null, {
    id: { type: "id", key: true, computed: true, nullable: false },
    user: { type: "string" },
    password: { type: "string" }
}, null);
$data.Class.defineEx("nodejstemplate.Context", [$data.EntityContext, $data.ServiceBase], null, {
    Messages: { type: $data.EntitySet, elementType: nodejstemplate.Messages },
    Users: { type: $data.EntitySet, elementType: nodejstemplate.Users }
});
exports = nodejstemplate.Context;
