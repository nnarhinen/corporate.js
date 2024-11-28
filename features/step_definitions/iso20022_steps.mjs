import { Given, When, Then, After } from '@cucumber/cucumber';
import corporate from '../../lib/../index.js';
import _ from 'underscore';
import sinon from 'sinon';
import XMLDom from '@xmldom/xmldom';
import expect from 'expect.js';
import moment from 'moment';

const DOMParser = XMLDom.DOMParser;
const XMLSerializer = XMLDom.XMLSerializer;

Given(/^time is frozen at "([^"]*)"$/, function (arg1, callback) {
  var m = moment(arg1);
  this.clock = sinon.useFakeTimers(Number(m.format('x')));
  callback();
});

Given(/^payment group "([^"]*)" with due date "([^"]*)" with pending payments$/, function (arg1, arg2, table, callback) {
  if (!this.paymentGroups) this.paymentGroups = {};
  this.paymentGroups[arg1] = {
    dueDate: arg2,
    payments: table.hashes()
  };
  callback();
});

When(/^I create payment XML "([^"]*)" with debitor information "([^"]*)" \/ "([^"]*)" \/ "([^"]*)" \/ "([^"]*)" including payment groups$/, function (messageId, arg1, arg2, arg3, arg4, table, callback) {
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

Then(/^the XML should be$/, function (string, callback) {
  var doc = new DOMParser().parseFromString(string, XMLDom.MIME_TYPE.XML_APPLICATION),
      expected = new XMLSerializer().serializeToString(doc);
  expect(new XMLSerializer().serializeToString(new DOMParser().parseFromString(this.xml, XMLDom.MIME_TYPE.XML_APPLICATION))).to.equal(expected);
  callback();
});

After(async function() {
  if (this.clock) this.clock.restore();
});

Given(/^xml payload:$/, function (string, callback) {
  this.xml = string;
  callback();
});

When(/^I parse the xml payload as pain\.002\.001\.03$/, function (callback) {
  this.parsedResult = corporate.pain00200103(this.xml);
  callback();
});


When(/^I parse the xml payload as camt\.053\.001\.02$/, function (callback) {
  this.parsedResult = corporate.camt05300102(this.xml);
  callback();
});

When(/^I parse the xml payload as camt\.054\.001\.02$/, function (callback) {
  this.parsedResult = corporate.camt05400102(this.xml);
  callback();
});

When(/^I parse the xml payload as camt\.052\.001\.02$/, function (callback) {
  this.parsedResult = corporate.camt05200102(this.xml);
  callback();
});

Then(/^the result hash map should be$/, function (string, callback) {
  var expected = eval('(' + string + ')');
  expect(this.parsedResult).to.eql(expected);
  callback();
}); 
