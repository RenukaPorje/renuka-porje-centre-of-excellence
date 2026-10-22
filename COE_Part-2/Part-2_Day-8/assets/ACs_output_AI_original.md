# Acceptance criteria: AI output

Product Detail user story, Practice Software Testing (Toolshop). Generated from the AC prompt, as received.

```gherkin
Feature: Product detail
  As a visitor,
  I want to view a product's details, add it to my cart, or save it to my favorites,
  so that I can purchase it or come back to it later.

  Rule: A visitor can view a product's details

    Scenario: Visitor opens a product's page
      Given the catalogue contains a hammer priced at $14.50
      When a visitor opens the hammer's page
      Then the page shows the hammer's name
      And the page shows the hammer's price of $14.50

    Scenario: Visitor opens a product that no longer exists
      Given the catalogue does not contain a product with the requested identifier
      When a visitor opens the page for that product
      Then the visitor should be told that the product could not be found

    Question parked: Confirm which details the page must show (for example description, image,
      stock status, category, brand) with the Product Owner or Business Analyst.
    Question parked: Confirm the exact wording of the message shown when a product cannot be
      found with the Product Owner or Business Analyst.

  Rule: A visitor can add a product to the cart

    Scenario: Visitor adds a product to the cart
      Given a visitor's cart is empty
      And the hammer priced at $14.50 is available
      When the visitor adds the hammer to the cart
      Then the cart holds 1 hammer
      And the cart total is $14.50
      And the visitor should see a confirmation that the hammer was added to the cart

    Scenario: Visitor adds a product that is already in the cart
      Given a visitor's cart holds 1 hammer priced at $14.50
      When the visitor adds the hammer to the cart
      Then the cart holds 2 hammers
      And the cart total is $29.00

    Scenario: Visitor adds a product that is out of stock
      Given the hammer is out of stock
      When a visitor views the hammer's page
      Then the visitor should be told that the hammer is out of stock
      And the hammer should not be available to add to the cart

    Question parked: Confirm whether a visitor can choose a quantity before adding, and the
      minimum and maximum quantity allowed per add, with the Product Owner or Business
      Analyst.
    Question parked: Confirm whether adding an already-carted product increases its quantity
      or is blocked, with the Product Owner or Business Analyst.
    Question parked: Confirm how an out-of-stock product is presented (for example a message,
      a disabled action) and the exact wording, with the Product Owner or Business Analyst.
    Question parked: Confirm the exact wording of the confirmation shown after adding a
      product to the cart with the Product Owner or Business Analyst.
    Question parked: Confirm whether a limit applies when the requested quantity exceeds the
      available stock, and what the visitor should see, with the Product Owner or Business
      Analyst.

  Rule: A visitor can save a product to their favorites

    Scenario: Logged-in visitor saves a product to their favorites
      Given a visitor is logged in as Jane Doe
      And Jane Doe's favorites do not contain the hammer
      When Jane Doe saves the hammer to her favorites
      Then the hammer appears in Jane Doe's favorites
      And Jane Doe should see a confirmation that the hammer was saved to her favorites

    Scenario: Logged-in visitor saves a product that is already in their favorites
      Given a visitor is logged in as Jane Doe
      And Jane Doe's favorites already contain the hammer
      When Jane Doe saves the hammer to her favorites
      Then Jane Doe's favorites contain the hammer once
      And Jane Doe should be told that the hammer is already in her favorites

    Scenario: Visitor who is not logged in saves a product to their favorites
      Given a visitor is not logged in
      When the visitor saves the hammer to their favorites
      Then the visitor should be asked to log in
      And the hammer should not appear in any favorites list

    Question parked: Confirm whether a visitor must be logged in to save a favorite with the
      Product Owner or Business Analyst.
    Question parked: Confirm what happens after a visitor who is not logged in logs in (for
      example whether the product is saved automatically) with the Product Owner or Business
      Analyst.
    Question parked: Confirm whether saving an already-saved product removes it, is blocked,
      or does nothing, and the exact wording of any message, with the Product Owner or
      Business Analyst.
    Question parked: Confirm the exact wording of the confirmation shown after saving a
      product to favorites with the Product Owner or Business Analyst.
    Question parked: Confirm whether a maximum number of favorites applies with the Product
      Owner or Business Analyst.
```
