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

  var request = http.get(options, function(res) {
  	if (res.statusCode != 200) {
  	  deferred.reject(new Error('Service has an invalid status code : ' + res.statusCode));
  	}

    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      var employeesCount = JSON.parse(chunk).count;
      if (! employeesCount) {
      	deferred.reject(new Error('Service did not return employees count'));
      }
      deferred.resolve(employeesCount);
    });
  });

/*
  request.on('socket', function (socket) {
    socket.setTimeout(500);  
    socket.on('timeout', function() {
      console.log('timeout');
      request.abort();
      deferred.reject(new Error('Service response was too long'));
    });
  });*/

  return deferred.promise;
};
