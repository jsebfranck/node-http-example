'use strict';

var should = require('should'),
  client = require('../client/client');

describe('count function', function() {
  it('should return 0', function(done) {
    client.count().then(function(count) {
      count.should.equal(0);
      done();
    });
  });
});
