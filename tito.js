"use strict";
module.exports = parseTito;

var XRegExp = require('xregexp'),
    lazy = require('lazy.js');


    var basicInfoRe = new XRegExp('^T00' +
                                  '(?<infoLength>                     .     {3}  )' +
                                  '(?<version>                        .     {3}  )' +
                                  '(?<bban>                           .     {14} )' +
                                  '(?<statementNumber>                [0-9] {3}  )' +
                                  '(?<startDate>                      [0-9] {6}  )' +
                                  '(?<endDate>                        [0-9] {6}  )' +
                                  '(?<creationDate>                   [0-9] {6}  )' +
                                  '(?<creationTime>                   [0-9] {4}  )' +
                                  '(?<contractId>                     .     {17} )' +
                                  '(?<devnull>                        .     {31} )' +
                                  '(?<currency>                       .     {3}  )' +
                                  '(?<accountName>                    .     {30} )' +
                                  '(?<devnull2>                       .     {18} )' +
                                  '(?<accountOwnerName>               .     {35} )' +
                                  '(?<bankContactInformation>        .     {40} )' +
                                  '(?<bankContactInformationDetails> .     {40} )' +
                                  '(?<devnull3>                       .     {30} )' +
                                  '(?<iban>                           .     {18} ) \\ ' +
                                  '(?<bic>                            .     {8}  )', 'x');


function parseTito(txt) {
  var headerInfo;
  txt.split("\n").map(function(line) {
    if (basicInfoRe.test(line)) {
      var m = XRegExp.exec(line, basicInfoRe);
      headerInfo = {
        accountName: m.accountName.trim(),
        accountOwnerName: m.accountOwnerName.trim(),
        bankContactInformation: m.bankContactInformation.trim(),
        bankContactInformationDetails: m.bankContactInformationDetails.trim(),
        bban: m.bban,
        bic: m.bic,
        contractId: m.contractId.trim(),
        creationDate: stringToDateString(m.creationDate),
        creationTime: m.creationTime.substring(0,2) + ':' + m.creationTime.substring(2, 4),
        currency: m.currency,
        endDate: stringToDateString(m.endDate),
        iban: m.iban,
        startDate: stringToDateString(m.startDate),
        statementNumber: m.statementNumber
      };
    }
  });
  return {
    header: headerInfo
  };
}

function stringToDateString(str) {
  var parts = str.match(/.{1,2}/g);
  return '20' + parts[0] + '-' + parts[1] + '-' + parts[2];
}
