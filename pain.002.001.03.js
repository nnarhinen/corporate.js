'use strict';
module.exports = pain00200103;

var dom = require('xmldom').DOMParser,
    xpath = require('xpath');

function pain00200103(str) {
  var doc = new dom().parseFromString(str),
      select = xpath.useNamespaces({
        a: 'urn:iso:std:iso:20022:tech:xsd:pain.002.001.03'
      }),
      ret = {};

  ret.originalMessageIdentification = select('/a:Document/a:CstmrPmtStsRpt/a:OrgnlGrpInfAndSts/a:OrgnlMsgId/text()', doc).toString();
  ret.originalMessageNameIdentification = select('/a:Document/a:CstmrPmtStsRpt/a:OrgnlGrpInfAndSts/a:OrgnlMsgNmId/text()', doc).toString();
  ret.groupStatus = select('/a:Document/a:CstmrPmtStsRpt/a:OrgnlGrpInfAndSts/a:GrpSts/text()', doc).toString();
  var stsRsnInf = select('/a:Document/a:CstmrPmtStsRpt/a:OrgnlGrpInfAndSts/a:StsRsnInf', doc);
  if (stsRsnInf[0]) {
    ret.statusReasonInformation = {
      reasonCode: select('a:Rsn/a:Cd/text()', stsRsnInf[0]).toString(),
      additionalInformation: Array.prototype.map.call(select('a:AddtlInf/text()', stsRsnInf[0]), function(one) { return one.toString(); }).join('')
    };
  }

  return ret;
}
