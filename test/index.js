"use strict";

var should = require('chai').should();
var anumacore = require('../');

describe('#versionGuard', function() {
  it('global._anumacoreLibVersion should be defined', function() {
    should.equal(global._anumacoreLibVersion, anumacore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      anumacore.versionGuard('version');
    }).should.throw('More than one instance of bitcore');
  });
});
