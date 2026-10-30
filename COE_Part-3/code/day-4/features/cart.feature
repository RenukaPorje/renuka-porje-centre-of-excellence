Feature: Checkout Flow - Cart review
  User story: As a shopper, I want to be able to access the cart
    so that I can review that the cart details are correct.

  Scenario: Display cart contents
    Given the shopper’s cart holds 2 Slip Joint Pliers priced at $9.17
    When the shopper views the cart
    Then the cart should show the item’s name, quantity, unit price and line total
    And the cart total should be $18.34

  Scenario: Empty cart
    Given the shopper does not have any items in the cart
    When the shopper views the cart
    Then the shopper should be told that the cart is empty
    And checkout should be unavailable

  Scenario: Updating quantity
    Given the shopper’s cart holds 2 Slip Joint Pliers priced at $9.17
    When the shopper changes the quantity from 2 to 3
    Then the item total and cart total should be $27.51
    And the shopper should see a confirmation that the quantity was updated

  Scenario: Delete item
    Given the shopper’s cart holds Slip Joint Pliers priced at $9.17 and Bolt Cutters priced at $48.41
    When the shopper deletes the Bolt Cutters
    Then the cart should hold only the Slip Joint Pliers
    And the cart total should be $9.17
    And the shopper should see a confirmation that the item was removed
    
  Rule: Quantity must be between 1 and 99

    Scenario Outline: Quantity below 1 resets to 1
      Given the shopper’s cart holds 4 Slip Joint Pliers priced at $9.17
      When the shopper changes the quantity from 4 to <entered quantity>
      Then the quantity should reset to 1
      And the item total and cart total should be $9.17

      Examples:
        | entered quantity |
        | -1 |
        | 0 |

    Scenario Outline: Quantity above 99 resets to 99
      Given the shopper’s cart holds 2 Slip Joint Pliers priced at $9.17
      When the shopper changes the quantity from 2 to <entered quantity>
      Then the shopper should be warned that the maximum quantity is 99
      And the quantity should reset to 99
      And the item total and cart total should be $907.83

      Examples:
        | entered quantity |
        | 100 |
        | 101 |
        | 9999 |