Feature: pain.002.001.03


  Scenario: Accepted technical check
    Given xml payload:
    """xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.002.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.002.001.03 pain.002.001.03.xsd">
      <CstmrPmtStsRpt>
        <GrpHdr>
          <MsgId>1539869</MsgId>
          <CreDtTm>2010-06-08T12:01:10+03:00</CreDtTm>
        </GrpHdr>
        <OrgnlGrpInfAndSts>
          <OrgnlMsgId>20110102-0000001</OrgnlMsgId>
          <OrgnlMsgNmId>pain.001.001.03</OrgnlMsgNmId>
          <GrpSts>ACTC</GrpSts>
        </OrgnlGrpInfAndSts>
      </CstmrPmtStsRpt>
    </Document>
    """
    When I parse the xml payload as pain.002.001.03
    Then the result hash map should be
    """js
    {
      originalMessageIdentification: "20110102-0000001",
      originalMessageNameIdentification: "pain.001.001.03",
      groupStatus: "ACTC"
    }
    """

  Scenario: Rejected technical check
    Given xml payload:
    """xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.002.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.002.001.03 pain.002.001.03.xsd">
      <CstmrPmtStsRpt>
        <GrpHdr>
          <MsgId>1539869</MsgId>
          <CreDtTm>2010-06-08T12:01:10+03:00</CreDtTm>
        </GrpHdr>
        <OrgnlGrpInfAndSts>
          <OrgnlMsgId>20110102-0000001</OrgnlMsgId>
          <OrgnlMsgNmId>pain.001.001.03</OrgnlMsgNmId>
          <GrpSts>RJCT</GrpSts>
          <StsRsnInf>
            <Rsn>
              <Cd>NARR</Cd>
            </Rsn>
            <AddtlInf>pain.001.001.03 could not be processed, please verify structure. cvc-datatype-valid.1.2.1: '4847,37' </AddtlInf>
            <AddtlInf>is not a valid value for 'decimal'.cvc-type.3.1.3: The value '4847,37' of element 'CtrlSum' is not val</AddtlInf>
            <AddtlInf>id.</AddtlInf>
          </StsRsnInf>
        </OrgnlGrpInfAndSts>
      </CstmrPmtStsRpt>
    </Document>
    """
    When I parse the xml payload as pain.002.001.03
    Then the result hash map should be
    """js
    {
      originalMessageIdentification: "20110102-0000001",
      originalMessageNameIdentification: "pain.001.001.03",
      groupStatus: "RJCT",
      statusReasonInformation: {
        reasonCode: "NARR",
        additionalInformation: "pain.001.001.03 could not be processed, please verify structure. cvc-datatype-valid.1.2.1: '4847,37' is not a valid value for 'decimal'.cvc-type.3.1.3: The value '4847,37' of element 'CtrlSum' is not valid."
      }
    }
    """

  Scenario: Accepted payment material
    Given xml payload:
    """xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.002.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <CstmrPmtStsRpt>
        <GrpHdr>
          <MsgId>1539898</MsgId>
          <CreDtTm>2014-01-08T13:33:47+02:00</CreDtTm>
        </GrpHdr>
        <OrgnlGrpInfAndSts>
          <OrgnlMsgId>20140102-0000001</OrgnlMsgId>
          <OrgnlMsgNmId>pain.001.001.03</OrgnlMsgNmId>
          <OrgnlCreDtTm>2014-01-08T10:24:00+02:00</OrgnlCreDtTm>
          <OrgnlNbOfTxs>1</OrgnlNbOfTxs>
          <GrpSts>ACCP</GrpSts>
        </OrgnlGrpInfAndSts>
        <OrgnlPmtInfAndSts>
          <OrgnlPmtInfId>20110102-123456-01</OrgnlPmtInfId>
          <OrgnlNbOfTxs>1</OrgnlNbOfTxs>
          <OrgnlCtrlSum>90.08</OrgnlCtrlSum>
          <PmtInfSts>ACCP</PmtInfSts>
          <NbOfTxsPerSts>
            <DtldNbOfTxs>1</DtldNbOfTxs>
            <DtldSts>ACCP</DtldSts>
            <DtldCtrlSum>90.08</DtldCtrlSum>
          </NbOfTxsPerSts>
          <TxInfAndSts>
            <OrgnlTxRef>
              <Amt>
                <InstdAmt Ccy="EUR">90.08</InstdAmt>
              </Amt>
              <ReqdExctnDt>2014-01-08</ReqdExctnDt>
              <UltmtDbtr>
                <Nm>Alkuper&#xE4;inen Maksaja</Nm>
              </UltmtDbtr>
              <Dbtr>
                <Nm>Firma Oy</Nm>
              </Dbtr>
              <DbtrAcct>
                <Id>
                  <IBAN>FI9250009420108078</IBAN>
                </Id>
              </DbtrAcct>
            </OrgnlTxRef>
          </TxInfAndSts>
        </OrgnlPmtInfAndSts>
      </CstmrPmtStsRpt>
    </Document>
    """
    When I parse the xml payload as pain.002.001.03
    Then the result hash map should be
    """js
    {
      originalMessageIdentification: "20140102-0000001",
      originalMessageNameIdentification: "pain.001.001.03",
      groupStatus: "ACCP",
      paymentGroups: [{
        originalPaymentInformationId: "20110102-123456-01",
        paymentInformationStatus: "ACCP"
      }]
    }
    """
