'use strict';
var builder = require('xmlbuilder'),
    moment = require('moment'),
    _ = require('underscore');

module.exports = pain00100103;

function pain00100103(messageId, debitorInfo, paymentGroups) {
  var xml = builder.create('Document', {encoding: 'UTF-8'});
  xml.attribute('xmlns', 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.03');
  xml.attribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
  xml.attribute('xsi:schemaLocation', 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.03 pain.001.001.03.xsd');

  //<CstmrCdtTrfInitn>
  var cstmrCdt = xml.ele('CstmrCdtTrfInitn');
  //  <GrpHdr>
  var grpHdr = cstmrCdt.ele('GrpHdr');
  grpHdr.ele('MsgId', {}, messageId);
  grpHdr.ele('CreDtTm', {}, moment().format('YYYY-MM-DD[T]HH:mm:ss'));
  grpHdr.ele('NbOfTxs', {}, _.values(paymentGroups).map(function(one) { return one.payments.length; }).reduce(function(memo, one) { return memo + one; }, 0));
  grpHdr.ele('CtrlSum', {}, _.values(paymentGroups).map(function(one) { return one.payments.reduce(function(m, o) { return m + Number(o.sum); }, 0); }).reduce(function(memo, one) { return memo + one; }, 0).toFixed(2));
  var othr = grpHdr.ele('InitgPty').ele('Id').ele('OrgId').ele('Othr');
  othr.ele('Id', {}, debitorInfo.contractId);
  othr.ele('SchmeNm').ele('Cd', {}, 'BANK');
  //  </GrpHdr>
  //  <PmtInf> ([1..n])
  _.pairs(paymentGroups).forEach(function(p) {
    var paymentGroupId = p[0], paymentGroup = p[1];
    var pmtInf = cstmrCdt.ele('PmtInf');
    pmtInf.ele('PmtInfId', {}, paymentGroupId);
    pmtInf.ele('PmtMtd', {}, 'TRF');
    pmtInf.ele('ReqdExctnDt', {}, paymentGroup.dueDate);
    var dbtr = pmtInf.ele('Dbtr');
    dbtr.ele('Nm', {}, debitorInfo.name);
    if (debitorInfo.country) dbtr.ele('PstlAdr').ele('Ctry', {}, debitorInfo.country);
    var orgId = dbtr.ele('Id').ele('OrgId');
    orgId.ele('BICOrBEI', {}, debitorInfo.bic);
    var othr = orgId.ele('Othr');
    othr.ele('Id', {}, debitorInfo.contractId);
    othr.ele('SchmeNm').ele('Cd', {}, 'BANK');
    pmtInf.ele('DbtrAcct').ele('Id').ele('IBAN', {}, debitorInfo.iban);
    pmtInf.ele('DbtrAgt').ele('FinInstnId').ele('BIC', {}, debitorInfo.bic);

    paymentGroup.payments.forEach(function(payment) {
      var trxInf = pmtInf.ele('CdtTrfTxInf');
      trxInf.ele('PmtId').ele('EndToEndId', {}, payment.endToEndId);
      trxInf.ele('Amt').ele('InstdAmt', {Ccy: payment.currency}, payment.sum);
      trxInf.ele('CdtrAgt').ele('FinInstnId').ele('BIC', {}, payment.bic);
      trxInf.ele('Cdtr').ele('Nm', {}, payment.name);
      trxInf.ele('CdtrAcct').ele('Id').ele('IBAN', {}, payment.iban);
      var rmtInf = trxInf.ele('RmtInf');
      if (payment.rfReferenceNumber || payment.referenceNumber) {
        var cdtrRefInf = rmtInf.ele('Strd').ele('CdtrRefInf');
        var tp = cdtrRefInf.ele('Tp');
        tp.ele('CdOrPrtry').ele('Cd', {}, 'SCOR');
        if (payment.rfReferenceNumber) tp.ele('Issr', {}, 'ISO');
        cdtrRefInf.ele('Ref', {}, payment.rfReferenceNumber || payment.referenceNumber);
      } else {
        rmtInf.ele('Ustrd', {}, payment.unstructuredMessage);
      }
    });
  });
  return xml.end({pretty: true});
}
