## Testing Levels

Testing levels are a set of testing activities that are structured and managed together to organise the test activities at each stage and for each objective.

In a sequential SDLC model, test levels are defined so that the exit criteria of one level are the entry criteria of the next. In iterative models this may not be the case, development spans testing activities, so the levels overlap with each other.

Component Testing: Also called unit testing, is performed by the developers in their environment. In this, the units or modules are tested in isolation to check if they work independently.

For eg.: checking that _entitlement rate table_ module correctly switches over rates as per specified duration.

QA: May review scenarios and rules with the developer but does not usually execute these tests.

Component Integration testing: Here the focus is on testing interfaces or interactions between these units or modules. Since the units have only been tested in isolation so far, this is the step where it’s checked that they integrate well with other units. There are a few approaches followed here – top-down, bottom-up, big-bang, etc.

For eg.: checking that _entitlement rate table_ module interacts with the _earnings_ field value, and retrieves any previous payments by reaching for _customer history_, to deduce a _final entitlement value_ owed to the customer.

QA: writes and runs API tests, validating responses and error codes against the acceptance criteria.

System Testing: Here the overall behaviour of the system as a whole are verified. This often includes functional testing of end-to-end flows and non-functional testing of any quality characteristic. System testing is usually performed by a dedicated or an independent test team.

For eg.: testing various features like _customer details, entitlements, payment method_ and verifying the flow in one system and ensuring if it works well as a whole.

QA: designs and runs end-to-end functional and non-functional tests.

System Integration Testing: Focuses on testing the interfaces of the system and how it interacts with other systems and services, data flow, etc. SIT may require suitable test environments, similar to the operational environment replicating the conditions of operational environment for effectiveness.

For eg.: Testing the data flow between two systems, checking end-to-end business workflows spanning across multiple systems. Or testing the system in above example sends the _payment method_, due _entitlements_ to the _Payment Module_ which actually computes and triggers payments.

QA: validates data flow across systems and sets up integrated test environments and data with the other teams.

Acceptance testing: Usually performed by the end users themselves, or dedicated teams. The focus here is on validation of the software and to check the readiness for deployment, and if it meets the needs and expectations of the users. This is important to make sure that the software actually delivers the value against the business goals set against it.

The main forms of acceptance testing are: User acceptance testing (UAT), operational acceptance testing, alpha testing and beta testing amongst others.

QA: supports UAT with test data, defect triage, sometimes with testing certain scenarios

## Testing Levels vs Test Types

Testing types are a group of activities you perform to verify or validate a certain characteristic in terms of quality.

If you want to test the functional requirements or specifications, meaning whether the software does what it is supposed to do, you perform Functional testing.

For eg.: checking that changing the quantity of a cart item recalculates the line total and the cart total.

If you want to test other characteristics or non-functional aspects such as security or performance, you would be performing Non-functional testing.

For eg: checking if the system performs within a specified time, or if it can handle specified number of users well (load testing), if pushed beyond that limit how does it behave or exactly handle it (Stress testing).

Confirmation testing/retesting and regression testing are also types of testing alongside the ones above.

Any test type can be performed at any level. For eg.: performance testing at API and system level; regression testing at every level.

**Key takeaway:**

The test levels are distinguished on the basis of certain attributes such as:

- The test object
- Test objective
- Test basis
- Typical defects and failures
- Approach and responsibilities

## Test Planning Phase

### Test Strategy vs Test Plan

Test Strategy: It is a high-level document with overall approach and principles laying out details such as tools, standards, types of testing and environments. It’s usually determined at the organisation or a specific project level and stays stable across releases.

Test Plan: This is more Granular and usually for a specific release. It includes components such as Test scope, schedule, entry-exit criteria, resources required, roles & responsibilities deliverables, assumptions, risk & mitigation.

Key takeaway: The test strategy defines the overall approach and remains the same across releases while the test plan is more detailed, execution roadmap for STLC for a specific release in that project

In agile: the strategy shows up as the team’s test approach and Definition of Done, while the plan is a lightweight one-page document per release or sprint.

### STLC Phases and QA Activities

- Requirement analysis: review stories and acceptance criteria, raise questions, checking testability.
- Test planning: Here, you usually define scope, approach, risks, entry-exit criteria, schedule and resources.
- Test design and data setup: This is where you design test scenarios, detailed test cases, set up data.
- Test environment setup: This involves preparing or configuring the environment, running a smoke test.
- Test execution: Execute or run tests, log defects, triage and retest. Regression is run at the end
- Test closure: Usually involves execution summary, defect trends, checking exit criteria, deployment risks.

### User Story / Feature for Next Exercises

