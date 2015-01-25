'use strict';
var moment = require('moment'),
    _ = require('underscore'),
    sinon = require('sinon'),
    XMLDom = require('xmldom'),
    DOMParser = XMLDom.DOMParser,
    XMLSerializer = new XMLDom.XMLSerializer(),
    corporate = require('../../');

require('should');

module.exports = function() {
  this.Given(/^time is frozen at "([^"]*)"$/, function (arg1, callback) {
    var m = moment(arg1);
    this.clock = sinon.useFakeTimers(Number(m.format('x')));
    callback();
  });

  this.Given(/^payment group "([^"]*)" with due date "([^"]*)" with pending payments$/, function (arg1, arg2, table, callback) {
    if (!this.paymentGroups) this.paymentGroups = {};
    this.paymentGroups[arg1] = {
      dueDate: arg2,
      payments: table.hashes()
    };
    callback();
  });

  this.When(/^I create payment XML "([^"]*)" with debitor information "([^"]*)" \/ "([^"]*)" \/ "([^"]*)" \/ "([^"]*)" including payment groups$/, function (messageId, arg1, arg2, arg3, arg4, table, callback) {
    var paymentGroups = table.hashes().map(function(r) { return r['payment-group']; });
    this.xml = corporate.pain00100103(
      messageId,
      {
        name: arg1,
        contractId: arg2,
        iban: arg3,
        bic: arg4
      }, _.pick(this.paymentGroups, paymentGroups)
    );
    callback();
  });

  this.Then(/^the XML should be$/, function (string, callback) {
    var doc = new DOMParser().parseFromString(string),
        expected = XMLSerializer.serializeToString(doc);
    XMLSerializer.serializeToString(new DOMParser().parseFromString(this.xml)).should.equal(expected);
    callback();
  });

  this.After(function(cb) {
    if (this.clock) this.clock.restore();
    cb();
  });

  this.Given(/^xml payload:$/, function (string, callback) {
    this.xml = string;
    callback();
  });

  this.When(/^I parse the xml payload as pain\.002\.001\.03$/, function (callback) {
    this.parsedResult = corporate.pain00200103(this.xml);
    callback();
  });


  this.When(/^I parse the xml payload as camt\.053\.001\.02$/, function (callback) {
    this.parsedResult = corporate.camt05300102(this.xml);
    callback();
  });

  this.Then(/^the result hash map should be$/, function (string, callback) {
    var expected = eval('(' + string + ')');
    this.parsedResult.should.eql(expected);
    callback();
  }); 
};
