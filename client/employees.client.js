'use strict';

var Q = require('Q'),
  request = require('request'),
  config = require('./config');

exports.countEmployees = function() {
  var deferred = Q.defer();

  var options = {
    url: config.employeeCountUrl,
    json: true,
    timeout: 500
  };

  request(options, function (error, response, body) {
    if (error) {
      deferred.reject(error);
      return;
    }

    if (response.statusCode >= 300) {
      deferred.reject(new Error('Service has an invalid status code : ' + response.statusCode));
    }

    var employeesCount = body.count;
    if (!employeesCount) {
      deferred.reject(new Error('Service did not return employees count'));
    }

    deferred.resolve(employeesCount);
  });

  return deferred.promise;
};
