'use strict';
module.exports = camt05400102;

const XMLDom = require('@xmldom/xmldom');
const dom = XMLDom.DOMParser;
const xpath = require('xpath');

function parseEntry(select) {
  return function(elem) {
    return {
      entryReference: select('a:NtryRef/text()', elem).toString(),
      amount: Number(select('a:Amt/text()', elem).toString()),
      amountCurrency: select('a:Amt', elem)[0].getAttribute('Ccy').toString(),
      creditDebitIndicator: select('a:CdtDbtInd/text()', elem).toString(),
      status: select('a:Sts/text()', elem).toString(),
      bookingDate: select('a:BookgDt/a:Dt/text()', elem).toString(),
      valueDate: select('a:ValDt/a:Dt/text()', elem).toString(),
      accountServicerReference: select('a:AcctSvcrRef/text()', elem).toString(),
      bankTransactionCode: {
        domainCode: select('a:BkTxCd/a:Domn/a:Cd/text()', elem).toString(),
        domainFamilyCode: select('a:BkTxCd/a:Domn/a:Fmly/a:Cd/text()', elem).toString(),
        domainSubFamilyCode: select('a:BkTxCd/a:Domn/a:Fmly/a:SubFmlyCd/text()', elem).toString(),
        proprietaryCode: select('a:BkTxCd/a:Prtry/a:Cd/text()', elem).toString(),
        proprietaryIssuer: select('a:BkTxCd/a:Prtry/a:Issr/text()', elem).toString()
      },
      entryDetails: {
        batch: {
          numberOfTransactions: Number(select('a:NtryDtls/a:Btch/a:NbOfTxs/text()', elem).toString())
        },
        transactionDetails: select('a:NtryDtls/a:TxDtls', elem).map(function(tElem) {
          return {
            transactionAmount: Number(select('a:AmtDtls/a:TxAmt/a:Amt/text()', tElem).toString()),
            transactionAmountCurrency: select('a:AmtDtls/a:TxAmt/a:Amt', tElem)[0].getAttribute('Ccy').toString(),
            bankTransactionCode: {
              domainCode: select('a:BkTxCd/a:Domn/a:Cd/text()', tElem).toString(),
              domainFamilyCode: select('a:BkTxCd/a:Domn/a:Fmly/a:Cd/text()', tElem).toString(),
              domainSubFamilyCode: select('a:BkTxCd/a:Domn/a:Fmly/a:SubFmlyCd/text()', tElem).toString(),
              proprietaryCode: select('a:BkTxCd/a:Prtry/a:Cd/text()', tElem).toString(),
              proprietaryIssuer: select('a:BkTxCd/a:Prtry/a:Issr/text()', tElem).toString()
            },
            relatedParties: {
              debitorName: select('a:RltdPties/a:Dbtr/a:Nm/text()', tElem).toString(),
            },
            remittanceInformation: {
              referenceNumber: select('a:RmtInf/a:Strd/a:CdtrRefInf/a:Ref/text()', tElem).toString(),
            },
            relatedDates: {
              acceptanceDateTime: select('a:RltdDts/a:AccptncDtTm/text()', tElem).toString()
            },
            accountServicerReference: select('a:Refs/a:AcctSvcrRef/text()', tElem).toString(),
          };
        })
      }
    };
  };
}

function parseStatement(select) {
  return function(elem) {
    var ret = {
      identification: select('a:Id/text()', elem).toString(),
      electronicSequenceNumber: select('a:ElctrncSeqNb/text()', elem).toString(),
      creationDateTime: select('a:CreDtTm/text()', elem).toString(),
      fromDateTime: select('a:FrToDt/a:FrDtTm/text()', elem).toString(),
      toDateTime: select('a:FrToDt/a:ToDtTm/text()', elem).toString(),
      account: {
        iban: select('a:Acct/a:Id/a:IBAN/text()', elem).toString(),
        currency: select('a:Acct/a:Ccy/text()', elem).toString(),
        name: select('a:Acct/a:Nm/text()', elem).toString(),
        accountOwnerName: select('a:Acct/a:Ownr/a:Nm/text()', elem).toString(),
        servicerBic: select('a:Acct/a:Svcr/a:FinInstnId/a:BIC/text()', elem).toString()
      },
      transactionSummary: {
        numberOfEntries: Number(select('a:TxsSummry/a:TtlNtries/a:NbOfNtries/text()', elem).toString()),
        numberOfCreditEntries: Number(select('a:TxsSummry/a:TtlCdtNtries/a:NbOfNtries/text()', elem).toString()),
        sumOfCreditEntries: Number(select('a:TxsSummry/a:TtlCdtNtries/a:Sum/text()', elem).toString()),
        numberOfDebitEntries: Number(select('a:TxsSummry/a:TtlDbtNtries/a:NbOfNtries/text()', elem).toString()),
        sumOfDebitEntries: Number(select('a:TxsSummry/a:TtlDbtNtries/a:Sum/text()', elem).toString())
      },
      entries: select('a:Ntry', elem).map(parseEntry(select))
    };
    return ret;
  };
}

function camt05400102(str) {
  var doc = new dom().parseFromString(str.trim(), XMLDom.MIME_TYPE.XML_APPLICATION),
      select = xpath.useNamespaces({
        a: 'urn:iso:std:iso:20022:tech:xsd:camt.054.001.02'
      }),
      ret = {};
  var statements = select('/a:Document/a:BkToCstmrDbtCdtNtfctn/a:Ntfctn', doc);
  ret.notifications = statements.map(parseStatement(select));
  return ret;
}
