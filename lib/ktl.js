"use strict";
module.exports = parseKtl;

var trimRefNumber = require('../util/trimrefnumber');

var XRegExp = require('xregexp');


var basicInfoRe = new XRegExp('^0' +
                              '(?<creationDate>                   [0-9] {6}  )' +
                              '(?<creationTime>                   [0-9] {4}  )' +
                              '(?<devnull>                        .     {2}  )' +
                              '(?<contractId>                     .     {9}  )' +
                              '(?<currencyId>                     .     {1}  )' +
                              '(?<bankAccountOwnerId>             .     {9}  )', 'x');

var entryInfoRe = new XRegExp('^3' +
                              '(?<bban>               .     {14} )' +
                              '(?<bookingDate>        [0-9] {6}  )' +
                              '(?<paymentDate>        [0-9] {6}  )' +
                              '(?<archiveId>          .     {16} )' +
                              '(?<referenceNumber>    .     {20} )' +
                              '(?<payerShortName>     .     {12} )' +
                              '(?<currencyId>         .     {1}  )' +
                              '(?<devnull>            .     {1}  )' +
                              '(?<amount>             [0-9] {10} )', 'x');


function parseKtl(txt) {
  var headerInfo,
      entries = [];
  txt.split("\n").forEach(function(line) {
    line = line.replace(/\}/g, 'å')
               .replace(/{/g, 'ä')
               .replace(/\|/g, 'ö')
               .replace(/\]/g, 'Å')
               .replace(/\[/g, 'Ä')
               .replace(/\\/g, 'Ö');
    var m;
    if (basicInfoRe.test(line)) {
      m = XRegExp.exec(line, basicInfoRe);
      headerInfo = {
        contractId: m.contractId.trim(),
        creationDate: stringToDateString(m.creationDate),
        creationTime: m.creationTime.substring(0,2) + ':' + m.creationTime.substring(2, 4),
        currencyId: m.currencyId,
        currency: m.currencyId === '1' ? 'EUR' : '',
        bankAccountOwnerId: m.bankAccountOwnerId.trim()
      };
    } else if (entryInfoRe.test(line)) {
      m = XRegExp.exec(line, entryInfoRe);
      entries.push({
        amount: Number(m.amount) / 100 * (m.sign === '-' ? -1 : 1),
        bban: m.bban,
        archiveId: m.archiveId.trim(),
        bookingDate: stringToDateString(m.bookingDate),
        paymentDate: stringToDateString(m.paymentDate),
        referenceNumber: trimRefNumber(m.referenceNumber),
        currencyId: m.currencyId,
        currency: m.currencyId === '1' ? 'EUR' : '',
        payerShortName: m.payerShortName.trim()
      });
    }
  });
  return {
    header: headerInfo,
    entries: entries
  };
}

function stringToDateString(str) {
  if (str === '000000') return '0000-00-00';
  var parts = str.match(/.{1,2}/g);
  return '20' + parts[0] + '-' + parts[1] + '-' + parts[2];
}
