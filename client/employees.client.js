'use strict';

var Q = require('Q'),
  http = require('http');

exports.countEmployees = function() {
  var deferred = Q.defer();

  var options = {
    hostname: 'localhost',
	port: 3000,
	path: '/employees/count'
  };

  http.get(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      var employeesCount = JSON.parse(chunk).count;
      if (! employeesCount) {
      	deferred.reject(new Error('Service did not return employees count'));
      }
      deferred.resolve(employeesCount);
    });
  });

  return deferred.promise;
};
