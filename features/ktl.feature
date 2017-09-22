Feature: TITO

  Scenario: Parse header information from a TITO file

    Given string content
    """
    006030323592 011111111144444444A0000000000000000000000000000000000000000000000000000000000
    31950300000001006030306030203025LM     654500000000000000000013LOPEN PERUNA1A00000323240A0
    31950300000001006030306030303031950AA12318500000000000000455435TUTTU TIMO  1K00000776400K0
    31950300000001006030306030303031950AA12367800000000000000844677POUTA PILVI 1K00000851500K0
    3195030000000100603030603030303258877BA123400000000000000890922KULMAN KAUPP1J00001332830A0
    319503000000010060303060303030325887801444400000000000002535337KASVI KIELO 1J00001618240A0
    319503000000010060303060303030325887902555500000000000006678753HANNULA OY  1J00000724500A0
    3195030000000100603030603030303258878BA011400000000000003088187NELLI & CO  1J00000855500A0
    3561211200110661709151709150915593497GC129100010000118530000711KUISMA HEIDI1J00000220000A0
    51950300000001006030306030303032588731K000800000000230000094280MAKSAJA MATT1J00000541270A0
    51950300000001006030306030303022588731K050500000000234000095350OSTAJA OSSI 1J00000788460A0
    51950300000001006030306030303022588731K039900000000465000051612TUTTU TIMO  1J00000613490A0
    51950300000001006030306030303022588731K068200000000492000045542POUTA PILVI 1A00000170640A7
    51950300000001006030306030303022588731K958900000000518000085560MAKSAJA MAIJ1A00000120720A4
    51950300000001006030306030303022588731K001400000000810000090650OSSIN AUTO O1J00000177460A0
    900001100000860289000000000000000000000020000002913600000000000000000000000000000000000000
    """
    When I parse the file as KTL
    Then the result hash map should be
    """js
    {
      header: {
        creationDate: "2006-03-03",
        creationTime: "23:59",
        contractId: "011111111",
        bankAccountOwnerId: "44444444A",
        currencyId: '1',
        currency: 'EUR'
      },
      entries: [{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-02",
        archiveId: "03025LM     6545",
        referenceNumber: "13",
        payerShortName: "LOPEN PERUNA",
        currencyId: '1',
        currency: 'EUR',
        amount: 323.24
      },{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-03",
        archiveId: "03031950AA123185",
        referenceNumber: "455435",
        payerShortName: "TUTTU TIMO",
        currencyId: '1',
        currency: 'EUR',
        amount: 776.4
      },{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-03",
        archiveId: "03031950AA123678",
        referenceNumber: "844677",
        payerShortName: "POUTA PILVI",
        currencyId: '1',
        currency: 'EUR',
        amount: 851.5
      },{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-03",
        archiveId: "0303258877BA1234",
        referenceNumber: "890922",
        payerShortName: "KULMAN KAUPP",
        currencyId: '1',
        currency: 'EUR',
        amount: 1332.83
      },{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-03",
        archiveId: "0303258878014444",
        referenceNumber: "2535337",
        payerShortName: "KASVI KIELO",
        currencyId: '1',
        currency: 'EUR',
        amount: 1618.24
      },{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-03",
        archiveId: "0303258879025555",
        referenceNumber: "6678753",
        payerShortName: "HANNULA OY",
        currencyId: '1',
        currency: 'EUR',
        amount: 724.5
      },{
        bban: "19503000000010",
        bookingDate: "2006-03-03",
        paymentDate: "2006-03-03",
        archiveId: "0303258878BA0114",
        referenceNumber: "3088187",
        payerShortName: "NELLI & CO",
        currencyId: '1',
        currency: 'EUR',
        amount: 855.5
        },{
          bban: "56121120011066",
          bookingDate: "2017-09-15",
          paymentDate: "2017-09-15",
          archiveId: "0915593497GC1291",
          referenceNumber: "10000118530000711",
          "payerShortName": "KUISMA HEIDI",
          currencyId: "1",
          currency: "EUR",
          amount: 220.0
        }]
    }
    """
