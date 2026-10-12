**Shift-Left testing:**

It’s an approach where the testing activities start early in the SDLC, often before the implementation, and during the requirement review phase. So as a tester, you start your tasks early during design and development phases itself. Which is why it is said that it transforms the process from a reactive to proactive process using methods like static testing, static code analysis.

It helps in early defect detection, encourages closer collaboration, creates a faster feedback loop, faster time to market and thereby reducing the resources required.

E.g.:

During backlog refinement for an Entitlements story, I noticed that three fields derived from the claimant’s payment history, _Weeks Paid for this Claim_, _Weeks to be Paid_ and _Weeks paid to this customer_, had misleading labels. Their names suggested overlapping meanings, which risked mismatched values in the system.

During the session, when I flagged it, it turned out fields were interpreted differently across the team from what the business intended. We actually scheduled a dedicated meeting for this and walked through the logic together, clarified what each field represents and where its value comes from, getting confirmations from the Product Owner. The story was then updated with clearer labels and explicitly documented behavior.

Impact:

The developer started with the correct understanding, avoiding rework that would likely have doubled the effort.

The misunderstanding never reached an upstream system through the API endpoint, where it could have caused confusion and defects across multiple systems.

Catching it during requirement review itself meant a quick conversation instead of a later-stage defect, retesting and possible API changes.

Why this is shift-left: The issue was found by reviewing the requirement, before any code or test case existed, which ends up being the cheapest point to fix it.

**Risk-based Testing:**

It’s a strategic approach where you focus testing efforts on areas that are most critical to system’s functionality. This method involves prioritization of high-impact areas such as the ones directly influencing the business value or revenue streams, and affect the overall user experience.

**Risk-based testing in Agile:**

In agile, this becomes a collaborative effort, where testers, developers, business analysts and or product owners work together to identify and assess risks associated with current release for the software or product. Testers typically conduct a risk assessment that influences the test strategy and planning, ensuring critical features, core complex areas, defect-prone modules, modules most frequented, recent changes and any core areas to the business processes.

When to adopt this approach:

- When project or team faces certain limitations, prioritizing testing efforts is an effective way to ensure coverage without compromising on quality.

- Certain products inherently have more risk factors than the others, or simply inadequate domain knowledge, and complex functionalities. For e.g.: payment modules or payment gateways, large-scale government tech systems. Here, focusing efforts on high-risk areas adds an assurance that the most critical areas or issues are addressed.

- In case of projects requiring high security where it is highly vulnerable to external threats like SQL injection, risk-based testing is critical.

- One of the most usual reasons in my experience, is when the requirements are ever-evolving or continuously being modified, it helps to adapt the testing priorities since new risks keep arising in such cases.

**Risk-based testing can be divided into main categories:**

Lightweight: Its informal, quick, driven by team discussion and expert judgment, and pairs well with exploratory testing.

Heavyweight: Its more formal, involves techniques such as techniques like Failure Mode and Effects Analysis (FMEA), and detailed documented, through risk assessments and regular updates. It is generally more suited to complex or regulated projects.

**Agile methodologies:**

The core idea behind this is delivering software in small slices, in an incremental manner. You build the product iteratively, where you deliver work in increments in short cycles called sprints – which are fixed length, one month or less ~ generally 15 days. This leads to a faster feedback loop with regular user feedbacks, continuous improvement, early defect detection, closer collaboration. This model also tends to focus more on the working software than heavy documentation artefacts like in Waterfall.

**Agile ceremonies:**

- Backlog refinement: The purpose of this is to refine the product backlog items, to ensure they are complete, clear and self-contained so that testers/developers can derive expected behavior.

QA’s role in this is to help in reviewing the user stories, use this as an opportunity to assess the testability, flag any dependencies, any gaps observed in the acceptance criteria and to clarify any ambiguities if present. This is also where you provide an estimate for testing efforts.

