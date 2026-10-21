# Day 10: Capstone and Reflection

## User story:

As a customer, I want to provide payment details specific to my chosen payment method, so that my payment is processed correctly.

Source: Practice Software Testing (Toolshop), user stories v5, checkout payment (advanced). [Link](https://testsmith-io.github.io/practice-software-testing/#/user-stories/v5?id=checkout-payment-advanced)

## Exercise: Analyse requirements and raise clarifying questions

Read on its own, the story says that a customer chooses a payment method, enters the details that method expects, and has the payment processed. It does not say which methods exist, which fields each one shows, what each field accepts, or what happens once the details are accepted. Without those, no expected result can be written, so the first job was to list what needs to be clarified.

### Preliminary questions (from user story alone)

1. Which payment methods does the system support at this step?
2. Which fields does each method show?
3. What does each field accept, and what is expected for invalid details under each method?
4. When the details are accepted, is the order placed at this step or in the next one? What exact action is expected from the customer, for example a “confirm” action? If the order belongs to the next step, it is outside this story.
5. Does switching the method clear the fields already entered, and does it display the fields for the new method?
6. Do the entered details stay if the customer goes back a step, refreshes the page or is locked out?
7. Are sensitive fields, if any, masked?

The story alone gave too little to work from, so those first questions come from it on its own. From here I take the acceptance criteria that the site publishes for this story as the primary requirements and review them. I note which of my first questions they answer, and the questions that are still open, unclear, or in conflict go into the review log.

### Review log

| ID | Requirement or AC | Question | Directed to | Criticality and what it blocks | Response | Status |
|---|---|---|---|---|---|---|
| G1 | Bank transfer: account number is digits only and mandatory; limits not stated | What is the valid input range for the account number, including its minimum and maximum length? | Business Analyst | High: boundary values and partitions for the account number cannot be derived. |  | Open |
| G2 | Bank transfer: account name; limits not stated | What is the valid input range for the account name, including its minimum and maximum length? | Business Analyst | High: boundary values and partitions for the account name cannot be derived. |  | Open |
| G3 | Bank transfer: bank name; limits not stated | What is the valid input range for the bank name, including its minimum and maximum length? | Business Analyst | High: boundary values and partitions for the bank name cannot be derived. |  | Open |
| G4 | Credit card: no field is stated as mandatory (the bank transfer fields are). Assumed mandatory from domain knowledge, to be confirmed | Are all the credit card fields mandatory? | Business Analyst | High: the expected result for a blank credit card field cannot be stated. |  | Open |
| G5 | Credit card: cardholder name; limits not stated | What is the valid input range for the cardholder name, including its minimum and maximum length? | Business Analyst | High: boundary values and partitions for the cardholder name cannot be derived. |  | Open |
| G6 | Credit card: expiry date | What should happen when the card's expiry month is the current month, for example a card expiring 10/2026 entered on 31 October 2026? | Product Owner | Medium: the expected result for a card expiring this month can only be assumed. |  | Open |
| G7 | Buy now, pay later: monthly instalment option | What is the next step once the customer selects a monthly instalment? | Product Owner | High: the steps after choosing instalments are unknown, so no test for this method can be written. |  | Open |
| G8 | Buy now, pay later: monthly instalment option | What details are needed to confirm the instalment when the customer has no payment added? | Business Analyst | High: the details to enter for this method are unknown, so no test data can be designed. |  | Open |
| G9 | Gift card: gift card number; limits not stated | What is the valid input range for the gift card number, including its minimum and maximum length? | Business Analyst | High: boundary values and partitions for the gift card number cannot be derived. |  | Open |
| G10 | Gift card: validation code; limits not stated | What is the valid input range for the validation code, including its minimum and maximum length? | Business Analyst | High: boundary values and partitions for the validation code cannot be derived. |  | Open |
| G11 | Order success: confirmation email | What is the exact wording of the confirmation email sent to the customer? | Product Owner | Low: the email text can only be assumed, and the email may belong to the order step rather than to this story. |  | Open |
| G12 | Order success: confirmation on screen | What confirmation does the customer see on screen after a successful order? | Product Owner | High: the expected result of a successful payment cannot be stated. |  | Open |
| A1 | The customer clicks confirm; it is not stated whether this places the order or moves to the next step | Does the “confirm” action place the order at this step, or move the customer to the next step? | Product Owner | High: It decides whether the order is placed at this step, which sets the scope of the story. |  | Open |
| G13 | Page refresh and back button | What happens to the entered details when the page is refreshed, or the back button is used? | Developer | Medium: the expected state after a refresh or going back is unknown. |  | Open |
| G14 | Session timeout and logout | What happens to the entered details when the session times out or the customer is logged out? | Developer | Medium: the expected result after a timeout or logout is unknown. |  | Open |

The letter in each ID gives the kind of problem: G for gap and A for ambiguity.

## Exercise: Write acceptance criteria and a lightweight test plan

### Acceptance criteria

Basis: the user story and the acceptance criteria the site publishes for it, together with the requirements analysis. I have written them in the BDD (Gherkin) format I learned on Day 3. Every question I could not settle is parked at the end of its Rule, to be confirmed with the Product Owner or Business Analyst.

I built the prompt using the acceptance criteria prompt from Day 8 effective prompting task as a reference template, with this story and its published criteria as the requirements. The AI wrote the initial draft of the criteria from it, and I checked the output against the format.

**Acceptance criteria:** [checkout_payment_ACs_refined.txt](checkout_payment_ACs_refined.txt)

### Lightweight test plan

Basis: the user story and the final acceptance criteria, in an Agile context. The plan is lightweight and manual first, with automation kept for regression, and it covers scope, approach, risks and what must be in place to start and finish testing in the sprint.

The prompt uses my Day 2 cart test plan prompt as a reference where I learned effective prompting. The AI drafted the plan; I reviewed it and trimmed it where necessary to keep it lightweight. I also had to make certain corrections such as Definition of Ready and Definition of Done, testing approach, scope, etc.

**Test plan:** [checkout_payment_Test_Plan.txt](checkout_payment_Test_Plan.txt)

## Exercise: Design a test case suite applying multiple techniques

### Test scenarios

Basis: the user story and the final acceptance criteria, test plan. There is one happy-path scenario for each of the five payment methods, from choosing the method to placing the order, with valid values and a check that the fields for that method appear. Field validation is tested in separate scenarios, one run each. Boundary value analysis and equivalence partitioning are kept in separate scenarios so that a failure points to one cause. State transition covers changing the method and leaving the step. No scenario needed a decision table.

The prompt follows my Day 8 scenarios prompt as a reference prompt. On reviewing the AI output, I asked for one happy path per payment method, covering the workflow from selecting the method to placing the order. The scenarios were more like test cases and went in detail rather than being high-level scenarios telling what needs to be tested against functionalities, mapping to user journey. AI also mixed up the concept of acceptance criteria and its anti-patterns, avoiding them in test scenarios as well. These areas were later corrected before accepting.

**Test scenarios:** [checkout_payment_test_scenarios.xlsx](checkout_payment_test_scenarios.xlsx)

### Test cases

Basis: the 33 scenarios, with every case tied to one scenario, 81 cases in all. The five happy-path cases each run a full order for one payment method, from entering the details to the order placed, the invoice, the empty cart, and the confirmation email. Expiry dates that depend on today are written relative to the current month, and fixed dates such as 01/2027 assume a run in 2026, as the Notes sheet of the file says.

The AI generated the first set of cases as an initial draft. I reviewed them for wrong steps, preconditions, postconditions and test data, and for cases that were not needed, and had them reworked to follow the happy-path scenarios. The test design techniques employed also had to be corrected depending upon the tests and the inputs.

**Test cases:** [checkout_payment_Test_Cases.xlsx](checkout_payment_Test_Cases.xlsx)

## Exercise: Run a time-boxed exploratory session and log defects

I ran one time-boxed session on the Payment step of checkout. The charter was to explore the handoffs into and out of the Payment step and the switching of payment methods, with interruptions such as back, refresh, repeated clicks, and leaving and returning. The aim was to find out whether the cart, the entered details and the order stay consistent. I set 45 minutes, which fitted the scope and complexity of the feature.

The session ran 50 minutes, with about 88% on the charter and about 6 minutes off charter on add to cart on the product detail page. It produced three defects: DEF-023 (an Unknown error when the card number is left empty), DEF-024 (the add to cart quantity) and DEF-025 (no feedback when the card holder name is left empty). It also raised five questions where the criteria give no expected result. Method switching and confirming more than once showed nothing unexpected.

**Charter and session sheet:** [Exploratory_Charter_and_Session_Sheet.md](Exploratory_Charter_and_Session_Sheet.md)

**Defect reports:** [defect_reports_exploratory_session.md](defect_reports_exploratory_session.md)

## Exercise: Build an RTM linking requirements to cases

The matrix traces the acceptance criteria to the test cases that cover them, so the coverage can be read at a glance. Every test case maps at least one requirement. Execution and defect status are filled in as the cases are run.

Open questions are not confirmed requirements, so they are on a separate tab with no test cases or status. When one is confirmed, it moves into the matrix.

**RTM file:** [checkout_Payment_RTM.xlsx](checkout_Payment_RTM.xlsx)

## Exercise: Use AI to assist where useful and note where you validated it

AI gave me initial drafts for the repetitive work: drafting, organizing notes, structuring, and formatting. I reviewed each one critically, corrected it and in places rewrote it heavily. The requirement analysis, decisions, approaches, and techniques come from my judgement, so the final decision stays mine throughout.

| Exercise | Where and how AI was used | Usefulness and validation |
|---|---|---|
| Analyse requirements and raise clarifying questions | I gave my notes on questions on the user story, had them transcribed, and the AI organized them into the structured list. | It saved organising and formatting, while the questions stayed mine. I checked the list against what I said and had it corrected. |
| Analyse requirements and raise clarifying questions (review log) | I researched question types, found the Ministry of Testing article, and brainstormed with the AI on how to ask each question. I wanted questions to be either Open, Clarifying or Probing. Depending upon the intent and nature of question, AI framed them into the review log. | It saved research time and made the questions clearer and more precise. I checked each against its requirement before logging it. |
| Write acceptance criteria and a lightweight test plan: the prompt | The AI wrote the prompt from my Day 8 criteria prompt and what I learned on Day 3 about BDD and Gherkin. | Starting from a template saves time. I validated the prompt through its output. |
| Write acceptance criteria and a lightweight test plan: the criteria | The AI wrote the criteria from the prompt, with concrete values and boundaries. | It saved writing every scenario by hand. I checked it against what I expected, the user story and requirements. It still introduced anti-patterns, missed a current-month expiry case, and included an instalment number that is not offered. I corrected all three. |
| Write acceptance criteria and a lightweight test plan: the test plan | The AI drafted the plan from the criteria and the prompt. | It saved the layout and wording. On review I corrected the testing approach, scope and the Definition of Ready and Done to fit this story. |
| Design a test case suite applying multiple techniques: the test scenarios | The AI wrote the initial scenarios from the prompt and the criteria. | They read like test cases, so I rewrote them as high-level scenarios mapped to a journey or workflow and added the missing ones, so every criterion has one. I checked them against the criteria, user story and domain knowledge, corrected them where applicable |
| Design a test case suite applying multiple techniques: the test cases | The AI generated the cases with their preconditions, steps, test data, expected results, and postconditions. | Writing 81 cases by hand would have taken far longer. I changed what was needed and checked them against the criteria and requirements, and scenarios before accepting them. This also saved the time that would have required to set up test data. |
| Run a time-boxed exploratory session and log defects: the charter and session sheet | I brainstormed the template with the AI from the ISTQB syllabus and the Bach material, filled it in myself, and sent it back for a final review. | The review caught a discrepancy in the time split, which I fixed. It also saved the time and effort that goes formatting and structuring. |
| Run a time-boxed exploratory session and log defects: the defect reports | I gave the AI my existing defect report prompt, the context, the issue, and my view of the severity. It generated a report for each defect in one go. | It saved significant time on documenting and formatting each defect. I checked each report against what I saw and filled the gaps it marked "Not provided". |
| Build an RTM linking requirements to cases | I gave the AI my reviewed scenarios, test cases and criteria, and it drafted and mapped the matrix. | It saved a lot of writing time. I reviewed it critically for any inconsistency and missing criteria or cases before accepting it. |
| Testing approach and decisions | I recorded my notes on approaches and decisions, and gave them to the AI, which structured them into the table. | Noting them as I go saves writing it up at the end. The AI formats the table, and I checked it against my notes. Corrected certain areas heavily where required, treating this as a baseline and initial draft. |
| All exercises: consistency across the artifacts | I used the AI to check the numbers across the documents, such as test cases, scenarios, and criteria. | It is quicker than checking by eye. I verified each difference against the sources. |

## Testing approach and decisions

| Decision | Alternatives considered | Why | Risk accepted |
|---|---|---|---|
| Test the payment step of checkout only. | The whole checkout flow; cart review only; the other demo site. | Its many fields and selections suit equivalence partitioning, boundary value analysis and state transition. The whole flow is too wide for a lightweight plan and an RTM I can defend. | Handovers from the billing stage not covered |
| Do the shift-left work through a thorough requirements analysis, logging every question, gap and ambiguity and tracing them through refinement. | - | I cannot join backlog refinement in this exercise, so the analysis is where defects are prevented rather than found later. And this is how I implement shift-left testing in this exercise | The questions go unanswered, so I make assumptions to write the test cases, although only in certain areas |
| Write my own clarifying questions from the story alone before anything else. | Reading the site's acceptance criteria first. | The analysis stays mine, and the site criteria do not decide which questions I ask. | My first list may be preliminary. Comparing it with the AI list and the criteria catch gaps. |
| Review the site's criteria as the primary requirements, note which of my questions they answer, and log the rest. | Treating them as the Product Owner's answers; working from the story alone. | A tester normally receives a story with its criteria. My first list stays as it is, to show the analysis done without them. | The criteria may not match the live site. I use my BDD format and mark what I added or removed. |
| Write my own questions first. Then give the AI the story, criteria and my questions, ask for the remaining gaps, and compare. | Giving the AI the story alone; asking the AI first. | Writing mine first keeps the comparison honest. The AI needs the criteria; it misses the scope without guard rails to act within. | The AI may be anchored by the criteria and miss gaps they hide. |
| Record the remaining questions in a review log | A plain checklist | The ISTQB review process logs questions with a status and an owner. Criticality shows which test is blocked, and the log tracks the impact on testing and timelines. | The log must be kept up to date as answers come in. |
| Frame each question by its intent, using the Ministry of Testing three question types: open, clarifying and probing. | Roughly written questions that mix up the intent. | My first list is open. I ask a clarifying question where something is unclear, and a probing one where the criteria give only part of a detail. Carefully framing the question gets a more precise answer. | The types can overlap, so placing some questions is a judgement. |
| Where a question stays open, mark an assumption, or park the question for the Product Owner or Business Analyst. | Filling the gap without saying so; waiting for answers. | Written-down assumptions can be traced into the criteria and test cases and checked later. | A wrong assumption carries into the criteria and tests, so each one is listed. |
| Write the acceptance criteria in BDD format, from the story alone, and then from the reviewed requirements and assumptions. | Rewriting the site's poorly written criteria. | The criteria carry the assumptions and parked questions, so they are written after the analysis. | Wrong assumptions or the site's anti-patterns could carry into my criteria and scenarios. |
| Keep open questions out of the traceability matrix, on a separate tab. | Listing them as requirements with no test cases; leaving them out. | They have no confirmed answer yet, so they are not requirements. They move in once confirmed. | Someone reading only the matrix can miss them, so a note points to the tab. Confirmed answers must be carried across, or the this goes stale. |
| Risk-based prioritisation | Giving every area equal weight. | A failed payment or missing confirmation stops the order. Unavailability of a payment method can lead to poor user experience. I assume the billing story is tested before this one; if not, the handoff is tested early. | The input fields could stay with poor/ missing/untested validation rules. |
| Set a Definition of Ready and a Definition of Done in the test plan, testing approach scope. | - | Ready stops tests being written against unclear requirements. Done stops release with serious defects open. | Performance and security are not covered, as payment is simulated. |
| Use boundary value analysis on fields with a length or date limit: card number, CVV, gift card number, validation code, and expiration date. | Testing every value. | Faults tend to sit at a limit, so values at it and either side of it show whether it is enforced. | A fault away from the limits is not found. |
| Split the input of each text field into valid and invalid classes and test one value from each: bank name, account name, account number, card number, CVV, card holder name, gift card number and validation code. | Testing every value. | Values in a class should behave the same way, so one is enough. | - |
| Use state transition only where the behavior depends on earlier steps: changing the method and back and leaving and returning to the Payment step. | Testing each method on its own. | The reset rules only show when the steps are done in sequence. Most of this feature is input validation, so I did not force the technique elsewhere. | - |

## Reflection: comprehensive reflection on the 2-week journey - strengths built and areas to keep growing

Core idea: I came into the CoE with working knowledge of manual testing: the terminology, the test design techniques, the testing levels and where QA fits in the software development lifecycle. The two weeks put that knowledge to use in exercises and showed me where it held up when I applied it, and where it needed more work. They also showed me the areas I had only touched on and need to keep learning, and those are where I want to spend my time next.

### Strengths built

Manual testing fundamentals. I went in being familiar with the testing concepts, principles, techniques, levels and types, and approaches such as shift-left and risk-based testing. The CoE let me dig deeper into these and into how they can be implemented most effectively. The exercises tested whether I could apply these learnings and pushed me to work on areas where it took more effort. State transition is a test design technique I haven't had much opportunity to work with and applying it precisely to the feature states and transitions was more complex than the other techniques.

Acceptance criteria and BDD. I had some understanding of BDD going in. Day 3 took it further into Gherkin, behavior-driven development, Cucumber and the anti-patterns. The ATDD course covered acceptance tests as executable specifications. Farley explains that they tell what a system must do, in the language of the problem, and they’re written before the code. Furthermore, they don’t break every time the system changes, because the technical detail sits in separate layers underneath. The course covers this in the Test infrastructure and Four-layer model sections.

The Three Amigos session brings QA, developers and the Product Owner together before development to settle a story. Here I also learned more on how and why one must write criteria that are unambiguous, testable, measurable, and complete. I practiced this with checkout scenarios and by rewriting poorly written criteria. Day 7 added the other side, which is how to clarify requirements and raise questions with a cross-functional team.

AI in testing. On Day 1 I generated test cases with AI and compared them with the ones I had designed by hand. The comparison showed where AI helps most, where my own cases were stronger and what each set missed. Day 8 added prompt writing for QA tasks and an experiment structured with AI. A well-built prompt saves time and brings you closer to the expected output, but the output still must be validated. I now see more clearly where AI helps most in QA tasks, where it should not be relied on, and where my judgement matters most. Every output needs to be checked for correctness and accuracy against the requirements, documentation and product knowledge, and confirmed with domain experts where applicable. That has strengthened how I approach AI-assisted testing in every task.

Accessibility testing. This was a new ground for me. I covered the fundamentals, why it matters, the WCAG principles, the common issues and the tools, and ran an audit with WAVE and Lighthouse.

API testing and Postman. I was aware of the fundamentals of API testing and Postman going in. The Postman Learning Center was a good revisit of what Postman offers as a tool, and the resources revisited REST API fundamentals and HTTP methods. I would like to take up the Udemy course once the CoE is complete. I believe this will allow me to strengthen and add to my existing skills in REST API testing and Postman.

Exploratory testing. I had experience in exploratory testing and an idea of time-boxed sessions and charters. The resources, including the article by James and Jon Bach, gave me a concrete idea of how exploratory testing works, how session-based test management is carried out formally with charters and time-boxed sessions, and where and when exploratory testing adds the most value.

### Areas to keep growing

These are the areas where my knowledge is still at foundation level or where I have only covered part of the subject.

1. BDD, Gherkin and acceptance criteria. This is one of the areas I most want to develop. Behavior-driven and test-driven development are practices I see as important, especially here, and I want to build my skills in them. I will continue with the books assigned to this module after my current learning planner in the CoE is complete.
2. Agile. I have worked in agile environments before and practised that knowledge through the exercises and tasks in the planner, which I mostly carried out in an Agile context. I am keen on taking up the book Clean Agile: Back to Basics for the depth and new insights it would add to my understanding of Agile principles and values, as I am sure there is a lot more to learn and explore in this thinking.
3. Accessibility testing. It is new to me, and I have built only the foundations here. I would like to pick up the Udemy course after the current CoE ends and keep practicing audits until it is a skill I can use.
4. Prompt engineering and AI-forward testing. I have covered only part of it. I want to work through Anthropic's materials in more depth, to understand prompt engineering, practice it and use Claude effectively in my QA processes.
5. API testing and microservices is a vast area. I have been building the foundations and some skills over the last few months, but there is still a long way to go before I can use them effectively in projects and build expertise. So, I will continue the Udemy Postman course and read the book I already have on APIs and microservices, to build deeper skills in API testing and automation and move beyond the foundations.
