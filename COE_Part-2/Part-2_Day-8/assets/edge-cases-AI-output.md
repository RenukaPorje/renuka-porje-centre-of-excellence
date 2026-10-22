# Edge cases (AI output)

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
| TS-17 | Verify the product page opens correctly when the product has no related products | Edge |
| TS-18 | Verify the related products do not include the product being viewed | Edge |
| TS-19 | Verify the product page opens correctly when the product has no image | Edge |
| TS-20 | Verify the product page shows a product name and description that contain special characters or markup as plain text | Edge |
| TS-21 | Verify the handling of a decimal quantity, such as 2.5, entered on the product page | Edge |
| TS-22 | Verify the handling of a quantity entered with leading zeros or in exponent notation | Edge |
| TS-23 | Verify the quantity when it is changed by one step down from 1 and by one step up from 999999999 | Edge |
| TS-24 | Verify the selected quantity after the product page is refreshed with a changed quantity | Edge |
| TS-25 | Verify the quantity added to the cart when a visitor types a quantity and adds the product without leaving the quantity field | Edge |
| TS-26 | Verify the handling of adding a product to the cart when it went out of stock after the page was opened | Edge |
| TS-27 | Verify the handling of adding a product to the cart or saving it to favorites when it was removed from the catalogue after the page was opened | Negative |
| TS-28 | Verify the handling of saving a product to favorites when the visitor's login session ended after the page was opened | Negative |
| TS-29 | Verify the favorites contain the product once when the save action is triggered twice in quick succession | Edge |
| TS-30 | Verify the handling of saving an out-of-stock product to the favorites of a logged-in visitor | Edge |

## Traceability matrix

| REQ ID | Description | AC | Scenario IDs |
|---|---|---|---|
| REQ-01 | Product details displayed | Visitor opens a product's page | TS-01, TS-19, TS-20 |
| REQ-02 | Related products displayed | Visitor sees related products | TS-02, TS-17, TS-18 |
| REQ-03 | Product not in catalogue | Visitor opens a product that is not in the catalogue | TS-09, TS-27 |
| REQ-04 | Not-found message wording (open point) | Question parked: not-found message wording | Not covered: question parked |
| REQ-05 | Quantity starts at 1 | Quantity starts at 1 | TS-03, TS-24 |
| REQ-06 | Quantity within limits accepted | Quantity within the limits is accepted | TS-04 |
| REQ-07 | Quantity below 1 resets to 1 | Quantity below 1 resets to 1 | TS-14, TS-23 |
| REQ-08 | Quantity above 999,999,999 resets to 999,999,999 | Quantity above 999,999,999 resets to 999,999,999 | TS-15, TS-23 |
| REQ-09 | Add in-stock product to cart in selected quantity | Visitor adds a product to the cart; Visitor adds the selected quantity to the cart | TS-05, TS-25, TS-26, TS-27 |
| REQ-10 | Out-of-stock product | Visitor opens a product that is out of stock | TS-10, TS-26 |
| REQ-11 | Product already in cart (open point) | Question parked: product already in the cart | Not covered: question parked |
| REQ-12 | Quantity exceeds available stock (open point) | Question parked: quantity exceeds stock | Not covered: question parked |
| REQ-13 | Rental item handling (open point) | Question parked: rental item | Not covered: question parked |
| REQ-14 | Logged-in visitor saves to favorites | Logged-in visitor saves a product to their favorites | TS-06, TS-27, TS-28, TS-30 |
| REQ-15 | Product already in favorites | Logged-in visitor saves a product that is already in their favorites | TS-16, TS-29 |
| REQ-16 | Visitor not logged in saves to favorites | Visitor who is not logged in saves a product to their favorites | TS-11, TS-28 |
| REQ-17 | Saved indicator on the page (open point) | Question parked: product shown as saved on its page | Not covered: question parked |
| REQ-18 | Maximum number of favorites (open point) | Question parked: maximum number of favorites | Not covered: question parked |
| - | No requirement behind the scenario | - | TS-07, TS-08, TS-12, TS-13, TS-21, TS-22 (domain knowledge) |
