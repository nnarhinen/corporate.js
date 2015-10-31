"use strict";
module.exports = parseTito;

var XRegExp = require('xregexp');


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
                              '(?<startBalanceDate>               [0-9] {6}  )' +
                              '(?<startBalanceSign>               .     {1}  )' +
                              '(?<startBalance>                   [0-9] {18} )' +
                              '(?<devnull>                        .     {6}  )' +
                              '(?<currency>                       .     {3}  )' +
                              '(?<accountName>                    .     {30} )' +
                              '(?<devnull2>                       .     {18} )' +
                              '(?<accountOwnerName>               .     {35} )' +
                              '(?<bankContactInformation>         .     {40} )' +
                              '(?<bankContactInformationDetails>  .     {40} )' +
                              '(?<devnull3>                       .     {30} )' +
                              '(?<iban>                           .     {18} ) \\ ' +
                              '(?<bic>                            .     {8}  )', 'x');

var entryInfoRe = new XRegExp('^T10' +
                              '(?<infoLength>         .     {3}  )' +
                              '(?<entryNumber>        [0-9] {6}  )' +
                              '(?<archiveId>          .     {18} )' +
                              '(?<bookingDate>        [0-9] {6}  )' +
                              '(?<valueDate>          [0-9] {6}  )' +
                              '(?<paymentDate>        [0-9] {6}  ) (.) ' +
                              '(?<bookingInformation> .     {38} )' +
                              '(?<sign>               .     {1}  )' +
                              '(?<amount>             [0-9] {18} )' +
                              '(?<devnull>            .     {2}  )' +
                              '(?<receiver>           .     {35} ) (.)' +
                              '(?<receiverBban>       .     {14} ) (.)' +
                              '(?<referenceNumber>    .     {20} )', 'x');

var additionalEntryInfoRe = new XRegExp('^T11' +
                                        '(?<infoLength> [0-9] {3} )' +
                                        '(?<infoType>   .     {2} )', 'x');

var balanceRe = new XRegExp('^T40' +
                            '(?<infoLength>          .     {3}  )' +
                            '(?<bookingDate>         [0-9] {6}  )' +
                            '(?<amountSign>          .     {1}  )' +
                            '(?<amount>              [0-9] {18} )' +
                            '(?<availableAmountSign> .     {1}  )' +
                            '(?<availableAmount>     [0-9] {18} )', 'x');

var summaryRe = new XRegExp('^T50' +
                            '(?<infoLength>           .     {3}  )' +
                            '(?<summaryType>          .     {1}  )' +
                            '(?<summaryDate>          [0-9] {6}  )' +
                            '(?<depositCount>         [0-9] {8}  )' +
                            '(?<depositAmountSign>    .     {1}  )' +
                            '(?<depositAmount>        [0-9] {18} )' +
                            '(?<withdrawalCount>      [0-9] {8}  )' +
                            '(?<withdrawalAmountSign> .     {1}  )' +
                            '(?<withdrawalAmount>     [0-9] {18} )', 'x');

function parseTito(txt) {
  var headerInfo,
      entries = [],
      balances = [],
      summaries = [];
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
        statementNumber: m.statementNumber,
        startBalanceDate: stringToDateString(m.startBalanceDate),
        startBalance: Number(m.startBalance) / 100 * (m.startBalanceSign === '-' ? -1 : 1)
      };
    } else if (entryInfoRe.test(line)) {
      m = XRegExp.exec(line, entryInfoRe);
      entries.push({
        additionalInformation: [],
        amount: Number(m.amount) / 100 * (m.sign === '-' ? -1 : 1),
        archiveId: m.archiveId.trim(),
        bookingDate: stringToDateString(m.bookingDate),
        bookingInformation: m.bookingInformation.trim(),
        paymentDate: stringToDateString(m.paymentDate),
        receiver: m.receiver.trim(),
        receiverBban: m.receiverBban.trim(),
        referenceNumber: m.referenceNumber.trim() ? parseInt(m.referenceNumber, 10) + '' : '',
        valueDate: stringToDateString(m.valueDate),
        id: Number(m.entryNumber)
      });
    } else if (additionalEntryInfoRe.test(line)) {
      m = XRegExp.exec(line, additionalEntryInfoRe);
      var entry = entries[entries.length - 1];
      if (['00', '07', '06', '08'].indexOf(m.infoType) !== -1 ) {
        var totalLength = Number(m.infoLength), parts = [];
        for (var i = 8; i < totalLength; i=i+35) {
          parts.push(line.substring(i, i+35).trim());
        }
        entry.additionalInformation.push(parts.join(' '));
      }
    } else if (balanceRe.test(line)) {
      m = XRegExp.exec(line, balanceRe);
      balances.push({
        bookingDate: stringToDateString(m.bookingDate),
        amount: Number(m.amount) / 100 * (m.amountSign === '-' ? -1 : 1),
        availableAmount: Number(m.availableAmount) / 100 * (m.availableAmountSign === '-' ? -1 : 1)
      });
    } else if (summaryRe.test(line)) {
      m = XRegExp.exec(line, summaryRe);
      summaries.push({
        depositAmount: Number(m.depositAmount) / 100 * (m.depositAmountSign === '-' ? -1 : 1),
        depositCount: Number(m.depositCount),
        summaryDate: stringToDateString(m.summaryDate),
        summaryType: m.summaryType,
        withdrawalAmount: Number(m.withdrawalAmount) / 100 * (m.withdrawalAmountSign === '-' ? -1 : 1),
        withdrawalCount: Number(m.withdrawalCount)
      });
    }
  });
  return {
    header: headerInfo,
    entries: entries,
    balances: balances,
    transactionSummaries: summaries
  };
}

function stringToDateString(str) {
  if (str === '000000') return '0000-00-00';
  var parts = str.match(/.{1,2}/g);
  return '20' + parts[0] + '-' + parts[1] + '-' + parts[2];
}
