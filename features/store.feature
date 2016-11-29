Feature: A shopping web page
  The web store should work on web browsers and mobile devices
  The main product should use a regular thumbnail image
  All other products should use the small thumbnail image

  Scenario: Change the product shown in the main product
    Given I am on the store web page
    When  I click on the "View More" button
    Then that product is shown in the mainProduct

  Scenario: Add the main product to the cart
    Given I am on the store web page
    When I click on the "Add to Cart" button
    Then an alert appears with the correct price

  Scenario: Change the main product and add it to the cart
    Given I am on the store web page
    When  I click on the "View More" button
    And I click on the "Add to Cart" button
    Then an alert appears with the correct price