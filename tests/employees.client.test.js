'use strict';

var should = require('should'),
  client = require('../client/employees.client');

describe('employees count service', function() {
  it('should return 1200', function(done) {
    client.countEmployees().then(function(count) {
      try {
        count.should.equal(1200);
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    });
  });
});
