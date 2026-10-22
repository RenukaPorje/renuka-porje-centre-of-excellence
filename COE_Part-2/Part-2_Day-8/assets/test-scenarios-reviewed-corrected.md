# Test scenarios (reviewed and refined)

| ID | Scenario | Type |
|---|---|---|
| TS-01 | Verify the product page shows the product's image, name, description, price, category and brand | Happy |
| TS-02 | Verify the product page shows the products related to the product | Happy |
| TS-03 | Verify the system shows a quantity of 1 by default when the page of an in-stock product opens | Happy |
| TS-04 | Verify a visitor can change the quantity to values within the allowed range | Happy |
| TS-05 | Verify a visitor can add an in-stock product to the cart in the selected quantity and receives a confirmation | Happy |
| TS-06 | Verify a logged-in visitor can save a product to their favorites and receives a confirmation | Happy |
| TS-07 | Verify a visitor can reach a product's page from the catalogue | Happy |
| TS-08 | Verify a visitor can reach a product's page from a related product | Happy |
| TS-09 | Verify the system displays a message saying the product could not be found when the page of a product that is not in the catalogue is opened | Negative |
| TS-10 | Verify the system displays a message saying the product is out of stock and does not allow it to be added to the cart | Negative |
| TS-11 | Verify a visitor who is not logged in cannot save a product to their favorites | Negative |
| TS-12 | Verify the system does not allow an empty or non-numeric quantity to be added to the cart | Negative |
| TS-13 | Verify the system does not display a product and shows an error or not-found message when the product address is malformed | Negative |
| TS-14 | Verify a quantity below the lower limit is handled at and beyond the boundary | Edge |
| TS-15 | Verify a quantity above the upper limit is handled at and beyond the boundary | Edge |
| TS-16 | Verify saving a product that is already in the visitor's favorites does not create a duplicate | Edge |

## Traceability matrix

| REQ ID | Description | AC | Scenario IDs |
|---|---|---|---|
| REQ-01 | Product details displayed | Visitor opens a product's page | TS-01 |
| REQ-02 | Related products displayed | Visitor sees related products | TS-02 |
| REQ-03 | Product not in catalogue | Visitor opens a product that is not in the catalogue | TS-09 |
| REQ-04 | Not-found message wording (open point) | Question parked: not-found message wording | Not covered: question parked |
| REQ-05 | Quantity starts at 1 | Quantity starts at 1 | TS-03 |
| REQ-06 | Quantity within limits accepted | Quantity within the limits is accepted | TS-04 |
| REQ-07 | Quantity below 1 resets to 1 | Quantity below 1 resets to 1 | TS-14 |
| REQ-08 | Quantity above 999,999,999 resets to 999,999,999 | Quantity above 999,999,999 resets to 999,999,999 | TS-15 |
| REQ-09 | Add in-stock product to cart in selected quantity | Visitor adds a product to the cart; Visitor adds the selected quantity to the cart | TS-05 |
| REQ-10 | Out-of-stock product | Visitor opens a product that is out of stock | TS-10 |
| REQ-11 | Product already in cart (open point) | Question parked: product already in the cart | Not covered: question parked |
| REQ-12 | Quantity exceeds available stock (open point) | Question parked: quantity exceeds stock | Not covered: question parked |
| REQ-13 | Rental item handling (open point) | Question parked: rental item | Not covered: question parked |
| REQ-14 | Logged-in visitor saves to favorites | Logged-in visitor saves a product to their favorites | TS-06 |
| REQ-15 | Product already in favorites | Logged-in visitor saves a product that is already in their favorites | TS-16 |
| REQ-16 | Visitor not logged in saves to favorites | Visitor who is not logged in saves a product to their favorites | TS-11 |
| REQ-17 | Saved indicator on the page (open point) | Question parked: product shown as saved on its page | Not covered: question parked |
| REQ-18 | Maximum number of favorites (open point) | Question parked: maximum number of favorites | Not covered: question parked |
| - | No requirement behind the scenario | - | TS-07, TS-08, TS-12, TS-13 (domain knowledge) |
