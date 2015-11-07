"use strict";

var corporate = require('../../');

module.exports = function() {
  this.Given(/^string content$/, function (string, callback) {
    this.text = string;
    callback();
  });
  this.When(/^I parse the file as TITO$/, function (callback) {
    this.parsedResult = corporate.tito(this.text);
    callback();
  });
  this.When(/^I parse the file as KTL$/, function (callback) {
    this.parsedResult = corporate.ktl(this.text);
    callback();
  });
};
