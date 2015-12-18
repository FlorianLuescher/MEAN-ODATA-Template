'use strict';
var log4js = require('log4js');
var Logger = (function () {
    function Logger() {
        this.logger = log4js.getLogger();
        this.logger.setLevel('TRACE');
    }
    Logger.prototype.trace = function (message) {
        this.logger.trace(message);
    };
    Logger.prototype.debug = function (message) {
        this.logger.debug(message);
    };
    Logger.prototype.info = function (message) {
        this.logger.info(message);
    };
    Logger.prototype.warn = function (message) {
        this.logger.warn(message);
    };
    Logger.prototype.error = function (message) {
        this.logger.error(message);
    };
    Logger.prototype.fatal = function (message) {
        this.logger.fatal(message);
    };
    return Logger;
})();
module.exports = Logger;
