Feature: camt.053.001.02

  Scenario: parse camt.053.001.2
    Given xml payload:
    """
    <?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.053.001.02">
      <!--Versio 1.4-->
      <BkToCstmrStmt>
        <GrpHdr>
          <MsgId>TI0107.122005810</MsgId>
          <CreDtTm>2014-01-03T22:01:00+02:00</CreDtTm>
          <MsgRcpt>
            <Nm>-</Nm>
            <PstlAdr>
              <AdrTp>BIZZ</AdrTp>
              <Dept>0000</Dept>
            </PstlAdr>
            <Id>
              <OrgId>
                <Othr>
                  <Id/>
                  <SchmeNm>
                    <Cd>BANK</Cd>
                  </SchmeNm>
                </Othr>
              </OrgId>
            </Id>
          </MsgRcpt>
          <MsgPgntn>
            <PgNb>1</PgNb>
            <LastPgInd>true</LastPgInd>
          </MsgPgntn>
        </GrpHdr>
        <Stmt>
          <Id>TI0107.122005810.1</Id>
          <LglSeqNb>003</LglSeqNb>
          <CreDtTm>2014-01-03T22:00:00+02:00</CreDtTm>
          <FrToDt>
            <FrDtTm>2014-01-03T00:00:00+02:00</FrDtTm>
            <ToDtTm>2014-01-03T00:00:00+02:00</ToDtTm>
          </FrToDt>
          <Acct>
            <Id>
              <IBAN>FI1557169020004185</IBAN>
            </Id>
            <Ccy>EUR</Ccy>
            <Ownr>
              <Id>
                <PrvtId>
                  <Othr>
                    <Id/>
                  </Othr>
                </PrvtId>
              </Id>
            </Ownr>
            <Svcr>
              <FinInstnId>
                <BIC>OKOYFIHH</BIC>
                <Nm>TURUN SEUDUN OSUUSPANKKI</Nm>
              </FinInstnId>
            </Svcr>
          </Acct>
          <Bal>
            <Tp>
              <CdOrPrtry>
                <Cd>OPBD</Cd>
              </CdOrPrtry>
            </Tp>
            <Amt Ccy="EUR">1001159.23</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Dt>
              <Dt>2014-01-02</Dt>
            </Dt>
          </Bal>
          <Bal>
            <Tp>
              <CdOrPrtry>
                <Cd>PRCD</Cd>
              </CdOrPrtry>
            </Tp>
            <Amt Ccy="EUR">1001159.23</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Dt>
              <Dt>2014-01-02</Dt>
            </Dt>
          </Bal>
          <Bal>
            <Tp>
              <CdOrPrtry>
                <Cd>CLBD</Cd>
              </CdOrPrtry>
            </Tp>
            <Amt Ccy="EUR">1000000.00</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Dt>
              <Dt>2014-01-03</Dt>
            </Dt>
          </Bal>
          <Bal>
            <Tp>
              <CdOrPrtry>
                <Cd>CLAV</Cd>
              </CdOrPrtry>
            </Tp>
            <CdtLine>
              <Incl>true</Incl>
              <Amt Ccy="EUR">1000000.00</Amt>
            </CdtLine>
            <Amt Ccy="EUR">2000000.00</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Dt>
              <Dt>2014-01-03</Dt>
            </Dt>
          </Bal>
          <TxsSummry>
            <TtlNtries>
              <NbOfNtries>1</NbOfNtries>
            </TtlNtries>
            <TtlCdtNtries>
              <NbOfNtries>1</NbOfNtries>
              <Sum>1159.23</Sum>
            </TtlCdtNtries>
            <TtlDbtNtries>
              <NbOfNtries>0</NbOfNtries>
              <Sum>0.00</Sum>
            </TtlDbtNtries>
          </TxsSummry>
          <Ntry>
            <NtryRef>000001</NtryRef>
            <Amt Ccy="EUR">1159.23</Amt>
            <CdtDbtInd>CRDT</CdtDbtInd>
            <Sts>BOOK</Sts>
            <BookgDt>
              <Dt>2014-01-03</Dt>
            </BookgDt>
            <ValDt>
              <Dt>2014-01-03</Dt>
            </ValDt>
            <AcctSvcrRef>140103578800012359</AcctSvcrRef>
            <BkTxCd>
              <Domn>
                <Cd>PMNT</Cd>
                <Fmly>
                  <Cd>RCDT</Cd>
                  <SubFmlyCd>DMCT</SubFmlyCd>
                </Fmly>
              </Domn>
              <Prtry>
                <Cd>710TILISIIRTO</Cd>
                <Issr>FFFS</Issr>
              </Prtry>
            </BkTxCd>
            <NtryDtls>
              <TxDtls>
                <AmtDtls>
                  <TxAmt>
                    <Amt Ccy="EUR">1159.23</Amt>
                  </TxAmt>
                </AmtDtls>
                <BkTxCd>
                  <Domn>
                    <Cd>PMNT</Cd>
                    <Fmly>
                      <Cd>RCDT</Cd>
                      <SubFmlyCd>DMCT</SubFmlyCd>
                    </Fmly>
                  </Domn>
                  <Prtry>
                    <Cd>710TILISIIRTO</Cd>
                    <Issr>FFFS</Issr>
                  </Prtry>
                </BkTxCd>
                <RltdPties>
                  <Cdtr>
                    <Nm>John Doe</Nm>
                  </Cdtr>
                  <CdtrAcct>
                    <Id>
                      <IBAN>[IBANNUMBER]</IBAN>
                    </Id>
                  </CdtrAcct>
                </RltdPties>
                <RltdAgts>
                  <CdtrAgt>
                    <FinInstnId>
                      <BIC>NDEAFIHH</BIC>
                    </FinInstnId>
                  </CdtrAgt>
                </RltdAgts>
                <RmtInf>
                  <Ustrd>Message on statement</Ustrd>
                  <Strd>
                    <CdtrRefInf>
                      <Tp>
                        <CdOrPrtry>
                          <Cd>SCOR</Cd>
                        </CdOrPrtry>
                      </Tp>
                      <Ref>00000000803628206247</Ref>
                    </CdtrRefInf>
                  </Strd>
                </RmtInf>								
                <RltdDts>
                  <AccptncDtTm>2014-01-03T00:00:00+02:00</AccptncDtTm>
                </RltdDts>
              </TxDtls>
            </NtryDtls>
          </Ntry>
        </Stmt>
      </BkToCstmrStmt>
    </Document>
    """ 
    When I parse the xml payload as camt.053.001.02
    Then the result hash map should be
    """js
    {
      statements: [{
        identification: "TI0107.122005810.1",
        legalSequenceNumber: "003",
        creationDateTime: "2014-01-03T22:00:00+02:00",
        fromDateTime: "2014-01-03T00:00:00+02:00",
        toDateTime: "2014-01-03T00:00:00+02:00",
        account: {
          iban: "FI1557169020004185",
          currency: "EUR",
          accountOwnerName: null,
          servicerName: "TURUN SEUDUN OSUUSPANKKI",
          servicerBic: "OKOYFIHH"
        },
        balances: [{
          type: "OPBD",
          creditLine: {
            included: false,
            amount: null,
            amountCurrency: null
          },
          amount: 1001159.23,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          date: "2014-01-02"
        },
        {
          type: "PRCD",
          creditLine: {
            included: false,
            amount: null,
            amountCurrency: null
          },
          amount: 1001159.23,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          date: "2014-01-02"
        },
        {
          type: "CLBD",
          creditLine: {
            included: false,
            amount: null,
            amountCurrency: null
          },
          amount: 1000000.00,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          date: "2014-01-03"
        },
        {
          type: "CLAV",
          creditLine: {
            included: true,
            amount: 1000000.00,
            amountCurrency: "EUR"
          },
          amount: 2000000.00,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          date: "2014-01-03"
        }],
        transactionSummary: {
          numberOfEntries: 1,
          numberOfCreditEntries: 1,
          sumOfCreditEntries: 1159.23,
          numberOfDebitEntries: 0,
          sumOfDebitEntries: 0.0
        },
        entries: [{
          entryReference: "000001",
          amount: 1159.23,
          amountCurrency: "EUR",
          creditDebitIndicator: "CRDT",
          status: "BOOK",
          bookingDate: "2014-01-03",
          valueDate: "2014-01-03",
          accountServicerReference: "140103578800012359",
          bankTransactionCode: {
            domainCode: "PMNT",
            domainFamilyCode: "RCDT",
            domainSubFamilyCode: "DMCT",
            proprietaryCode: "710TILISIIRTO",
            proprietaryIssuer: "FFFS"
          },
          entryDetails: {
            transactionDetails: {
              transactionAmount: 1159.23,
              transactionAmountCurrency: "EUR",
              bankTransactionCode: {
                domainCode: "PMNT",
                domainFamilyCode: "RCDT",
                domainSubFamilyCode: "DMCT",
                proprietaryCode: "710TILISIIRTO",
                proprietaryIssuer: "FFFS"
              },
              relatedParties: {
                creditorName: 'John Doe',
                creditorAccount: {
                  iban: '[IBANNUMBER]'
                }
              },
              remittanceInformation: {
                referenceNumber: '00000000803628206247',
                unstructured: ['Message on statement']
              },
              relatedDates: {
                acceptanceDateTime: "2014-01-03T00:00:00+02:00"
              }
            }
          }
        }]
      }]
    }
    """