- Sprint planning: This is to determine the sprint goal, agree on what can be done and how it will be done. At the end, you have the top priority items pulled into the sprint backlog from the product backlog. Usually this also involves checking available capacity for the sprint.

QA’s role is to confirm Definition of ready (DOR). You can also use this opportunity to identify test data and environment requirements. Also, to plan the overall approach to testing the user stories now in sprint backlog.

- Daily stand-up: Discuss progress, blockers, impediments so team is aligned and aware of the progress towards the sprint goal.

QA’s role is to share the testing progress, any major blockers or issues that may delay or are delaying the progress so the sprint plan if needed can be adjusted accordingly.

- Sprint reviews: Present the work done in the sprint to gather feedback and understand whether there is need to adapt the product.

QA’s role could typically involve supporting the demo, and understanding what is genuinely done against the Definition of Done. It can really help QAs to understand the user feedback to help in adapting the QA approach, strategy or techniques if necessary.

- Spring retrospectives: To discuss how the sprint went, what worked, and what didn’t, to discuss possible solutions to learn from these shortcomings and make improvements in the processes followed.

QA’s role is to prepare any data such as escaped defects, defect trends, undocumented requirements, late approved user stories and propose any changes to the QA processes if appropriate and required.

**Risk-Based Test Prioritisation: Checkout – Cart Review**

**1. Approach and scoring**

I have prioritised tests based on the likelihood of failure and its impact on the customer. So, highest-risk scenarios are tested first, especially when time is limited.

Risk score = Likelihood × Impact, with each factor scored from 1 (low) to 3 (high).

If it’s a tie between risks, prioritising risk with higher impact will help better to achieve the goal.

**2. Risk register**

| **ID** | **Risk**                                                    | **Likelihood** | **Impact** | **Score** | **Level** |
| ------ | ----------------------------------------------------------- | -------------- | ---------- | --------- | --------- |
| R1     | Quantity change doesn’t update item and cart totals         | 3              | 3          | 9         | High      |
| R2     | Quantity (+/-) buttons are not working                      | 2              | 2          | 4         | Medium    |
| R3     | Delete leaves a wrong cart total, or removes the wrong item | 2              | 3          | 6         | High      |
| R4     | Cart table shows the wrong item, quantity or price          | 2              | 3          | 6         | High      |
| R5     | Invalid quantity accepted                                   | 3              | 3          | 9         | High      |
| R6     | Cart lost on refresh, back or new tab                       | 2              | 3          | 6         | High      |
| R7     | Proceed doesn’t move to the next step                       | 1              | 3          | 3         | Medium    |
| R8     | Empty-cart message wrong                                    | 2              | 1          | 2         | Low       |
| R9     | Rounding errors                                             | 2              | 2          | 4         | Medium    |
| R10    | Quantity limits not enforced                                | 2              | 3          | 6         | High      |

I will prioritise R1, R5, R3, R4 and R6, and R10 in that order, because they affect order accuracy or checkout flow. If the schedule allows it, I would then move to the remaining risks with lower score.

But, if time runs out, I will communicate what was tested, what remains untested and the associated risks.

**4. What to test**

I will focus on these checks first:

- **R1, quantity and totals:** Change an item's quantity and verify that its line total and the cart total are recalculated correctly. Calculate expected values using the current product price shown on the product page or returned by the product API at test time.

- **R3, deletion:** Delete an item and verify that the correct item is removed and the cart total reflects the total

- **R6, Cart lost:** I will check that the cart is not lost on refresh, back or a new tab.

- **R4, price accuracy:** Compare the cart price with the current price on the product page or product API.

- **R5 and R10, invalid quantity and quantity limits:** Check zero and negative quantities. Confirm the expected validation behaviour, and quantity limits with the BA or PO because it is not specified in the acceptance criteria.

**5. Prevention vs detection**

Prevention means reducing the chance of defects entering the product, for example by clarifying requirements before development starts ideally, or even during development. Detection means finding defects that already exist in the work, through reviews and testing.

