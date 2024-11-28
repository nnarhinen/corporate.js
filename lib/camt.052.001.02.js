'use strict';
module.exports = camt05200102;

const XMLDom = require('@xmldom/xmldom');
const dom = XMLDom.DOMParser;
const xpath = require('xpath');

function camt05200102(xml) {
  var doc = new dom().parseFromString(xml, XMLDom.MIME_TYPE.XML_APPLICATION),
      select = xpath.useNamespaces({a: 'urn:iso:std:iso:20022:tech:xsd:camt.052.001.02'});

  return {
    reports: select('/a:Document/a:BkToCstmrAcctRpt/a:Rpt', doc).map(parseReport(select))
  };
}

function parseReport(select) {
  return function(elem) {
    return {
      identification: select('a:Id/text()', elem).toString(),
      creationDateTime: select('a:CreDtTm/text()', elem).toString(),
      account: select('a:Acct', elem).map(parseAccount(select))[0],
      balances: select('a:Bal', elem).map(parseBalance(select)),
    };
  };
}

function parseAccount(select) {
  return function(elem) {
    return {
      iban: select('a:Id/a:IBAN/text()', elem).toString(),
      currency: select('a:Ccy/text()', elem).toString(),
      accountOwnerName: select('a:Nm/text()', elem).toString(),
      accountTypeName: select('a:Tp/a:Prtry/text()', elem).toString(),
    };
  };
}

function parseBalance(select) {
  return function(elem) {
    const amount = select('a:Amt', elem)[0];
    const creditDebitIndicator = select('a:CdtDbtInd/text()', elem).toString();
    const amountFactor = creditDebitIndicator === 'CRDT' ? 1 : -1;
    return {
      type: select('a:Tp/a:CdOrPrtry/a:Cd/text()', elem).toString(),
      amountCurrency: amount.getAttribute('Ccy'),
      amount: amountFactor * Number(select('a:Amt/text()', elem).toString()),
      date: select('a:Dt/a:Dt/text()', elem).toString(),
    };
  };
}