"use strict";

var iban = require('../../util/iban');

module.exports = function() {
  this.Given(/^BBAN (.*)$/, function (bban, callback) {
    this.bban = bban;
    callback();
  });

  this.When(/^I convert the bban to IBAN$/, function (callback) {
    this.ibanResult = iban.fromBBAN(this.bban);
    callback();
  });

  this.Then(/^the IBAN should be (.*)$/, function (iban, callback) {
    this.ibanResult.iban.should.eql(iban);
    callback();
  });

  this.Given(/^the BIC should be (.*)$/, function (bic, callback) {
    this.ibanResult.bic.should.eql(bic);
    callback();
  });
};
