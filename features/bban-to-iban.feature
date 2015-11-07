Feature: BBAN to IBAN
  Scenario Outline: convert
    Given BBAN <bban>
    When I convert the bban to IBAN
    Then the IBAN should be <iban>
    And the BIC should be <bic>

    Examples:
      | bban            | iban               | bic      |
      | 19503000000010  | FI4819503000000010 | NDEAFIHH |
      | 195030-10       | FI4819503000000010 | NDEAFIHH |
      | 405510-1234569  | FI1840551010234569 | HELSFIHH |
      | 500001-1238     | FI2350000110000238 | OKOYFIHH |
      | 445023-2105     | FI6144502320000105 | ITELFIHH |
      | 800013-70529498 | FI4280001370529498 | DABAFIHH |