[Checkout - Cart Review](https://testsmith-io.github.io/practice-software-testing/#/user-stories/v5?id=checkout-cart-review)

---

# Test Plan: Checkout- Cart Review (Sprint 05)

### 1. Objective

To verify that Checkout Cart flow works and is ready to release by the end of the sprint. Testing runs alongside development.

### 2. Scope

**In scope:** Cart table, quantity update, delete item, empty cart, Proceed, discount badge and prices, and the 15% rental / non-rental discount.

**Out of scope:** Product catalogue, users and search, auth and accounts, payments, performance and security testing.

### 3. Approach

- Shift left: review criteria with the product owner and developer before development starts; verify testability, clarify any assumptions, open questions.
- Levels: developer covers component tests; QA covers API and UI (system) tests; system integration only for the hand-off to sign-in, billing and payment.
- Risk-based & Test prioritization: Core user workflows, critical areas, defect trends.
- Techniques: boundary values (quantity), decision table (cart composition), state transition (cart states).
- Automation: API and UI tests, run in CI on every build for regression. Manual or exploratory, accessibility testing,

### 4. Entry and Exit Criteria (ready to test / done)

**Entry:** story and ACs reviewed; build deployed to Test and smoke test passed; rental and non-rental products available via the API.

**Exit:** all planned tests for AC1 to AC8 executed (if not, are agreed with the product/business teams); no open Critical or High defects.

### 5. Risks and Mitigation

| Risk                                  | Likelihood / Impact | Mitigation                                                                        |
| ------------------------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Undocumented or changing requirements | High / Medium       | Raise questions with the product owner before testing; re-check ACs on any change |
| Test environment or API unavailable   | Low / High          | Smoke checks at each build; raise blockers immediately                            |

### 6. Assumptions and Dependencies

- Assumption: ACs are reviewed and open questions are answered before testing starts.
- Dependency: product and cart API available; rental and non-rental products available as test data.

### 7. Team, Resources and Schedule

- QA engineer: test design, API and UI tests, automation, defect logging.
- Test lead: risk review, sign-off.

Tools: Postman, Playwright, Jira, CI. Effort within the sprint: design and data setup 2 days, execution and automation 3 days, regression and retest 1 day, closure 0.5 day, run in parallel with development.

### 8. Defects and Reporting

Defects are logged in Jira (New > Open > Fixed > Retest > Closed, Reopened if retest fails). QA assigns the severity; the BA or the product owner assigns priority.

Status will be reported during daily stand-up. Jira to be updated with the latest at all times.

### 9. Deliverables

Automated tests and CI results, test cases linked to ACs/user stories in Jira (for traceability), Defect summary, and a short test summary required.

### Appendix: Defect Priority and Severity

**Priority**: To be assigned by business analyst (may need review from product owner)

| Level | Priority                         | How to determine                                    |
| ----- | -------------------------------- | --------------------------------------------------- |
| P1    | Critical, immediate fix required | Blocks testing or release; fix in the current build |
| P2    | High, fix this sprint            | Must be fixed before release                        |
| P3    | Medium, fix when scheduled       | Can ship with it, but should go in the next release |
| P4    | Low, product backlog             | Fix only if time allows                             |

**Severity**: To be assigned by testers

| Level        | Severity                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------ |
| S1: Critical | Core function broken and no workaround, or a wrong money value (e.g. incorrect cart total) |
| S2: High     | Major function broken, but a workaround exists                                             |
| S3: Medium   | Minor function broken, limited impact                                                      |
| S4: Low      | Cosmetic or trivial, no functional impact                                                  |

### Testing Levels & What Could Be Tested Against Each

| Level                                   | What to test                                                                                                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component (dev)                         | • Line total = price × quantity<br>• Subtotal calculation<br>• The 15% discount rule: only when rental and non-rental items are both present<br>• Rounding<br>• Quantity validation (boundary values)                                                                     |
| Component integration / API (dev or QA) | • Add, update-quantity and delete calls against the real database.<br>• Validations against Quantity field<br>• Totals and discount in the response match the stored cart.<br>• Invalid input returns the right error code.<br>• Discount recalculates after each change. |
| System (UI, functional testing)         | • Cart table display<br>• Update quantity<br>• Delete item<br>• Empty cart<br>• Proceed to next step<br>• Discount related criteria<br>• Displayed subtotal, discount and total for mixed carts                                                                           |
| System integration                      | • Cart total carried unchanged to sign-in, billing and payment<br>• Cart persists across refresh and login (guest to logged-in user)                                                                                                                                      |
| Acceptance (UAT)                        | • Mixed rental and non-rental cart shows the 15% discount in a customer scenario<br>• Business edge cases                                                                                                                                                                 |
