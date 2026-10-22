# Test scenarios: Checkout Payment

| ID | Scenario | Type |
|---|---|---|
| TS-01 | Verify the Payment step offers Bank Transfer, Cash on Delivery, Credit Card, Buy Now Pay Later and Gift Card | Happy |
| TS-02 | Verify a shopper can place an order with Bank Transfer, using a valid bank name, account name and account number, and gets an invoice number, an empty cart and the confirmation email | Happy |
| TS-03 | Verify a shopper can place an order with Cash on Delivery, with no payment details, and gets an invoice number, an empty cart and the confirmation email | Happy |
| TS-04 | Verify a shopper can place an order with Credit Card, using a valid card number, expiration date, CVV and card holder name, and gets an invoice number, an empty cart and the confirmation email | Happy |
| TS-05 | Verify a shopper can place an order with Buy Now Pay Later, choosing one of the offered numbers of monthly instalments, and gets an invoice number, an empty cart and the confirmation email | Happy |
| TS-06 | Verify a shopper can place an order with Gift Card, using a valid gift card number and validation code, and gets an invoice number, an empty cart and the confirmation email | Happy |
| TS-07 | Verify each of the other offered numbers of monthly instalments is accepted | Happy |
| TS-08 | Verify an account name containing a period, an apostrophe, a hyphen or a digit is accepted | Happy |
| TS-09 | Verify a gift card number made of letters only, or of digits only, is accepted | Happy |
| TS-10 | Verify a validation code made of letters only, or of digits only, is accepted | Happy |
| TS-11 | Verify a card expiration date in a later year is accepted | Happy |
| TS-12 | Verify the system does not allow the order to be placed when the payment is confirmed without a payment method chosen | Negative |
| TS-13 | Verify a bank name containing characters other than letters and spaces is rejected | Negative |
| TS-14 | Verify an account name containing characters that are not allowed is rejected | Negative |
| TS-15 | Verify an account number containing characters other than digits is rejected | Negative |
| TS-16 | Verify the system does not allow the order to be placed when a required Bank Transfer detail is left out | Negative |
| TS-17 | Verify a card number in another form is rejected | Negative |
| TS-18 | Verify an expiration date in another form is rejected | Negative |
| TS-19 | Verify a card expiration date in a month before the current month is rejected | Negative |
| TS-20 | Verify a CVV containing characters other than digits is rejected | Negative |
| TS-21 | Verify a card holder name containing characters other than letters and spaces is rejected | Negative |
| TS-22 | Verify the system does not allow the order to be placed when Buy Now Pay Later is chosen without a number of monthly instalments | Negative |
| TS-23 | Verify a gift card number containing characters other than letters and digits is rejected | Negative |
| TS-24 | Verify a validation code containing characters other than letters and digits is rejected | Negative |
| TS-25 | Verify the system does not allow the order to be placed when a required Gift Card detail is left out | Negative |
| TS-26 | Verify the card number length is enforced at and beyond the boundary | Edge |
| TS-27 | Verify the expiration month limits are enforced at and beyond both boundaries | Edge |
| TS-28 | Verify the current month is rejected and the month after it is accepted as the card expiration date | Edge |
| TS-29 | Verify the CVV length limits are enforced at and beyond both boundaries | Edge |
| TS-30 | Verify the gift card number length is enforced at and beyond the boundary | Edge |
| TS-31 | Verify the validation code length is enforced at and beyond the boundary | Edge |
| TS-32 | Verify the details provided for a payment method are cleared after changing to another method and back | Edge |
| TS-33 | Verify the payment details are cleared and the cart total is unchanged when the shopper leaves the Payment step and returns | Edge |
