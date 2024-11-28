import iban from '../../util/iban.js';
import { Given, When, Then } from '@cucumber/cucumber';
import expect from 'expect.js';

Given(/^BBAN (.*)$/, function (bban, callback) {
  this.bban = bban;
  callback();
});

When(/^I convert the bban to IBAN$/, function (callback) {
  this.ibanResult = iban.fromBBAN(this.bban);
  callback();
});

Then(/^the IBAN should be (.*)$/, function (iban, callback) {
  expect(this.ibanResult.iban).to.eql(iban);
  callback();
});

Given(/^the BIC should be (.*)$/, function (bic, callback) {
  expect(this.ibanResult.bic).to.eql(bic);
  callback();
});

