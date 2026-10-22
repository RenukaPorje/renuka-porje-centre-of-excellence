# Exploratory test charter and session sheet

Part 1 is written before the session. Part 2 is filled in during and after it. The charter fields follow the ISTQB CTAL Test Analyst syllabus v4.0, section 3.4.1. The session sheet follows the sections in Bach's Session-Based Test Management article and the session sheet described in the same syllabus (p. 38).

## Part 1: Charter

| Field | Entry |
| --- | --- |
| Charter ID | CH-01 |
| Mission | Explore: the handoffs into and out of the Payment step, and the switching of payment methods<br>With: interruptions (back, refresh, repeated clicks, leaving and returning)<br>To discover: whether the cart, the entered details and the order stay consistent |
| Feature or user story | Checkout – Payment (Advanced), Toolshop v5 (checkout-payment-advanced) |
| Scope and test objectives | In scope: Billing Address to Payment, switching between payment methods, Payment to order confirmation.<br>Out of scope: cart review, sign-in, the content of the billing address, field-by-field validation (covered by the scripted cases).<br>Objectives: find defects in these areas, and record what the application does where the criteria give no expected result. |
| Session duration (time-box) | 45 minutes |
| Start date and time | 21.10.26, 4:00 PM |
| Tester | Renuka |
| Test environment | Sprint 5<br>https://with-bugs.practicesoftwaretesting.com, Google Chrome.<br>Build version: |
| Data sources and tools | Test customer account with a cart holding one item. Screenshots for evidence. |
| Historical information | Open questions with no expected result yet: G13 (refresh and back), G14 (session timeout and logout), Q-19 (chosen method kept on return), Q-22 (confirming more than once). |
| Constraints and risks | The system must never place an order without a chosen payment method or with details the criteria reject (AC-02, AC-05 and others), and the cart must be empty once an order is placed (AC-34).<br>Payment is simulated, so no real money is involved.<br>Expected results for refresh, back, timeout, and repeated confirmation are not defined, so findings there are recorded as observations and questions. |
| Test basis | Acceptance criteria file (AC-01 to AC-35), the test scenarios and the Open questions tab. |

## Part 2: Session sheet

| Field | Entry |
| --- | --- |
| Charter ID | CH-01 |
| Tester and start time | Renuka, 21.10.26, 4:00 PM |
| Duration | Planned for 45 minutes. Actual: 50 minutes (4:00 to 4:50 PM) |
| Time split | Testing (designing and running tests): about 25 mins (50%)<br>Investigating and reporting bugs: about 12 mins (25%)<br>Setup (account, cart, data, reading): about 13 mins (25%) |
| On charter or opportunity | Percent of the time spent on the charter: about 88% (44 mins)<br>Percent spent on other areas that looked important: about 12% (6 mins), add to cart on the product detail page |
| Data files and evidence | Screenshot attached to DEF-023 (unknown-error-for-card-number.png). No recording for DEF-024, as it was intermittent. |

### Test notes

One line per action: the time, what I tried, what I saw, and a tag. B for a bug (the product behaves wrongly), I for an issue (something that blocks or confuses the testing), Q for a question.

| Time | What I tried | What I saw | Tag |
| --- | --- | --- | --- |
| 4:05 PM | Clicking back from the payment step | Takes you back to the product detail page, and not the billing address step page as assumed | Q |
| 4:08 PM | Refreshing payment step | Takes you back to Cart review page, does not persist or save the selected method, or field inputs | Q, I |
| 4:10 PM | Checked if this behaviour (Back, Refresh) is across all methods | Yes, this behaviour is consistent across methods |  |
| 4:13 PM | Session timeout | Logs the user out, saves the cart and allows user to log back in to persisting cart. Although one would have to start over from Product detail page and not payment step itself | Q |
| 4:15 PM | Checkout payment button across methods | For Bank Transfer, unless valid inputs are entered for all fields, this button stays disabled and the shopper cannot check the payment. Buy Now Pay Later and Gift Card behave the same way. But for the Credit Card option, the button is enabled from the start, whether or not the inputs are entered and correct. | I, Q |
| 4:20 PM | Order confirmation page for Gift card, back button | Takes the user back to the product detail page |  |
| 4:23 PM | As part of test prep, Add to Cart | Noticed that clicking the add to cart button on the product detail page shows a quantity of 3 after three clicks. The success message also appears each time, three times in all. But when you click on the cart, the Cart review only shows a quantity of 1. | B, I |
| 4:26 PM | Cash on Delivery | Selecting Cash on Delivery and clicking Confirm displays the message “Payment successful”. It does not break anything, but it can be confusing, because the payment is pending and is only complete once it is received on delivery. | Q |
| 4:30 PM | Credit Card method, card number field left empty, then Confirm | Leaving the Card number field empty and clicking Confirm gives “Unknown error” instead of a precise warning the user can understand. | B, Q |
| 4:31 PM | Credit Card method, card holder name field left empty, then Confirm | Leaving the Card holder name field empty and clicking Confirm gives no error and no indication that it is required to move ahead. Nothing happens on clicking the button, and there is no warning or error message. The criteria do not say whether this field is mandatory (Q-07), so the expected result is not defined. Either way, the shopper is given no reason why they cannot continue. | B, Q |
| After 4:31 PM | Method switching: switched between the payment methods | The fields for the chosen method appear each time. Values typed under the earlier method do not carry over to the new one. |  |
| After 4:31 PM | Confirming more than once | Nothing unexpected happened. |  |

