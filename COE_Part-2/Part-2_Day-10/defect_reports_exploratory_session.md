# Defect reports: Checkout payment exploratory session (CH-01)

## DEF-023

| Field | Value |
| --- | --- |
| ID | DEF-023 |
| Title | “Unknown error” shown on Confirm with empty Credit Card number |
| Feature | Checkout – Payment |
| User story | Checkout – Payment (Advanced), checkout-payment-advanced: https://testsmith-io.github.io/practice-software-testing/#/user-stories/v5?id=checkout-payment-advanced |
| Description | With Credit Card chosen on the Payment step, leaving the Card number field empty and selecting Confirm shows the message “Unknown error” every time, for Jane Doe with Bolt Cutters in the cart. The message does not tell the shopper what is wrong or what to correct. The state of the other card fields is not provided. |
| Reported by | Renuka |
| Date reported | 21 October 2026 |
| Test environment | https://with-bugs.practicesoftwaretesting.com, Google Chrome |
| Build version | Not provided |
| Steps to reproduce | 1. On the Payment step, choose Credit Card.<br>2. Leave the Card number field empty.<br>3. Select Confirm. |
| Expected result | The shopper is told what needs correcting, in a message they can understand. The criteria do not define the message or say whether the card number is mandatory (parked question). |
| Actual result | The message “Unknown error” is displayed instead of a message that says what is wrong. The message appears at the bottom of the page, next to the Confirm button. |
| Severity | Medium. The main flow works with a visible fault, and the shopper cannot tell how to continue. |
| Priority | Medium |
| Status | New |
| Impact | Other empty or invalid card details may give the same message. Shoppers may abandon the payment. |
| Evidence | Screenshot. File name: unknown-error-for-card-number.png |

## DEF-024

| Field | Value |
| --- | --- |
| ID | DEF-024 |
| Title | Cart review shows quantity 1 after three Add to cart clicks |
| Feature | Product Detail |
| User story | Product Detail, Toolshop user stories v5: https://github.com/testsmith-io/practice-software-testing/blob/main/docs/user-stories/v5.md |
| Description | On the Bolt Cutters product detail page, selecting Add to cart three times as Jane Doe shows a quantity of 3 in the header cart and the success message on each click, while Cart review shows a quantity of 1. The shopper cannot tell how many items are in the cart. It happened intermittently. |
| Reported by | Renuka |
| Date reported | 21 October 2026 |
| Test environment | https://with-bugs.practicesoftwaretesting.com, Google Chrome |
| Build version | Not provided |
| Steps to reproduce | 1. Open the Bolt Cutters product detail page.<br>2. Select Add to cart three times.<br>3. Select the Cart icon. |
| Expected result | The header and Cart review show the same quantity. The criteria do not say whether adding a product already in the cart increases its quantity (parked question). |
| Actual result | The header shows a quantity of 3 and the success message appears on each click. Cart review shows a quantity of 1. |
| Severity | High. The quantity is wrong in one of the two places. |
| Priority | Medium |
| Status | New |
| Impact | The shopper may order a different quantity from the one added. The order total may be wrong. |
| Evidence | Attachment |

## DEF-025

| Field | Value |
| --- | --- |
| ID | DEF-025 |
| Title | No response when Confirm is selected with empty card holder name |
| Feature | Checkout – Payment |
| User story | Checkout – Payment (Advanced), checkout-payment-advanced: https://testsmith-io.github.io/practice-software-testing/#/user-stories/v5?id=checkout-payment-advanced |
| Description | With Credit Card chosen and Bolt Cutters in the cart, Jane Doe leaving the Card holder name field empty and selecting Confirm gets no response, and no error or warning is shown. The shopper cannot tell why the payment does not go ahead. The frequency is not provided. |
| Reported by | Renuka |
| Date reported | 21 October 2026 |
| Test environment | https://with-bugs.practicesoftwaretesting.com, Google Chrome |
| Build version | Not provided |
| Steps to reproduce | 1. On the Payment step, choose Credit Card.<br>2. Leave the Card holder name field empty.<br>3. Select Confirm. |
| Expected result | Not defined. The criteria do not say whether the card holder name is mandatory (parked question). Either the payment goes ahead or the shopper is told what is missing. |
| Actual result | Nothing happens on selecting Confirm. No error or warning message is displayed. |
| Severity | Medium. The main flow stops with no explanation. |
| Priority | Medium |
| Status | New |
| Impact | Other card fields may behave the same way. Shoppers may abandon the payment. |
| Evidence | Attachment |
