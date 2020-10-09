Feature: camt.054.001.02


  Scenario: Parse xml
    Given xml payload:
    """xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.054.001.02" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:camt.054.001.02 camt.054.001.02.xsd">
      <BkToCstmrDbtCdtNtfctn>
        <GrpHdr>
          <MsgId>IOY7M2WUIWVD000000002</MsgId>
          <CreDtTm>2011-09-17T01:04:01</CreDtTm>
        </GrpHdr>
        <Ntfctn>
          <Id>IOY7M2WUIWVD</Id>
          <ElctrncSeqNb>2</ElctrncSeqNb>
          <CreDtTm>2011-09-19T01:04:01</CreDtTm>
          <FrToDt>
            <FrDtTm>2011-09-16T01:01:01</FrDtTm>
            <ToDtTm>2011-09-16T23:59:59</ToDtTm>
          </FrToDt>
          <Acct>
            <Id>
              <IBAN>FI9881234511224450</IBAN>
            </Id>
            <Ccy>EUR</Ccy>
            <Nm>Maksuliiketili</Nm>
            <Ownr>
              <Nm>Oy Yritys Ab</Nm>
              <PstlAdr>
                <StrtNm>Kuusitie</StrtNm>
                <BldgNb>6 A</BldgNb>
                <PstCd>00270</PstCd>
                <TwnNm>HELSINKI</TwnNm>
                <Ctry>FI</Ctry>
              </PstlAdr>
              <Id>
                <OrgId>
                  <Othr>
                    <Id>12345678</Id>
                    <SchmeNm>
                      <Cd>CUST</Cd>
                    </SchmeNm>
                  </Othr>
                </OrgId>
              </Id>
            </Ownr>
            <Svcr>
              <FinInstnId>
                <BIC>DABAFIHH</BIC>
              </FinInstnId>
            </Svcr>
          </Acct>
          <TxsSummry>
            <TtlNtries>
              <NbOfNtries>2</NbOfNtries>
              <TtlNetNtryAmt>193.00</TtlNetNtryAmt>
              <CdtDbtInd>CRDT</CdtDbtInd>
            </TtlNtries>
            <TtlCdtNtries>
              <NbOfNtries>2</NbOfNtries>
              <Sum>193.00</Sum>
            </TtlCdtNtries>
            <TtlDbtNtries>
              <NbOfNtries>0</NbOfNtries>
              <Sum>0.00</Sum>
            </TtlDbtNtries>
          </TxsSummry>
          <Ntry>
            <NtryRef>1</NtryRef>
            <Amt Ccy="EUR">183.00</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Sts>BOOK</Sts>
            <BookgDt>
              <Dt>2011-09-16</Dt>
            </BookgDt>
            <ValDt>
              <Dt>2011-09-16</Dt>
            </ValDt>
            <AcctSvcrRef>REFP2011034</AcctSvcrRef>
            <BkTxCd>
              <Domn>
                <Cd>PMNT</Cd>
                <Fmly>
                  <Cd>RCDT</Cd>
                  <SubFmlyCd>NTAV</SubFmlyCd>
                </Fmly>
              </Domn>
              <Prtry>
                <Cd>705 VIITESIIRROT</Cd>
                <Issr>FFFS</Issr>
              </Prtry>
            </BkTxCd>
            <NtryDtls>
              <Btch>
                <NbOfTxs>2</NbOfTxs>
              </Btch>
              <TxDtls>
                <Refs>
                  <AcctSvcrRef>1109168E0049198529</AcctSvcrRef>
                </Refs>
                <AmtDtls>
                  <TxAmt>
                    <Amt Ccy="EUR">147.00</Amt>
                  </TxAmt>
                </AmtDtls>
                <BkTxCd>
                  <Domn>
                    <Cd>PMNT</Cd>
                    <Fmly>
                      <Cd>RCDT</Cd>
                      <SubFmlyCd>NTAV</SubFmlyCd>
                    </Fmly>
                  </Domn>
                  <Prtry>
                    <Cd>700 SIIRTO</Cd>
                    <Issr>FFFS</Issr>
                  </Prtry>
                </BkTxCd>
                <RltdPties>
                  <Dbtr>
                    <Nm>Maksaja</Nm>
                  </Dbtr>
                </RltdPties>
                <RmtInf>
                  <Strd>
                    <CdtrRefInf>
                      <Tp>
                        <CdOrPrtry>
                          <Cd>SCOR</Cd>
                        </CdOrPrtry>
                      </Tp>
                      <Ref>123</Ref>
                    </CdtrRefInf>
                  </Strd>
                </RmtInf>
                <RltdDts>
                  <AccptncDtTm>2011-09-16T13:35:18</AccptncDtTm>
                </RltdDts>
              </TxDtls>
              <TxDtls>
                <Refs>
                  <AcctSvcrRef>1109168E0049198530</AcctSvcrRef>
                </Refs>
                <AmtDtls>
                  <TxAmt>
                    <Amt Ccy="EUR">36.00</Amt>
                  </TxAmt>
                </AmtDtls>
                <BkTxCd>
                  <Domn>
                    <Cd>PMNT</Cd>
                    <Fmly>
                      <Cd>RCDT</Cd>
                      <SubFmlyCd>NTAV</SubFmlyCd>
                    </Fmly>
                  </Domn>
                  <Prtry>
                    <Cd>700 SIIRTO</Cd>
                    <Issr>FFFS</Issr>
                  </Prtry>
                </BkTxCd>
                <RltdPties>
                  <Dbtr>
                    <Nm>Maksaja</Nm>
                  </Dbtr>
                </RltdPties>
                <RmtInf>
                  <Strd>
                    <CdtrRefInf>
                      <Tp>
                        <CdOrPrtry>
                          <Cd>SCOR</Cd>
                        </CdOrPrtry>
                        <Issr>ISO</Issr>
                      </Tp>
                      <Ref>RF74100978</Ref>
                    </CdtrRefInf>
                  </Strd>
                </RmtInf>
                <RltdDts>
                  <AccptncDtTm>2011-09-16T13:35:18</AccptncDtTm>
                </RltdDts>
              </TxDtls>
            </NtryDtls>
          </Ntry>
          <Ntry>
            <NtryRef>2</NtryRef>
            <Amt Ccy="EUR">10.00</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Sts>BOOK</Sts>
            <BookgDt>
              <Dt>2011-09-16</Dt>
            </BookgDt>
            <ValDt>
              <Dt>2011-09-16</Dt>
            </ValDt>
            <AcctSvcrRef>RFDI2011030</AcctSvcrRef>
            <BkTxCd>
              <Domn>
                <Cd>PMNT</Cd>
                <Fmly>
                  <Cd>IDDT</Cd>
                  <SubFmlyCd>PMDD</SubFmlyCd>
                </Fmly>
              </Domn>
              <Prtry>
                <Cd>704 SUORAVELOITUKSET</Cd>
                <Issr>FFFS</Issr>
              </Prtry>
            </BkTxCd>
            <NtryDtls>
              <Btch>
                <NbOfTxs>1</NbOfTxs>
              </Btch>
              <TxDtls>
                <Refs>
                  <AcctSvcrRef>1109158E0049179974</AcctSvcrRef>
                </Refs>
                <AmtDtls>
                  <TxAmt>
                    <Amt Ccy="EUR">10.00</Amt>
                  </TxAmt>
                </AmtDtls>
                <BkTxCd>
                  <Domn>
                    <Cd>PMNT</Cd>
                    <Fmly>
                      <Cd>IDDT</Cd>
                      <SubFmlyCd>PMDD</SubFmlyCd>
                    </Fmly>
                  </Domn>
                  <Prtry>
                    <Cd>704 SUORAVELOITUS</Cd>
                    <Issr>FFFS</Issr>
                  </Prtry>
                </BkTxCd>
                <RltdPties>
                  <Dbtr>
                    <Nm>Maksaja</Nm>
                  </Dbtr>
                </RltdPties>
                <RmtInf>
                  <Strd>
                    <CdtrRefInf>
                      <Tp>
                        <CdOrPrtry>
                          <Cd>SCOR</Cd>
                        </CdOrPrtry>
                      </Tp>
                      <Ref>00000006450830029863</Ref>
                    </CdtrRefInf>
                  </Strd>
                </RmtInf>
                <RltdDts>
                  <AccptncDtTm>2011-09-16T03:02:54</AccptncDtTm>
                </RltdDts>
              </TxDtls>
            </NtryDtls>
          </Ntry>
        </Ntfctn>
      </BkToCstmrDbtCdtNtfctn>
    </Document>
    """
    When I parse the xml payload as camt.054.001.02
    Then the result hash map should be
    """js
    {
      notifications: [{
        identification: "IOY7M2WUIWVD",
        electronicSequenceNumber: "2",
        creationDateTime: "2011-09-19T01:04:01",
        fromDateTime: "2011-09-16T01:01:01",
        toDateTime: "2011-09-16T23:59:59",
        account: {
          iban: "FI9881234511224450",
          currency: "EUR",
          name: "Maksuliiketili",
          accountOwnerName: "Oy Yritys Ab",
          servicerBic: "DABAFIHH"
        },
        transactionSummary: {
          numberOfEntries: 2,
          numberOfCreditEntries: 2,
          sumOfCreditEntries: 193.0,
          numberOfDebitEntries: 0,
          sumOfDebitEntries: 0
        },
        entries: [{
          entryReference: "1",
          amount: 183.0,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          status: "BOOK",
          bookingDate: "2011-09-16",
          valueDate: "2011-09-16",
          accountServicerReference: "REFP2011034",
          bankTransactionCode: {
            domainCode: "PMNT",
            domainFamilyCode: "RCDT",
            domainSubFamilyCode: "NTAV",
            proprietaryCode: "705 VIITESIIRROT",
            proprietaryIssuer: "FFFS"
          },
          entryDetails: {
            batch: {
              numberOfTransactions: 2
            },
            transactionDetails: [{
              transactionAmount: 147.0,
              transactionAmountCurrency: "EUR",
              bankTransactionCode: {
                domainCode: "PMNT",
                domainFamilyCode: "RCDT",
                domainSubFamilyCode: "NTAV",
                proprietaryCode: "700 SIIRTO",
                proprietaryIssuer: "FFFS"
              },
              relatedParties: {
                debitorName: 'Maksaja'
              },
              remittanceInformation: {
                referenceNumber: '123'
              },
              relatedDates: {
                acceptanceDateTime: "2011-09-16T13:35:18"
              },
              accountServicerReference: "1109168E0049198529"
            },{
              transactionAmount: 36.0,
              transactionAmountCurrency: "EUR",
              bankTransactionCode: {
                domainCode: "PMNT",
                domainFamilyCode: "RCDT",
                domainSubFamilyCode: "NTAV",
                proprietaryCode: "700 SIIRTO",
                proprietaryIssuer: "FFFS"
              },
              relatedParties: {
                debitorName: 'Maksaja'
              },
              remittanceInformation: {
                referenceNumber: 'RF74100978'
              },
              relatedDates: {
                acceptanceDateTime: "2011-09-16T13:35:18"
              },
              accountServicerReference: "1109168E0049198530"
            }]
          }
        },{
          entryReference: "2",
          amount: 10.0,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          status: "BOOK",
          bookingDate: "2011-09-16",
          valueDate: "2011-09-16",
          accountServicerReference: "RFDI2011030",
          bankTransactionCode: {
            domainCode: "PMNT",
            domainFamilyCode: "IDDT",
            domainSubFamilyCode: "PMDD",
            proprietaryCode: "704 SUORAVELOITUKSET",
            proprietaryIssuer: "FFFS"
          },
          entryDetails: {
            batch: {
              numberOfTransactions: 1
            },
            transactionDetails: [{
              transactionAmount: 10.0,
              transactionAmountCurrency: "EUR",
              bankTransactionCode: {
                domainCode: "PMNT",
                domainFamilyCode: "IDDT",
                domainSubFamilyCode: "PMDD",
                proprietaryCode: "704 SUORAVELOITUS",
                proprietaryIssuer: "FFFS"
              },
              relatedParties: {
                debitorName: 'Maksaja'
              },
              remittanceInformation: {
                referenceNumber: '00000006450830029863'
              },
              relatedDates: {
                acceptanceDateTime: "2011-09-16T03:02:54"
              },
              accountServicerReference: "1109158E0049179974"
            }]
          }
        }]
      }]
    }
    """
