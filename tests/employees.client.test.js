'use strict';

var should = require('should'),
  client = require('../client/employees.client');

describe('employees count service', function() {
  it('should return 0', function(done) {
    client.countEmployees().then(function(count) {
      try {
        count.should.equal(0);
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    });
  });
});
