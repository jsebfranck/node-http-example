'use strict';

var Q = require('Q');

exports.countEmployees = function() {
  var deferred = Q.defer();

  deferred.resolve(0);

  return deferred.promise;
};
