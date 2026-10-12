# Requirement Traceability Matrix (RTM)

**Purpose:** A Requirements Traceability Matrix (RTM) maps every requirement to its test cases (and to defects or other artefacts where needed). It helps to make sure no requirement is missed during design or execution, and that no test case exists without a requirement behind it, which can point to scope creep or a missing requirement. It also shows coverage gaps, helps in impact analysis, and keeps the work aligned with the original scope.

**Structure:** Typically includes requirement ID, short description, priority, test case IDs, execution status, and if needed Defect IDs and status. In a heavier version, it can also show the hierarchy: business requirement, functional requirement, then test cases.

There are three types of RTM:

1.  Forward Traceability Matrix: In this, requirements are mapped to associated tests, to track that every requirement has at least one test case mapped to it and is not missed in testing. This approach allows for the identification of gaps early in the process.

Forward traceability on its own won’t show features or test cases that have no requirement behind them. Backward traceability helps in such cases.

2.  Backward or reverse Traceability Matrix: In this, traceability initiates with tests and works in reverse. It helps to identify the requirements that gave rise to the test cases you have. This can particularly be useful when reviewing test cases, as it helps in checking that each individual test case has an actual requirement that is documented.

But this assumes you have test cases ready already, so this isn’t helpful in early phases of SDLC when you are simply checking which requirements exists and what still needs test design.

3.  Bi-directional Traceability Matrix: This combines both approaches and is a good choice in critical projects with heavy compliance or regulatory requirements that could keep changing. It is especially useful for change management and impact analysis, where if a requirement is modified, it quickly shows the affected test cases, and also design documents and code modules if those are linked in the matrix. This helps make sure a seemingly insignificant requirement change disrupting multiple downstream components doesn’t end up going unnoticed, with no unpleasant surprises later.

## RTM exercise

