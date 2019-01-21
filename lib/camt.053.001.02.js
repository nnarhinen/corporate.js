'use strict';
module.exports = camt05300102;

var dom = require('xmldom').DOMParser,
    xpath = require('xpath');

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
        transactionDetails: {
          transactionAmount: Number(select('a:NtryDtls/a:TxDtls/a:AmtDtls/a:TxAmt/a:Amt/text()', elem).toString()),
          transactionAmountCurrency: select('a:NtryDtls/a:TxDtls/a:AmtDtls/a:TxAmt/a:Amt', elem)[0].getAttribute('Ccy').toString(),
          bankTransactionCode: {
            domainCode: select('a:NtryDtls/a:TxDtls/a:BkTxCd/a:Domn/a:Cd/text()', elem).toString(),
            domainFamilyCode: select('a:NtryDtls/a:TxDtls/a:BkTxCd/a:Domn/a:Fmly/a:Cd/text()', elem).toString(),
            domainSubFamilyCode: select('a:NtryDtls/a:TxDtls/a:BkTxCd/a:Domn/a:Fmly/a:SubFmlyCd/text()', elem).toString(),
            proprietaryCode: select('a:NtryDtls/a:TxDtls/a:BkTxCd/a:Prtry/a:Cd/text()', elem).toString(),
            proprietaryIssuer: select('a:NtryDtls/a:TxDtls/a:BkTxCd/a:Prtry/a:Issr/text()', elem).toString()
          },
          relatedParties: {
            creditorName: select('a:NtryDtls/a:TxDtls/a:RltdPties/a:Cdtr/a:Nm/text()', elem).toString(),
            creditorAccount: {
              iban: select('a:NtryDtls/a:TxDtls/a:RltdPties/a:CdtrAcct/a:Id/a:IBAN/text()', elem).toString()
            }
          },
          remittanceInformation: {
            referenceNumber: select('a:NtryDtls/a:TxDtls/a:RmtInf/a:Strd/a:CdtrRefInf/a:Ref/text()', elem).toString(),
            unstructured: select('a:NtryDtls/a:TxDtls/a:RmtInf/a:Ustrd/text()', elem).map(function(ustrdEl) { return ustrdEl.toString(); })
          },
          relatedDates: {
            acceptanceDateTime: select('a:NtryDtls/a:TxDtls/a:RltdDts/a:AccptncDtTm/text()', elem).toString()
          }
        }
      }
    };
  };
}

function parseStatement(select) {
  return function(elem) {
    var ret = {
      identification: select('a:Id/text()', elem).toString(),
      legalSequenceNumber: select('a:LglSeqNb/text()', elem).toString(),
      creationDateTime: select('a:CreDtTm/text()', elem).toString(),
      fromDateTime: select('a:FrToDt/a:FrDtTm/text()', elem).toString(),
      toDateTime: select('a:FrToDt/a:ToDtTm/text()', elem).toString(),
      account: {
        iban: select('a:Acct/a:Id/a:IBAN/text()', elem).toString(),
        currency: select('a:Acct/a:Ccy/text()', elem).toString(),
        accountOwnerName: select('a:Acct/a:Ownr/a:Nm/text()', elem).toString(),
        servicerName: select('a:Acct/a:Svcr/a:FinInstnId/a:Nm/text()', elem).toString(),
        servicerBic: select('a:Acct/a:Svcr/a:FinInstnId/a:BIC/text()', elem).toString()
      },
      balances: select('a:Bal', elem).map(function(balElem) {
        var creditLine = select('a:CdtLine', balElem),
            crdtLine = creditLine[0] && (
              !select('a:Incl', creditLine[0]).length || select('a:Incl/text()', creditLine[0]).toString() === 'true'
            ) ? {
              included: true,
              amount: Number(select('a:Amt/text()', creditLine[0]).toString()),
              amountCurrency: select('a:Amt', creditLine[0])[0].getAttribute('Ccy').toString()
            } : { included: false, amount: null, amountCurrency: null };
        return {
          type: select('a:Tp/a:CdOrPrtry/a:Cd/text()', balElem).toString(),
          creditLine: crdtLine,
          amount: Number(select('a:Amt/text()', balElem).toString()),
          amountCurrency: select('a:Amt', balElem)[0].getAttribute('Ccy').toString(),
          creditDebitIndicator: select('a:CdtDbtInd/text()', balElem).toString(),
          date: select('a:Dt/a:Dt/text()', balElem).toString()
        };
      }),
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

function camt05300102(str) {
  var doc = new dom().parseFromString(str),
      select = xpath.useNamespaces({
        a: 'urn:iso:std:iso:20022:tech:xsd:camt.053.001.02'
      }),
      ret = {};
  var statements = select('/a:Document/a:BkToCstmrStmt/a:Stmt', doc);
  ret.statements = statements.map(parseStatement(select));
  return ret;
}
