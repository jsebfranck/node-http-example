'use strict';

var should = require('should'),
  nock = require('nock'),
  rewire = require('rewire'),
  client = require('../client/employees.client');

describe('employees count service', function() {
  beforeEach(function() {
    nock.disableNetConnect();
  });

  var whenEmployeesCountIsCalled = function() {
    return nock('http://localhost:3000')
      .get('/employees/count');
  };

  it('should return employees count', function() {
    whenEmployeesCountIsCalled().reply(200, {count:1986});

    client.countEmployees().then(function(count) {
      count.should.equal(1986);
    }).done();
  });

  it('should return an error if reponse is not json', function(done) {
    whenEmployeesCountIsCalled().reply(200, '<count>1986</count>');

    client.countEmployees().then(function(count) {
      done(new Error('method should return an error'));
    }).catch(function() {
      done();
    });
  });

  it('should return an error if http service returns no count', function(done) {
    whenEmployeesCountIsCalled().reply(200, {nb:1986});

    client.countEmployees().then(function() {
      done(new Error('method should return an error'));
    }).catch(function() {
      done();
    });
  });

  it('should return an error if http service is in error', function(done) {
    whenEmployeesCountIsCalled().reply(500, {});

    client.countEmployees().then(function() {
      done(new Error('method should return an error'));
    }).catch(function() {
      done();
    });
  });

  it('should return an error if service is too long', function(done) {
    whenEmployeesCountIsCalled()
      .delayConnection(1500)
      .reply(200, {count:1986});

    client.countEmployees().then(function() {
      done(new Error('method should return an error'));
    }).catch(function() {
    	done();
    });
  });

  it('should return an error if service is unavailable', function(done) {
    nock.enableNetConnect();

    client = rewire('../client/employees.client');
    client.__set__('config', {
      hostname: 'unknownhost.xebia.fr'
    });

    client.countEmployees().then(function() {
      done(new Error('method should return an error'));
    }).catch(function() {
      done();
    });
  });
});
