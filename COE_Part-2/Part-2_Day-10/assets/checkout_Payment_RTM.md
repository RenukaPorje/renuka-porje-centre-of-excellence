# Requirements traceability matrix: Checkout Payment

| REQ ID | Description | AC | Priority | Test case IDs | Execution status | Defect IDs | Defect status |
|---|---|---|---|---|---|---|---|
| REQ-01 | Payment methods offered at the Payment step | AC-01 | High | TC-01 | Not run | - | - |
| REQ-02 | Payment method must be chosen before confirming | AC-02 | High | TC-19 | Not run | - | - |
| REQ-03 | Bank Transfer asks for bank name, account name and account number | AC-03 | Medium | TC-02 | Not run | - | - |
| REQ-04 | Bank name accepts letters and spaces only | AC-04, AC-05 | Medium | TC-02, TC-20 to TC-22 | Not run | - | - |
| REQ-05 | Account name accepts letters, digits, spaces, periods, apostrophes and hyphens only | AC-06, AC-07 | Medium | TC-02, TC-10 to TC-13, TC-23 to TC-25 | Not run | - | - |
| REQ-06 | Account number accepts digits only | AC-08, AC-09 | Medium | TC-02, TC-26 to TC-28 | Not run | - | - |
| REQ-07 | All three Bank Transfer details required | AC-10 | Medium | TC-29 to TC-32 | Not run | - | - |
| REQ-08 | Credit Card asks for card number, expiration date, CVV and card holder name | AC-11 | Medium | TC-04 | Not run | - | - |
| REQ-09 | Card number as four groups of four digits with hyphens | AC-12, AC-13 | High | TC-04, TC-33 to TC-36, TC-55 to TC-57 | Not run | - | - |
| REQ-10 | Expiration date in the accepted form | AC-14 | Medium | TC-04, TC-37 to TC-39, TC-58 to TC-63 | Not run | - | - |
| REQ-11 | CVV of 3 or 4 digits | AC-15, AC-16 | Medium | TC-04, TC-42, TC-66 to TC-69, TC-78, TC-79 | Not run | - | - |
| REQ-12 | Card holder name accepts letters and spaces only | AC-17, AC-18 | Medium | TC-04, TC-43 to TC-46 | Not run | - | - |
| REQ-13 | Card must expire after the current month | AC-19, AC-20 | High | TC-04, TC-18, TC-40, TC-41, TC-64, TC-65 | Not run | - | - |
| REQ-14 | Buy Now Pay Later offers monthly instalment options | AC-21 | Medium | TC-05 | Not run | - | - |
| REQ-15 | Any offered number of instalments accepted | AC-22 | Medium | TC-05, TC-07 to TC-09 | Not run | - | - |
| REQ-16 | Number of instalments must be chosen | AC-23 | Medium | TC-47 | Not run | - | - |
| REQ-17 | Gift Card asks for gift card number and validation code | AC-24 | Medium | TC-06 | Not run | - | - |
| REQ-18 | Gift card number of exactly 16 letters or digits | AC-25, AC-26 | Medium | TC-06, TC-14, TC-15, TC-48 to TC-50, TC-70 to TC-72 | Not run | - | - |
| REQ-19 | Validation code of exactly 4 letters or digits | AC-27, AC-28 | Medium | TC-06, TC-16, TC-17, TC-51, TC-73 to TC-75, TC-80, TC-81 | Not run | - | - |
| REQ-20 | Both Gift Card details required | AC-29 | Medium | TC-52 to TC-54 | Not run | - | - |
| REQ-21 | Cash on Delivery asks for no details | AC-30 | Medium | TC-03 | Not run | - | - |
| REQ-22 | Details cleared when the payment method is changed | AC-31 | Medium | TC-76 | Not run | - | - |
| REQ-23 | Details cleared when the shopper leaves and returns to the step | AC-32 | Medium | TC-77 | Not run | - | - |
| REQ-24 | Order placed with invoice number on confirming | AC-33 | High | TC-02 to TC-06 | Not run | - | - |
| REQ-25 | Cart emptied once the order is placed | AC-34 | High | TC-02 to TC-06 | Not run | - | - |
| REQ-26 | Checkout confirmation email sent after the order | AC-35 | Medium | TC-02 to TC-06 | Not run | - | - |

* Open questions that are not yet confirmed requirements are not part of this matrix. See the 'Open questions' tab.

## Open questions

These are open questions raised while writing the acceptance criteria. They have no expected result yet, so they are not confirmed requirements and are not part of the requirement traceability matrix. They stay here until they are answered, and have no test cases or execution status yet.

| Question ID | Open question | Related AC | Priority | Status |
|---|---|---|---|---|
| Q-01 | Is any payment method already chosen when the shopper arrives at the Payment step? | AC-01 to AC-02 | Low | Open |
| Q-02 | Is any payment method offered only for certain order totals or billing countries? | AC-01 to AC-02 | Low | Open |
| Q-03 | What are the minimum and maximum lengths of the bank name? | AC-03 to AC-10 | Medium | Open |
| Q-04 | What are the minimum and maximum lengths of the account name? | AC-03 to AC-10 | Medium | Open |
| Q-05 | What are the minimum and maximum number of digits in the account number? | AC-03 to AC-10 | Medium | Open |
| Q-06 | Is a bank name or account name made up only of spaces accepted? | AC-03 to AC-10 | Low | Open |
| Q-07 | Which Credit Card details are mandatory? | AC-11 to AC-18 | High | Open |
| Q-08 | Is the card number checked beyond its form, for example against the card issuer? | AC-11 to AC-18 | Medium | Open |
| Q-09 | Does the CVV length depend on the type of card? | AC-11 to AC-18 | Low | Open |
| Q-10 | What are the minimum and maximum lengths of the card holder name? | AC-11 to AC-18 | Low | Open |
| Q-11 | What is the latest expiration date that is accepted? | AC-19, AC-20 | Low | Open |
| Q-12 | Is the shopper told the amount of each monthly instalment before placing the order? | AC-21 to AC-23 | Medium | Open |
| Q-13 | Is Buy Now Pay Later limited to a minimum or maximum order total? | AC-21 to AC-23 | Medium | Open |
| Q-14 | Is any interest or fee added to the order total for Buy Now Pay Later? | AC-21 to AC-23 | Medium | Open |
| Q-15 | Are the gift card number and validation code case sensitive? | AC-24 to AC-29 | Low | Open |
| Q-16 | What happens when the gift card value is less than the order total? | AC-24 to AC-29 | High | Open |
| Q-17 | Is Cash on Delivery limited to a maximum order total? | AC-30 | Low | Open |
| Q-18 | Is the shopper warned before the details provided are cleared by a change of payment method? | AC-31 | Low | Open |
| Q-19 | Is the chosen payment method kept when the shopper comes back to the Payment step? | AC-32 | Low | Open |
| Q-20 | What is the format of the invoice number? | AC-33 to AC-35 | Low | Open |
| Q-21 | What is the shopper told when a payment is refused by the bank or card issuer? | AC-33 to AC-35 | High | Open |
| Q-22 | Does confirming the payment more than once place more than one order? | AC-33 to AC-35 | High | Open |
| Q-23 | What must the checkout confirmation email contain, including whether it shows the invoice number? | AC-33 to AC-35 | Medium | Open |
| Q-24 | How soon after the order is placed must the checkout confirmation email arrive? | AC-33 to AC-35 | Low | Open |