> This exercise uses the Checkout – Cart Review ([User story](https://testsmith-io.github.io/practice-software-testing/#/user-stories/v5?id=checkout-cart-review)). REQs are mapped from ACs.
>
> User Story
>
> As a customer, I want to review the items in my cart, including any applied discounts, so that I can verify my order is correct.

Test cases:

| **TC ID** | **Scenario**                                                                                              |
| --------- | --------------------------------------------------------------------------------------------------------- |
| TC-01     | Verify the cart table displays the columns Item, Quantity, Price, Total and Actions                       |
| TC-02     | Verify each line item shows the correct product, quantity, price and line total for the product added     |
| TC-03     | Verify the item total and cart total are updated with the quantity updates                                |
| TC-04     | Verify the message “Product quantity updated.” is displayed after the quantity is changed                 |
| TC-05     | Verify the cart total is correct when the quantity of one item is changed in a cart with multiple items   |
| TC-06     | Verify that the item is removed and the other items remain when the delete button is clicked for one item |
| TC-07     | Verify the cart total is recalculated after an item is deleted                                            |
| TC-10     | Verify that user can move to the next step on clicking “Proceed” with at least one item                   |
| TC-11     | Verify that the user cannot move to the next step with zero items (expected result pending Q9)            |
| TC-12     | Verify a discount badge next to the product name for a discounted item                                    |
| TC-13     | Verify that both prices are displayed for a discounted item                                               |
| TC-14     | Verify that no discount badge shows next to an item with no discount                                      |
| TC-15     | Verify that a 15% additional discount is applied to a cart with both rental and non-rental items          |
| TC-16     | Verify the cart shows the correct subtotal, discount amount and final total with additional discount      |
| TC-17     | Verify no discount is applied when the cart has only rental items                                         |
| TC-18     | Verify no discount is applied when the cart has only non-rental items                                     |
| TC-19     | Verify discount is removed, total is updated when all rental items are removed                            |
| TC-20     | Verify discount is removed, total is updated when all non-rental items are removed                        |

Intentionally leaving out below test cases from the table above, so we can identify the gap using RTM. This will help us find which requirement has no mapped test cases and has been missed during test design and execution.

| **_TC ID_** | **_Scenario_**                                                 |
| ----------- | -------------------------------------------------------------- |
| TC-08       | Verify the message is displayed when the cart has no items     |
| TC-09       | Verify the message is displayed after the last item is deleted |

RTM:

| **REQ ID** | **Description**           | **Priority** | **Test case IDs**          | **Execution status** | **Defect IDs** | **Defect status** |
| ---------- | ------------------------- | ------------ | -------------------------- | -------------------- | -------------- | ----------------- |
| REQ-01     | Cart contents displayed   | High         | TC-01, TC-02               | Passed               | DEF-003        | Closed            |
| REQ-02     | Update quantity           | High         | TC-03, TC-04, TC-05        | Failed               | DEF-001        | To be Fixed       |
| REQ-03     | Delete item               | High         | TC-06, TC-07               | Not run              | -              | -                 |
| REQ-04     | Empty cart                | Low          | Not test mapped            | Not Covered          | -              | -                 |
| REQ-05     | Proceed                   | Medium       | TC-10, TC-11               | Not run              | -              | -                 |
| REQ-06     | Discount badge on items   | Medium       | TC-12, TC-13, TC-14        | Not run              | -              | -                 |
| REQ-07     | Combined product discount | High         | TC-15, TC-16, TC-17, TC-18 | Passed               | DEF-002        | Closed            |
| REQ-08     | Combined discount removed | Medium       | TC-19, TC-20               | Not run              | -              | -                 |

So, it can be seen that REQ-04 was not covered and needs to be addressed

TC-08 and TC-09 cover AC4, so they should be mapped to REQ-04 and run. If this is found in later stage, and since REQ-04 is Low priority, deferring it would be a valid risk-based call, but it would need to be recorded as a decision after discussion and confirmation from Product Owner and Business Teams and not left as an oversight.

## Defects behind the RTM

| Defect ID | Summary                                                        | Severity | Linked TC      | Status |
| --------- | -------------------------------------------------------------- | -------- | -------------- | ------ |
| DEF-001   | Cart: plus / minus sign does not update the quantity or amount | Major    | TC-03          | Open   |
| DEF-002   | Discount not applied to subtotal and discount total            | High     | TC-15 to TC-18 | Closed |
| DEF-003   | Cart: User cannot enter Quantity in input field                | High     | TC-01 or TC-02 | Closed |

Mapped does not mean adequately tested. REQ-02 has three test cases, but invalid input and quantity limits are not tested yet, so the coverage must be read along with priority, since high-priority requirements need more than the happy path.

This RTM is Forward based keeping Agile model in consideration and its simplicity and ability to detect gaps early.

## Requirement analysis/review

In the early stages, before the user story is approved, ideally during backlog refinement, it is very important to ensure that it has most of the details required to start the implementation and test design. This is part of test analysis, where the test basis is evaluated for defects and testability as per ISTQB.

During my research about this topic I came across INVEST acronym by Bill Wake, and how it allows you to cover the most rewarding checks you can conduct against any user story before you move to the next stage.

Separately, I learned that maintaining a review log can make the review more precise and helps track the updates.

**_Independent_**: Is the story as self-contained as possible? Can it be built with minimum dependence on other stories?

**_Negotiable:_** Does the story capture the essence while still leaving the details open to a conversation with the team? Or is it a fixed contract?

**_Valuable:_** Does it add a clear value to the customer or end user?

**Estimable:** Can the team understand it well enough to estimate the efforts?

**_Small:_** Is it small enough to deliver with confidence within a single sprint?

**_Testable:_** Is it clear, complete enough with derivable expected outcome and do I understand it well enough to write a test with clear pass/fail criteria for it?

## Testability

In the context of Agile, during backlog refinement, you should assess the story for testability where you basically check if you are able to work out the expected behaviour from the details in the user story alone.

**Core idea is to check that:**

- You are able to write a test from the requirement alone, before you get the build or without checking with developer.

- You are able to find expected results, inputs, validations, error handling in the requirement to finish writing the test, without having to assume, or invent a behaviour.

- If two testers, or any two team members review the user story, do they conclude the same expected result? If not, it may mean that requirement is ambiguous.

**Key takeaway:** Ensuring that the user story is testable means looking for ambiguities, inconsistencies, gaps or any dependencies overlooked in this requirement.

Testability also applies to the product, not just the requirement:

Controllability: Can I set up the state I need to test, e.g. a cart with both rental and non-rental items?

Observability: Can I clearly see the result, e.g. totals, discount and messages? A clear requirement can still be hard to test if either this is missing.

### Defect prioritisation

Severity is the impact of the defect on the system’s functionality or the user and is assessed by the QA. Priority is how soon it should be fixed. This is usually decided by the BAs in collaboration with POs based on user impact, risk, release plans and the business goals. They can sometimes appear to be unusual in their impact and urgency, for instance, a cosmetic or a spelling typo in the company’s name itself and on their home page. This is a classic Low severity, but High priority defect which business would usually expect to be fixed with urgency.

In a defect report, I give severity with evidence and propose a priority, which is just a placeholder and is reviewed and assigned by the BA, usually with PO. If I have a different opinion on priority, I discuss this with BAs usually bringing my reasoning to the table, but the final decision remains a business call.

### Defect, requirement gap or change request

If the behaviour deviates from documented expected behaviour and requirement, it is a defect. And if the requirement is missing details or is ambiguous, it becomes a requirement gap, so I raise it in the reviews and don’t log it as a defect until the expected behaviour is clarified.

On the other hand, if the business wants expected behaviour changed from what was initially approved, it becomes a change request which usually has a formal documentation process with formal approvals and steps involved and goes through the BA and PO.

From this exercise: Q9 (Proceed with zero items) is a requirement gap, not a defect, and tester should wait to receive clarity on the behaviour from BA or the product owner before documenting any defects.

## Vague requirements and clarifying questions

Maintaining a review log is a useful, lightweight way to track open questions and clarifications against a requirement. It is not a formal process followed in every project. Most requirement reviews in agile are informal and happen during backlog refinement with documentation kept thin where each person brings their own questions and concerns, explains their reasoning, and keeps an open mind about the testability of the requirement.

This doesn’t need to be limited to the backlog refinement session. Testers can track the items in the product backlog and review stories while they are still in progress or waiting for approval, noting any questions or concerns about the requirements.

Testers should join backlog refinement and sprint planning to bring the QA perspective and ask clarifying questions, but only after reviewing the stories beforehand and noting any gaps or ambiguities. Joining these sessions unprepared defeats the purpose.

If something still needs clarity, for instance, where the requirements keep evolving, testers may reach out to the business analyst and also involve the developers to bring technical perspective. If ambiguity it still remains vague around business rules or expected outcomes, the business analyst can clarify the behaviour with the Product Owner. So, refinement of user stories is more of an ongoing activity throughout the SDLC process.

Once a question is answered, the review log status can be moved to Closed with the answer noted, the affected test cases are updated, and the RTM is re-checked.

### Review log

| **Q. No** | **Question**                                                                                                                                                   | **Requirement/AC** | **Criticality** | **_Directed to_** | **_Response_** | **Status** |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------- | ----------------- | -------------- | ---------- |
| 1         | Does the user have to be signed-in to navigate and review the cart after adding products?                                                                      | REQ-01             | Medium          | BA/PO             |                | Open       |
| 2         | Is there a design or mock-up for the Cart table layout?                                                                                                        | REQ-01             | Low             | BA                |                | Open       |
| 3         | Does the cart use the same +/− buttons as the Product Detail page as well as manual entry                                                                      | REQ-02             | Medium          | BA                |                | Open       |
| 4         | What happens when the quantity is updated to 0? Should the item be removed?                                                                                    | REQ-02             | High            | BA/PO             |                | Open       |
| 5         | If yes is there an informational message telling the user the item will be removed altogether?                                                                 | REQ-02             | Medium          | BA/PO             |                | Open       |
| 6         | Is there a confirmation message when deleting an item from the cart, especially when removing the last line item?                                              | REQ-03             | Medium          | BA/PO             |                | Open       |
| 7         | Does the cart follow same Quantity limits as the Product detail Page?                                                                                          | REQ-02             | High            | BA/PO, Dev        |                | Open       |
| 8         | Is there a minimum or maximum cart/order value                                                                                                                 | REQ-05             | Medium          | BA/PO             |                | Open       |
| 9         | What happens when the user tries to proceed with 0 items in the cart? Is it blocked? And what is the message                                                   | REQ-04, REQ-05     | Medium          | BA/PO             |                | Open       |
| 10        | What is the business rule if the individual rental/non-rental item has discount + cart contains both rental and non-rental items? Does one override the other? | REQ-06, REQ-07     | High            | BA/PO             |                | Open       |
| 11        | Does the cart total include any other charges such as shipping or tax?                                                                                         | -                  | Low             | BA/PO             |                | Open       |
| 12        | Which other Actions should this column contain, besides the Delete button                                                                                      | REQ-01             | Medium          | BA/PO             |                | Open       |
| 13        | Can the 15% be applied in addition to item-level discounts? If not, which applies to the total amount                                                          | REQ-07, REQ-08     | High            | BA/PO             |                | Open       |
| 14        | What happens when the quantity is changed to an invalid value (negative number, a decimal or text? What are the validation messages for each?                  | REQ-02             | High            | BA/PO             |                | Open       |
