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
    ret.statusReasonInformation = statusReasonInformation(stsRsnInf[0]); 
  }
  var orgnlPmtInfos = select('/a:Document/a:CstmrPmtStsRpt/a:OrgnlPmtInfAndSts', doc);
  if (orgnlPmtInfos.length) {
    ret.paymentGroups = Array.prototype.map.call(orgnlPmtInfos, function(info) {
      var r = {
        originalPaymentInformationId: select('a:OrgnlPmtInfId/text()', info).toString(),
        paymentInformationStatus: select('a:PmtInfSts/text()', info).toString()
      };
      r.detailedPayments = Array.prototype.map.call(select('a:TxInfAndSts', info), function(txInfo) {
        var tr = {
          originalEndToEndId: select('a:OrgnlEndToEndId/text()', txInfo).toString(),
          status: select('a:TxSts/text()', txInfo).toString()
        };
        var tStsRsnInf = select('a:StsRsnInf', txInfo);
        if (tStsRsnInf[0]) {
          tr.statusReasonInformation = statusReasonInformation(tStsRsnInf[0]);
        }
        return tr;
      });
      var pStsRsnInf = select('a:StsRsnInf', info);
      if (pStsRsnInf[0]) {
        r.statusReasonInformation = statusReasonInformation(pStsRsnInf[0]);
      }
      return r;
    });
  }

  return ret;

  function statusReasonInformation(node) {
    return {
      reasonCode: select('a:Rsn/a:Cd/text()', node).toString(),
      additionalInformation: Array.prototype.map.call(select('a:AddtlInf/text()', node), function(one) { return one.toString(); }).join('')
    };
  }

}
