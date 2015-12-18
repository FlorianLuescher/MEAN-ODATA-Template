'use strict';

///  <reference path="../../typings/tsd.d.ts"/>

import log4js = require('log4js');

/**
 * Class for logging. Next possible changes could be saving the messages into a database-logtable
 */
class Logger {

  private logger;

  constructor() {
    this.logger = log4js.getLogger();
    this.logger.setLevel('TRACE');
  }

  trace(message: string) {
    this.logger.trace(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  fatal(message: string) {
    this.logger.fatal(message);
  }
}

export = Logger;
