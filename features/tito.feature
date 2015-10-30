Feature: TITO

  Scenario: Parse header information from a TITO file

    Given string content
    """
    T00322100195030000000100440603060603060603062359    44444444     060303+000000000000440927000064EURShekkitili                    000000000000000000POHJANLINNAN RAUTATALO             Nordea Pankki Suomi Oyj Y-tunn 1680235-81950 Demokonttori                                                     FI4819503000000010 NDEAFIHH   
    T101880000010303A2584SM07002490603060603060603061710Maksum{{r{ys                       +000000000001550300  JOKOHAMA LTD                       A                                            
    T11148002584SMM0829720                     MAKSAJAN ILMOITTAMA SAAJAN NIMI:   IRONHOUSE                          NC POHJANL                         
    T1104905+000000000001302992 EUR 00011898000      
    T1114807L[HETT[J[N OSOITE:                 JOKOHAMA LTD                       351 (8 FL)BOSS Z2,SNOWLAKE OFFICE AABB JOKOHAMA IRONSTREET 129 BXY 17 
    T10188000017                  0603060000000603062702Maksu                              -000000000000010000 AMERISINI OYJ                       J29501800069357 00000000000000000013        1
    T1107806123456                             7890                               
    T40050060306+000000000001705024+000000000000000000
    T50067106030600000011+00000000000423713000000010-000000000002973033
    T51067106030600000000+00000000000000000000000002-000000000000003885
    T50067306030600000000+00000000000969342000000000-000000000012494489
    T50067406030600000000+00000000002976714800000000-000000000022845789
    """
    When I parse the file as TITO
    Then the result hash map should be
    """js
    {
      header: {
        bban: "19503000000010",
        statementNumber: "044",
        startDate: "2006-03-06",
        endDate: "2006-03-06",
        creationDate: "2006-03-06",
        creationTime: "23:59",
        contractId: "44444444",
        currency: "EUR",
        accountName: "Shekkitili",
        accountOwnerName: "POHJANLINNAN RAUTATALO",
        bankContactInformation: "Nordea Pankki Suomi Oyj Y-tunn 1680235-8",
        bankContactInformationDetails: "1950 Demokonttori",
        iban: 'FI4819503000000010',
        bic: 'NDEAFIHH'
      },
      entries: [{
        archiveId: '0303A2584SM0700249',
        bookingDate: '2006-03-06',
        valueDate: '2006-03-06',
        paymentDate: '2006-03-06',
        bookingInformation: '710Maksumääräys',
        amount: 15503.0,
        receiver: 'JOKOHAMA LTD',
        receiverBban: '',
        referenceNumber: '',
        additionalInformation: ["2584SMM0829720 MAKSAJAN ILMOITTAMA SAAJAN NIMI: IRONHOUSE NC POHJANL", "LÄHETTÄJÄN OSOITE: JOKOHAMA LTD 351 (8 FL)BOSS Z2,SNOWLAKE OFFICE A ABB JOKOHAMA IRONSTREET 129 BXY 17"]
      }, {
        archiveId: '',
        bookingDate: '2006-03-06',
        valueDate: '0000-00-00',
        paymentDate: '2006-03-06',
        bookingInformation: '702Maksu',
        amount: -100.0,
        receiver: 'MERISINI OYJ',
        receiverBban: '29501800069357',
        referenceNumber: '13',
        additionalInformation: ['123456 7890']
      }]
    }
    """
