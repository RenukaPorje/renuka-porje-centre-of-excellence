# Test Plan: Checkout - Payment (Sprint 05)

### 1. Objective

To verify that the Checkout Payment step handles each payment method correctly and places the order, so the story is ready to release by the end of Sprint 5. Testing runs alongside development within the sprint.

### 2. Scope

**In scope:** Payment method selection (AC1), method-specific details and their validation for Bank Transfer, Credit Card and Gift Card (AC2, AC3, AC6 and the Gift Card Validation rules), the expiration date rule (AC4), instalments for Buy Now Pay Later (AC5), Cash on Delivery with no extra details (AC7), form reset on method change (AC8), and confirming the order: order placed, invoice number shown, cart cleared, confirmation email sent (AC9).

**Out of scope:** Cart, sign in and billing address (other stories; only their hand-off into payment is covered), product catalogue, a real payment provider or bank (payment is simulated), performance and security testing.

### 3. Approach

- Shift left: QA joins refinement to review AC1 to AC9 and the Gift Card Validation rules with the product owner and developer; check testability and log open questions before development starts.
- Levels: developer covers component tests for the validation rules; QA covers API and UI (system) tests; system integration only for the hand-offs from cart and billing into payment, and from payment into order, invoice and email.
- Risk-based & test prioritisation: happy path - payment success, order confirmation, then validation of each method's details, then method switching, then edge cases.
- Techniques: equivalence partitioning, boundary values analysis, decision table, state transition.
- Execution and automation: The story's test cases are run manually, with one time-boxed exploratory session of the payment step. Stable API and UI checks for the order flow and validation rules are automated for regression and run in CI on every build.

### 4. Definition of Ready and Definition of Done

**Ready:** story and AC1 to AC9 reviewed with the product owner and developer; open questions logged and blocking ones answered or agreed; build deployed to Test and smoke test passed; test accounts and payment test data available.

**Done:** all planned tests for AC1 to AC9 executed (anything not run agreed with the product owner and business teams); open questions answered or agreed; no open Critical or High defects, open defects communicated and agreed as risks.

### 5. Risks and Mitigation

| Risk | Likelihood / Impact | Mitigation |
| --- | --- | --- |
| Unstated rules (field lengths, mandatory card details, current-month expiry) | High / Medium | Raise in refinement; record answers on the story before test design |
| Order placed with invalid details, or wrong order outcome (no invoice number, cart not cleared) | Medium / High | Prioritise AC9 at API and UI level; check order and cart state after confirming |
| Validation applied on screen but not on the API | Medium / High | Run the same validation rules directly against the API |
| Confirmation email and refused payment cannot be observed in Test | High / Medium | Check email as sent only; record both as not tested in the test summary |
| Test environment or API unavailable | Low / High | Smoke checks at each build; raise blockers at stand-up immediately |

### 6. Assumptions and Dependencies

- Assumption: payment is simulated, so a refused payment cannot be produced.
- Assumption: length limits for bank name, account name, account number and card holder name will be defined (to confirm).
- Assumption: Credit Card details are mandatory (to confirm); a card expiring in the current month is accepted (to confirm).
- Assumption: details entered are cleared on switching method and back, and are not kept after a refresh or return to the step (to confirm).
- Assumption: the confirmation email checked, but wording to confirmed
- Dependency: deployed to test environment, smoke tests pass, test data available

### 7. Team, Resources and Schedule

- QA engineer: test design, API and UI tests, exploratory session, automation of regression checks, defect logging.
- Test lead: risk review, sign-off.

Tools: Postman, Playwright, Jira, CI. Effort within the sprint (proposed, to agree with the team): design and data setup 1.5 days, execution and automation 3 days, exploratory session 0.5 day, regression and retest 1 day, closure 0.5 day, run in parallel with development.

### 8. Defects and Reporting

Defects are logged in Jira (New > Open > Fixed > Retest > Closed, Reopened if retest fails). QA assigns the severity; the BA or the product owner assigns priority.

Status will be reported during daily stand-up. Any defect affecting the order outcome is raised the same day. Jira to be updated with the latest at all times.

### 9. Deliverables

Automated tests and CI results, test cases linked to AC1 to AC9 and Gift Card Validation rules in Jira (for traceability), exploratory session notes, defect summary, and a short test summary

### Appendix: Defect Priority and Severity

**Priority**: To be assigned by business analyst (may need review from product owner)

| Level | Priority | How to determine |
| --- | --- | --- |
| P1 | Critical, immediate fix required | Blocks testing or release; fix in the current build |
| P2 | High, fix this sprint | Must be fixed before release |
| P3 | Medium, fix when scheduled | Can ship with it, but should go in the next release |
| P4 | Low, product backlog | Fix only if time allows |

**Severity**: To be assigned by testers

| Level | Severity |
| --- | --- |
| S1: Critical | Core function broken and no workaround, or a wrong order outcome (e.g. order placed with invalid payment details) |
| S2: High | Major function broken, but a workaround exists |
| S3: Medium | Minor function broken, limited impact |
| S4: Low | Cosmetic or trivial, no functional impact |

### Testing Levels & What Could Be Tested Against Each

| Level | What to test |
| --- | --- |
| Component (dev) | • Validation rules per method: required details and allowed characters<br>• Gift card number and validation code: exact length and alphanumeric only<br>• Card number format and CVV length<br>• Expiration date must be in the future<br>• Instalment options limited to the defined set |
| Component integration / API (dev or QA) | • Order submitted with valid details for each method<br>• Missing or invalid details rejected with the right error code<br>• Expired card and wrong gift card format rejected server side<br>• Response includes an invoice number<br>• Cart empty after a successful order |
| System (UI, functional testing) | • Correct details requested for each method<br>• Validation for each method<br>• Expiration date rule<br>• Instalment choice for Buy Now Pay Later<br>• Cash on Delivery needs no extra details<br>• Form reset on method change<br>• Confirm and order outcome |
| System integration | • Cart total and billing address carried unchanged into payment<br>• Order and invoice created from the payment step<br>• Confirmation email sent<br>• Cart cleared for the signed-in customer after the order |
| Acceptance (UAT) | • Customer places an order with each payment method<br>• Business edge cases: current-month expiry, switching methods before confirming |

**Points to confirm:**

- Length limits for bank name, account name, account number and card holder name.
- Whether all Credit Card details are mandatory.
- Whether a card expiring in the current month is accepted.
- Whether entered details survive a method switch and back, a page refresh, or a return to the step.
- How "email sent" can be checked in the Test environment (mail log, test mailbox or API).
