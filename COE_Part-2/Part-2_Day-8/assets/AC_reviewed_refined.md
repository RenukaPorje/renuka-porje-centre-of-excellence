# Acceptance criteria: reviewed and refined

```gherkin
Feature: Product detail
  As a visitor,
  I want to view a product's details, add it to my cart, or save it to my favorites,
  so that I can purchase it or come back to it later.

  Rule: A visitor can view a product's details

    Scenario: Visitor opens a product's page
      Given the catalogue contains a hammer priced at $14.50
      When a visitor opens the hammer's page
      Then the page should show the hammer's image, name, description and price
      And the page should show the hammer's category and brand

    Scenario: Visitor sees related products
      Given the catalogue contains a hammer and products related to it
      When a visitor opens the hammer's page
      Then the page should show the products related to the hammer

    Scenario: Visitor opens a product that is not in the catalogue
      Given the catalogue does not contain combination pliers
      When a visitor opens the page for combination pliers
      Then the visitor should be told that combination pliers could not be found

    Question parked: Confirm the exact wording of the message shown when a product cannot be
      found with the Product Owner or Business Analyst.

  Rule: Quantity must be between 1 and 999,999,999

    Scenario: Quantity starts at 1
      Given the catalogue contains a hammer that is in stock
      When a visitor opens the hammer's page
      Then the selected quantity should be 1

    Scenario Outline: Quantity within the limits is accepted
      Given a visitor is viewing a hammer that is in stock
      When the visitor changes the quantity to <entered quantity>
      Then the selected quantity should be <entered quantity>

      Examples:
        | entered quantity |
        | 1 |
        | 2 |
        | 50 |
        | 999999999 |

    Scenario Outline: Quantity below 1 resets to 1
      Given a visitor is viewing a hammer that is in stock
      When the visitor changes the quantity to <entered quantity>
      Then the selected quantity should reset to 1

      Examples:
        | entered quantity |
        | -1 |
        | 0 |

    Scenario Outline: Quantity above 999,999,999 resets to 999,999,999
      Given a visitor is viewing a hammer that is in stock
      When the visitor changes the quantity to <entered quantity>
      Then the selected quantity should reset to 999999999

      Examples:
        | entered quantity |
        | 1000000000 |
        | 1000000001 |

  Rule: A visitor can add a product that is in stock to the cart

    Scenario: Visitor adds a product to the cart
      Given the hammer is in stock
      And the visitor has selected a quantity of 1
      When the visitor adds the hammer to the cart
      Then the visitor should see a confirmation that the hammer was added to the cart
      And the cart should hold 1 hammer

    Scenario: Visitor adds the selected quantity to the cart
      Given the hammer is in stock
      And the visitor has selected a quantity of 3
      When the visitor adds the hammer to the cart
      Then the visitor should see a confirmation that the hammer was added to the cart
      And the cart should hold 3 hammers

    Scenario: Visitor opens a product that is out of stock
      Given the hammer is out of stock
      When a visitor opens the hammer's page
      Then the visitor should be told that the hammer is out of stock
      And the hammer should not be available to add to the cart

    Question parked: Confirm whether adding a product that is already in the cart increases
      its quantity or is blocked with the Product Owner or Business Analyst.
    Question parked: Confirm what the visitor should see when the quantity exceeds the
      available stock with the Product Owner or Business Analyst.
    Question parked: Confirm how a rental item is handled on this page, since the out-of-stock
      rule excludes rental items, with the Product Owner or Business Analyst.

  Rule: A visitor can save a product to their favorites

    Scenario: Logged-in visitor saves a product to their favorites
      Given a visitor is logged in as Jane Doe
      And Jane Doe's favorites do not contain the hammer
      When Jane Doe saves the hammer to her favorites
      Then the hammer should appear in Jane Doe's favorites
      And Jane Doe should see a confirmation that the hammer was added to her favorites

    Scenario: Logged-in visitor saves a product that is already in their favorites
      Given a visitor is logged in as Jane Doe
      And Jane Doe's favorites already contain the hammer
      When Jane Doe saves the hammer to her favorites
      Then Jane Doe's favorites should contain the hammer once
      And Jane Doe should be told that the hammer is already in her favorites

    Scenario: Visitor who is not logged in saves a product to their favorites
      Given a visitor is not logged in
      When the visitor saves the hammer to their favorites
      Then the visitor should be told that they are not authorised to add a product to their
        favorites

    Question parked: Confirm whether a product that is already in a user's favorites is shown
      as saved on its page with the Product Owner or Business Analyst.
    Question parked: Confirm whether a maximum number of favorites applies with the Product
      Owner or Business Analyst.
```
