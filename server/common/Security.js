'use strict';
var Security = (function () {
    function Security() {
    }
    Security.prototype.isCollectionProtected = function (url, method) {
        var collection = url.substr(url.lastIndexOf("/"), url.length);
        if (collection.length == 1) {
            var temp = url.substr(0, url.length - 1);
            collection = temp.substr(temp.lastIndexOf("/"), temp.length);
        }
        if (collection.indexOf('Users') > -1) {
            return true;
        }
        return false;
    };
    return Security;
})();
module.exports = Security;
