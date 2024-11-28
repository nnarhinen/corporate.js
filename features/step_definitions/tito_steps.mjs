import corporate from '../../index.js';
import { Given, When } from '@cucumber/cucumber';

Given(/^string content$/, function (string, callback) {
  this.text = string;
  callback();
});
When(/^I parse the file as TITO$/, function (callback) {
  this.parsedResult = corporate.tito(this.text);
  callback();
});
When(/^I parse the file as KTL$/, function (callback) {
  this.parsedResult = corporate.ktl(this.text);
  callback();
});
