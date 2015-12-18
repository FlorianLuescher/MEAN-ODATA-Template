'use strict';

///  <reference path="../../typings/tsd.d.ts"/>


/**
 * Class for API Security
 */
class Security {

  // return true if collection has to be protected
  isCollectionProtected(url: string, method: string) {
    var collection = url.substr(url.lastIndexOf("/"), url.length);

    if (collection.length == 1) {
      var temp = url.substr(0, url.length -1 );
      collection = temp.substr(temp.lastIndexOf("/"), temp.length);
    }

    // protect collection regardless of method
    if (collection.indexOf('Users') > -1) {
      return true;
    }

    return false;
  }

}

export = Security;