### Bugs

| No. | Short description | Evidence | Defect ID |
| --- | --- | --- | --- |
| 1 | When the Card number field is left empty and user clicks on Confirm, gives a “Unknown error” instead of giving a precise warning for user’s understanding. Exact wording of error message to be confirmed | Screenshot | DEF-023 |
| 2 | On product detail page, when user clicks on Add to cart button 3 times, the items get added successfully to the cart in the headers with quantity as 3. The success message also appears thrice, triggered on each click. But when user clicks on the Cart icon, the Cart Review shows the quantity of 1 only. | Not provided | DEF-024 |
| 3 | With the Credit Card method, when the Card holder name field is left empty and the user clicks Confirm, nothing happens and no warning or error message is shown. Whether the field is mandatory is an open question (Q-07). |  | DEF-025 |

### Issues and questions

| No. | Issue or question | Directed to |
| --- | --- | --- |
| 1 | Back from the Payment step goes to the product detail page, not the Billing Address step as I assumed. Is this intended? | Developer, Product Owner |
| 2 | Refreshing the Payment step returns the user to the Cart review page and does not keep the selected method or the inputs. Is this intended? (G13) | Developer, Product Owner |
| 3 | After a session timeout the user is logged out and the cart is saved, but they have to start again from the product detail page and not the Payment step. What should happen here? (G14) | Developer, Product Owner |
| 4 | The button on the Credit Card method is enabled from the start, while it stays disabled for the other methods until valid inputs are entered. Is this intended, and which Credit Card fields are mandatory? (Q-07) | Product Owner, Business Analyst |
| 5 | Cash on Delivery shows “Payment successful” although the payment is only complete on delivery. Should the message say the order is placed and payment is due on delivery? | Product Owner |

### Debrief

A short review of the session, written here because I am working alone. It follows PROOF.

|  | Guiding questions | notes |
| --- | --- | --- |
| Past | What I actually did, in order. | Handoff checks from 4:05 PM: back, refresh and session timeout, and whether they behave the same across all methods. Then the button states and back from the Gift Card confirmation page. Add to cart, about 6 minutes, off charter. Then Cash on Delivery and Credit Card with empty fields. After 4:31 PM, method switching and confirming more than once. The session ran 5 minutes over the 45 planned. |
| Results | What I found, including defects and what behaved as expected. | Three defects raised: DEF-023 (Unknown error for an empty card number), DEF-024 (add to cart quantity) and DEF-025 (no feedback for an empty card holder name). Five questions logged for the Developer, Product Owner and Business Analyst. Back, refresh and timeout behaved the same across all methods, and the observations are recorded against G13 and G14. Method switching showed the right fields and cleared earlier values, as the criteria say. Confirming more than once showed nothing unexpected. |
| Obstacles | What got in the way, such as the environment or missing information. | Expected results are not defined for back, refresh, timeout, the button states and the Cash on Delivery message, so most findings are questions. The with-bugs build does not say which behaviours are seeded. |
| Outlook | What is left to test and what the next session should cover. | Add to cart, field validation, and the Billing and Sign in pages carry over to the next charter. |
| Feelings | How confident I am in this area after the session. | Fairly confident about back, refresh, timeout and method switching, which behaved consistently. |

### Follow-up charters

| No. | Area still to explore |
| --- | --- |
| 1 | Add to cart,Order confirmation's Email verification |
| 2 | Field validations |
| 3 | Billing and Sign in pages |