Early testing saves time and money. In my shift-left example, a quick conversation replaced a late-stage defect fix and retest.

For eg.: I would clarify the business rules such as max quantity allowed per product/customer, and error messages expected early because they directly affect test design and expected results.

**Defect Lifecycle:**

Defect lifecycle is a series of stages that a defect goes through from the discovery to closure.

Although it may vary slightly from project to project or even the tool being used, but typically the core states remain the same:

New → Assigned → In development → Ready for system test → In system test →System test complete→ Closed.

Or, simply:

New → Assigned → Open → Fixed → Retest → Verified → Closed

Some of the other situational states being:

• Duplicate: same defect already logged

• Rejected: not a defect; working as per requirements

• Deferred: a defect acknowledged, but postponed to a future sprint or release

• Reopened: reoccurrence or a regression

**Defect Management OR Managing defects through this lifecycle:**

It’s usually comprising of activities such as identifying, recording, classifying, investigating, fixing and disposing of defects.

- Identifying: QA identifies unexpected behavior or anomaly during testing.

- Logging: QA writes a defect report with details, a title that briefly tells the gist of the actual issue, a brief account, repro steps, expected vs actual, environment and test data details, evidences, and the severity.

- Triage: the QA with team decides if it’s a real defect, the urgency to fix it. Here, you also then decide who should fix it or whom to assign it to, and whether to fix it now, later or not at all.

- Investigation: QA and dev work together for the initial investigation and root cause. Dev then investigates issue further.

- Resolution: The fix is implemented and delivered to the test environment.

- Verification: QA retests by running the original steps and checks the area around the fix too. If it fails, it goes back to the dev.

- Closure: QA closes it with an evidence and note of what was verified.

**Defect Report 1:**

**ID**: DEF-001

**Title**: Cart: plus / minus sign does not update the quantity or amount

**Assignee**: Renuka

**Status**: New

**Component**: Cart

**Environment**: Test

**Build / URL**: BV2.1/ [\[cart page URL\]](https://practicesoftwaretesting.com/checkout)

**Description**: When on Cart review, the plus or minus controls do not update the quantity as expected. This also then leads to an incorrect amount that does not reflect of any change.

**Steps to reproduce:**

Click on Home

Add ‘Hammer’, and ‘Combination Pliers’ to the cart

Go to the Cart page.

Click the plus (+) sign next to the product.

Click the minus (−) sign.

**Expected result**: Each click on plus adds one to the quantity and minus takes one off, and the item amount and cart total should update with this change.

**Actual result**: Clicking plus or minus does not change the quantity. Item amount and total amount stay the same.

**Severity**: Major.

**Priority**: P2, to be confirmed with BA and PO.

**Attachments**: screenshot or recording, logs

**References**: Link to the feature and/or user story

**Defect Report 2:**

**ID**: DEF-002

**Title**: Product detail: ‘Add to favourites’ displays the error “An error while adding to favourites”  
**Assignee**: Renuka  
**Status**: New  
**Component**: [Product detail](https://practicesoftwaretesting.com/product/01M4GX5NBG86XPB5G15W625EMS)  
**Environment**: Test  
**Build / URL**: BV2.1

**Description**: On the Product detail page, clicking “Add to favourites” the error “An error while adding to favourites” and the product is not added to favourites.

**Steps to reproduce:**

> Click on Home
>
> Open the detail page of ‘Combination Pliers’
>
> Log in, as adding to favourites needs user to be signed in.
>
> Click ‘Add to favourites’ button

**Expected result**: The product is added to favourites, and the user gets a confirmation at the top-right that it was added.  
**Actual result**: The error “An error while adding to favourites” is displayed and the product is not added to favourites.

**Severity**: Medium.

**Priority**: P3, to be confirmed with BA and PO.  
**Attachments**: screenshot or recording, logs when appropriate  
**References**: Link to the feature and/or user story
