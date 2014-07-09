'use strict';

var should = require('should'),
  nock = require('nock'),
  client = require('../client/employees.client');

describe('employees count service', function() {
  beforeEach(function() {
    nock.disableNetConnect();
  });

  it('should return employees count', function(done) {
    nock('http://localhost:3000')
      .get('/employees/count')
      .reply(200, {count:1986});

    client.countEmployees().then(function(count) {
      try {
        count.should.equal(1986);
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    });
  });

  it('should return an error if http service returns no count', function(done) {
    nock('http://localhost:3000')
      .get('/employees/count')
      .reply(200, {nb:1986});

    client.countEmployees().then(function(count) {
      done(new Error('method should return an error'));
    }).catch(function(err) {
      done();
    });
  });

  it('should return an error if http service is in error', function(done) {
    nock('http://localhost:3000')
      .get('/employees/count')
      .reply(500, {});

    client.countEmployees().then(function(count) {
      done(new Error('method should return an error'));
    }).catch(function(err) {
      done();
    });
  });
});
