"use strict";

var _ = require('underscore'),
    big = require('big.js');

var iban = {};

iban.fromBBAN = function(bban, country, finnishBic) {
  if (!country) {
    country = 'FI';
    finnishBic = true;
  }
  if (/-/.test(bban)) bban = convertToMachingeLanguageFormat(bban);
  var tmp = bban + country + '00';
  var re = new RegExp(Object.keys(conversionTable()).join('|'), 'g');
  tmp = tmp.replace(re, function(matched) {
    return conversionTable()[matched];
  });
  var check = big('98').minus(big(tmp).mod(97)).toString();
  if (check.length < 2) check = '0' + check;
  return {
    iban: country + check + bban,
    bic: finnishBic ? iban.finnishBICByIBAN(country+check+bban) : null
  };
};

iban.finnishBICByIBAN = function(iban) {
  var threeFirst = Number(iban.substring(4,7));
  if (threeFirst === 405 || threeFirst === 497) return 'HELSFIHH';
  if (threeFirst >= 470 && threeFirst <= 479) return 'POPFFI22';
  if (threeFirst === 713) return 'CITIFIHX';
  if ([715,400,402,403]
      .concat(_.range(406,409))
      .concat(_.range(410,413))
      .concat(_.range(414, 422))
      .concat(_.range(423,433))
      .concat(_.range(435,453))
      .concat(_.range(454,465))
      .concat(_.range(483,494))
      .concat(_.range(495,497)).indexOf(threeFirst) !== -1) return 'ITELFIHH';

  var twoFirst = Number(iban.substring(4,6));
  if (twoFirst === 34) return 'DABAFIHX';
  if (twoFirst === 37) return 'DNBAFIHX';
  if (twoFirst === 31) return 'HANDFIHH';
  if (twoFirst === 33) return 'ESSEFIHX';
  if (twoFirst === 39 || twoFirst == 36) return 'SBANFIHH';
  if (twoFirst === 38) return 'SWEDFIHH';

  var first = Number(iban.substring(4,5));
  if (first === 8) return 'DABAFIHH';
  if (first === 1 || first === 2) return 'NDEAFIHH';
  if (first === 5) return 'OKOYFIHH';
  if (first === 6) return 'AABAFI22';
};


function conversionTable() {
  return _.object(_.range(10, 36).map(function(c) {
    return [String.fromCharCode(c+55), c];
  }));
}

function convertToMachingeLanguageFormat(input) {
  var parts = input.split('-');
  if (parts.length !== 2) throw new Error('Invalid syntax');
  if (/^(4|5)/.test(input)) {
    parts = [ parts[0] + parts[1][0], parts[1].substring(1)];
  }
  while (parts[0].length + parts[1].length < 14) {
    parts[1] = '0' + parts[1];
  }
  return parts.join('');
}

module.exports = iban;
