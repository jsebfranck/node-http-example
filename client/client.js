'use strict';

var Q = require('Q');

exports.count = function() {
  var deferred = Q.defer();

  deferred.resolve(0);

  return deferred.promise;
};
