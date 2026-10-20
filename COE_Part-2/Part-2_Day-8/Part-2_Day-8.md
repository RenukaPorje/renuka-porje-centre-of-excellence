# Day 8: AI-Assisted Manual Testing

# How AI changes manual testing:

**Core idea:** AI changes where the time goes, in manual testing. Writing test cases, test data and documents takes far less time, but someone must still check that what is written is correct, and that does involve investing a considerable amount of time to review everything the AI produces. So, the job moves from writing towards reviewing, refining, and taking decisions. What a human does is investigate, explore, and critically think, and notice that something in the product looks odd and decide where to look next.

## Test generation

- AI can draft a full suite in minutes, from a story, including boundary values and edge cases that are easy to overlook, like whitespace-only input, state persistence and session time-outs. It also takes care of the repetitive parts, such as writing detailed test cases, including steps, preconditions and setting up test data, to document it all. This can be quite tedious and time-consuming, where getting initial drafts from AI can save significant effort and time.

- The risk is that it reads well even when it is wrong. On Day 1, Claude put an account lockout on the 4th failed attempt when the AC said the 3rd, even with the documentation in the prompt. A generated case must be understood before it can be judged. Also, there is a risk of automation bias, a trap, where people check a few generated tests and assume the rest are fine.

## Test data

- Test data suits AI well, realistic names, addresses and dates, boundary and invalid values, and larger sets once the structure is defined. It only reflects the rules the AI knows about, though. The Ministry of Testing article describes tests that passed in every test environment and failed in production, because a partner system enforced validation rules nobody on the team knew about. So, this is where a human must critically think, assess the requirements, and collaborate with the team to understand the business rules and logic and any industry or domain specific knowledge. AI cannot do this collaboration for you. Also, tests still must be run against the system with prod-like configurations or closely imitating prod systems, if possible, but then again, real customer data stays out of AI.

## Planning, risk and requirements

- AI turns rough notes into a readable plan or summary quickly. It doesn’t know who the users are or which failure would hurt most, so risk and priority should stay with the tester. The Ministry of Testing article says AI “cannot infer risk from first principles” and warns that skipping the conversation with developers and product managers leaves a plausible rule that nobody has checked.

## Review

- **AI reviews the requirements:** Before any test is written, AI can read the story or the AC and flag what is ambiguous and inconsistent. It can give back questions on these for the BA or PO, which it can’t answer itself. It would be on the tester to understand this and question any assumptions in AI output and not go through with them as it is.

- **AI acts as your reviewer, but with context:** I write the test cases, criteria or defect report, and AI reviews them first as any peer would, if I gave it what a human reviewer would know of the requirement, the right context, the standard and an instruction to challenge anything that looks wrong. On Day 3 doing this enabled AI to spot anti-patterns in my criteria. On Day 1, I left it out, and Claude added severity to every test case without questioning it with real confidence.

- **Reviewing AI outputs:** When AI produces something, I check for problems by splitting them into four types, errors (a wrong expected result), omissions (something with no test), assumptions (AI filling a gap with a rule or understanding from similar systems) and invented data which could be results of hallucinations.

## Exploratory testing

- AI can support an exploratory session before it starts and while it is running. Beforehand, it can list what could go wrong in a feature from the point of view of different users, which gives me angles I might not have thought of. During the session, it can look at a screenshot alongside me, a bit like a second pair of eyes.

- The ideas it gives are only a starting list, because AI can’t tell what the product should do in every scenario you stumble on while exploring. So, the effort moves to choosing which ideas are worth following and which to drop. A satisfice article by Bach and Bolton draws a line between testing, which is learning about the product by exploring it, experimenting and evaluating, and checking, which is verifying statements mechanically. By that line, going through an AI list item by item is checking, and it becomes testing when something I see in the product changes what I test and explore next.

## Where it fits and where it doesn’t

- AI fits work that is well defined and repetitive, such as test data, formatting and first drafts. It fits badly where the answer depends on context nobody has written down, like risk, business rules and the first version of a test strategy, principles, and standards. In short, AI works with what has been written down, and the rest must come from people.

**Key Takeaways:** The time being invested moves from documenting to reviewing, refining and deciding what is right. Review now goes multiple ways: AI reviews the requirements, AI reviews my work as a first peer, and I review what AI produces. AI fits repetitive, well-defined work and adds ideas to an exploratory session, while risk, business rules and what to follow up stay with me.

# Exercise: Using AI to draft acceptance criteria, test scenarios, test cases, defect report, and refining them

**Core idea:** The exercise takes one feature, the Product Detail story from the Practice Software Testing Toolshop, through the main artefacts a tester works with: acceptance criteria, test scenarios, test cases and a defect report. AI drafts each one and I review and refine it. The order helped here, because the scenarios come from the criteria, the test cases from the scenarios, and the defect report from what turns up when the cases are run. This enabled me to have the right inputs in every prompt against these QA activities and get the right output, used in prompt for the subsequent activity. For the defect report, I used a bug that I found while exploring the feature.

**User story:** As a visitor, I want to view a product’s details, add it to my cart, or save it to my favorites, so that I can purchase it or come back to it later.

## Part A: AI-drafted acceptance criteria

### Effective prompt for acceptance criteria

- I wanted criteria in the Day 3 BDD gherkin format, so the prompt had to carry that standard with it. The Day 3 rules for writing criteria went into the context, and two of my Day 3 features went in as examples. Examples are one of the most reliable ways to steer the format of the output, which is why I relied on them.

- The rest follows the Claude prompting guide: a one-line role, an XML tag for each kind of content, and numbered instructions. The output format shows the shape I expected, with a Rule for each behavior, its scenarios under it, and any parked questions under the rule they belong to.

- I brainstormed with AI to write an effective prompt and to learn what worked vs what didn't. I reviewed the early drafts of the prompt the way I would review any other work. This caught incorrect standards or expected outputs, placeholder text, and some weak examples.

**Prompt file:** [QA_prompt_ACs_refined.txt](QA_prompt_ACs_refined.txt)
### AI output

**Output file:** [ACs_output_AI_original.pdf](ACs_output_AI_original.pdf)
### Critical review of the AI output

- The output followed the format of the examples, for the most part. One scenario needed rewording: the not-found case started from “a product with the requested identifier”, which is technical wording and doesn’t match the style of the rest, so it now uses a product name from the catalogue.

- Three items came from the model’s domain knowledge and not from the story: the “no longer exists” title, the out-of-stock scenario and a saved-favorite indicator. They have been included in parked questions and assumptions.

### Refinement of the AI-drafted acceptance criteria

The Toolshop’s own criteria answered most of the parked questions and added two rules we had missed, related products and the favorites option for every visitor. They also contradicted one assumption, about the visitor who is not logged in. To make the ACs complete, clear and measurable, I asked AI to take the site’s criteria into account for the expected behavior we had missed and to draft a revised set. It overwrote the Gherkin scenarios with the site’s style of criteria, which introduced a few anti-patterns and breaks the Day 3 rules. The final version corrects these anti-patterns and refers to certain details in the site’s documentation. The questions the site doesn’t answer stay parked.

**Final acceptance criteria**

```gherkin
Feature: Product detail
  As a visitor,
  I want to view a product's details, add it to my cart, or save it to my favorites,
  so that I can purchase it or come back to it later.

  Rule: A visitor can view a product's details

    Scenario: Visitor opens a product's page
      Given the catalogue contains a hammer priced at $14.50
      When a visitor opens the hammer's page
      Then the page should show the hammer's image, name, description and price
      And the page should show the hammer's category and brand

    Scenario: Visitor sees related products
      Given the catalogue contains a hammer and products related to it
      When a visitor opens the hammer's page
      Then the page should show the products related to the hammer

    Scenario: Visitor opens a product that is not in the catalogue
      Given the catalogue does not contain combination pliers
      When a visitor opens the page for combination pliers
      Then the visitor should be told that combination pliers could not be found

    Question parked: Confirm the exact wording of the message shown when a product cannot be found with the Product Owner or Business Analyst.

  Rule: Quantity must be between 1 and 999,999,999

    Scenario: Quantity starts at 1
      Given the catalogue contains a hammer that is in stock
      When a visitor opens the hammer's page
      Then the selected quantity should be 1

    Scenario Outline: Quantity within the limits is accepted
      Given a visitor is viewing a hammer that is in stock
      When the visitor changes the quantity to <entered quantity>
      Then the selected quantity should be <entered quantity>

      Examples:
        | entered quantity |
        | 1 |
        | 2 |
        | 50 |
        | 999999999 |

    Scenario Outline: Quantity below 1 resets to 1
      Given a visitor is viewing a hammer that is in stock
      When the visitor changes the quantity to <entered quantity>
      Then the selected quantity should reset to 1

      Examples:
        | entered quantity |
        | -1 |
        | 0 |

    Scenario Outline: Quantity above 999,999,999 resets to 999,999,999
      Given a visitor is viewing a hammer that is in stock
      When the visitor changes the quantity to <entered quantity>
      Then the selected quantity should reset to 999999999

      Examples:
        | entered quantity |
        | 1000000000 |
        | 1000000001 |

  Rule: A visitor can add a product that is in stock to the cart

    Scenario: Visitor adds a product to the cart
      Given the hammer is in stock
      And the visitor has selected a quantity of 1
      When the visitor adds the hammer to the cart
      Then the visitor should see a confirmation that the hammer was added to the cart
      And the cart should hold 1 hammer

    Scenario: Visitor adds the selected quantity to the cart
      Given the hammer is in stock
      And the visitor has selected a quantity of 3
      When the visitor adds the hammer to the cart
      Then the visitor should see a confirmation that the hammer was added to the cart
      And the cart should hold 3 hammers

    Scenario: Visitor opens a product that is out of stock
      Given the hammer is out of stock
      When a visitor opens the hammer's page
      Then the visitor should be told that the hammer is out of stock
      And the hammer should not be available to add to the cart

    Question parked: Confirm whether adding a product that is already in the cart increases its quantity or is blocked with the Product Owner or Business Analyst.
    Question parked: Confirm what the visitor should see when the quantity exceeds the available stock with the Product Owner or Business Analyst.
    Question parked: Confirm how a rental item is handled on this page, since the out-of-stock rule excludes rental items, with the Product Owner or Business Analyst.

  Rule: A visitor can save a product to their favorites

    Scenario: Logged-in visitor saves a product to their favorites
      Given a visitor is logged in as Jane Doe
      And Jane Doe's favorites do not contain the hammer
      When Jane Doe saves the hammer to her favorites
      Then the hammer should appear in Jane Doe's favorites
      And Jane Doe should see a confirmation that the hammer was added to her favorites

    Scenario: Logged-in visitor saves a product that is already in their favorites
      Given a visitor is logged in as Jane Doe
      And Jane Doe's favorites already contain the hammer
      When Jane Doe saves the hammer to her favorites
      Then Jane Doe's favorites should contain the hammer once
      And Jane Doe should be told that the hammer is already in her favorites

    Scenario: Visitor who is not logged in saves a product to their favorites
      Given a visitor is not logged in
      When the visitor saves the hammer to their favorites
      Then the visitor should be told that they are not authorised to add a product to their favorites

    Question parked: Confirm whether a product that is already in a user's favorites is shown as saved on its page with the Product Owner or Business Analyst.
    Question parked: Confirm whether a maximum number of favorites applies with the Product Owner or Business Analyst.
```

**Key Takeaways:** The model followed the style of the examples, and its weak spots were the assumptions it added from its own domain knowledge. A draft is only as reliable as the source it is checked against, and here the Toolshop’s own criteria corrected one of those assumptions.

**Final refined acceptance criteria:** [AC_output_merged_and_refined.pdf](AC_output_merged_and_refined.pdf)
## Part B: Using AI to analyze requirements to surface any ambiguities

### Effective prompt: requirements analysis

- I wanted a list of questions for the Product Owner and the Business Analyst, so the prompt asks the model to read the criteria as the tester who will design tests from them. It names what to look for: gaps, ambiguity, testability, inconsistency and inaccuracy and any assumptions.

- The output is a review log, with one example row from a different feature so that the model copies the format and not the content. The story and criteria sit above the instructions, as the guide advises long input should stay at the top of the prompt, and the tags and numbered steps follow Part A.

**Prompt file:** [QA_prompt_req_analysis_from_ACs.txt](QA_prompt_req_analysis_from_ACs.txt)
### AI output

**Output file:** [req-analysis-AI-output.pdf](req-analysis-AI-output.pdf)
### Critical review of the AI output

- The first run strayed into cart behavior, such as the cart total and cart review, so I corrected the scope.

- The second run gave 23 questions; all grounded in the criteria. Seven of them read as not valid questions or something requirements already imply.

### Refinement of the AI-drafted requirements analysis

The refined list has 17 questions that I would take to the Product Owner and the Business Analyst.

| **ID** | **Requirement or AC**                                                                         | **Question**                                                                                                                                                                                           | **Directed to**  | **Criticality and what it blocks**                                                                                       |
|--------|-----------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------|
| G1     | “the page should show the products related to the hammer”                                     | What should the page show when a product has no related products: an empty section, a message, or nothing?                                                                                             | Business Analyst | Medium: a test for a product without related items can be written only by assuming the behavior.                         |
| G2     | “When the visitor changes the quantity to \<entered quantity\>”                               | What happens when the visitor enters an empty value, a decimal such as 2.5, letters, or pasted text? Only whole numbers from -1 to 1000000001 are covered.                                             | Product Owner    | Medium: the expected quantity cannot be stated for any non-integer input.                                                |
| G3     | “the hammer should not be available to add to the cart”                                       | On an out-of-stock page, should the quantity field and the favorites action still be usable? What quantity is shown, given that the quantity scenarios only cover in-stock products?                   | Product Owner    | Medium: the expected state of the other controls on an out-of-stock page is unknown.                                     |
| G4     | “the visitor should be told that combination pliers could not be found”                       | What should be shown for a page address with a malformed identifier, as opposed to a well-formed identifier that has no product? Should the message be the same and offer a way back to the catalogue? | Business Analyst | Medium: tests for invalid addresses need an assumed result.                                                              |
| G5     | “the visitor should be told that they are not authorised to add a product to their favorites” | After this message, does the visitor stay on the page or go to a login screen? If they log in, is the product then saved to favorites?                                                                 | Product Owner    | Medium: the end state of the flow cannot be verified without an assumption.                                              |
| G6     | “the cart should hold 1 hammer”                                                               | Does a visitor who is not logged in have a cart? Does the cart persist after a page refresh, a closed browser, or logging in?                                                                          | Product Owner    | Medium: it is unclear whether the cart scenarios apply to anonymous visitors, and what a persistence test should expect. |
| G8     | “When the visitor adds the hammer to the cart”                                                | What should happen if the product goes out of stock after the page loads but before the visitor adds it to the cart?                                                                                   | Product Owner    | Medium: the expected result of this timing case is assumed.                                                              |
| G9     | “When Jane Doe saves the hammer to her favorites”                                             | What should happen if Jane Doe's session has expired when she saves the hammer?                                                                                                                        | Product Owner    | Medium: the expected result for an expired session is unknown.                                                           |
| G10    | “the page should show the hammer's image, name, description and price”                        | What should the page show if the image or the description is missing for a product?                                                                                                                    | UX designer      | Medium: a test for incomplete product data can be written only with an assumption.                                       |
| G11    | “Given the catalogue contains a hammer priced at \$14.50”                                     | How is the price displayed: currency symbol, decimal places, thousands separator? Can a product show a discounted or sale price?                                                                       | Business Analyst | Medium: the exact expected price text cannot be stated for other amounts.                                                |
| A1     | “the page should show the products related to the hammer”                                     | What makes a product "related" (same category, same brand, or other)? How many related products are shown, in what order, and what is shown for each one?                                              | Product Owner    | High: the expected list of related products cannot be stated.                                                            |
| A2     | “the visitor should be told that the hammer is out of stock”                                  | What exact wording is used, and where on the page does the message appear?                                                                                                                             | UX designer      | Medium: the expected text and position cannot be stated for the check.                                                   |
| T1     | “the visitor should see a confirmation that the hammer was added to the cart”                 | What does the confirmation look like (toast, banner, or page change), what does it say, and how long does it stay? Does the cart count in the header update?                                           | UX designer      | Medium: the test has no measurable check for the confirmation.                                                           |
| T2     | “the cart should hold 1 hammer”                                                               | Where does the tester check the cart contents: the header count, the cart page, or both?                                                                                                               | Developer        | Medium: the observation point for the result is not named.                                                               |
| T3     | “Jane Doe should see a confirmation that the hammer was added to her favorites”               | What does this confirmation say and where does it appear? Where in the account area should the hammer be seen as saved?                                                                                | UX designer      | Medium: the expected message and location cannot be checked without them.                                                |
| I1     | “the selected quantity should reset to 1”                                                     | Is the visitor told when a quantity outside the limits is reset? If so, what does the message say for a quantity below 1 and for one above 999,999,999?                                                | Product Owner    | Low: the value after the reset can be tested, but whether a message is expected cannot.                                  |
| N1     | “Quantity above 999,999,999 resets to 999,999,999”                                            | Is 999,999,999 an intended business limit or a technical limit, such as a field or database size?                                                                                                      | Product Owner    | Medium: the boundary values 999999999 and 1000000000 depend on the real limit.                                           |

\[G for gap, A for ambiguity, T for testability, I for inconsistency, and N for inaccuracy\]

Response is blank, and Status is Open on every row, so I left both columns out.

**Key Takeaways:** The model found real gaps and ambiguities, generating a review log, which would help track these questions in minutes. But deciding which questions were worth asking, and which were invalid was my part.

**Refined output file:** [req-analysis-AI-output-refined.pdf](req-analysis-AI-output-refined.pdf)
## Part C: Using AI to expand the suite: test scenarios and traceability

### Effective prompt: test scenarios

- I wanted one-line scenarios that trace back to the requirements, so they could be checked for missing edge cases and then expanded into test cases. The context says this, because the guide advises giving the reason behind a task, and it helps the model see why each scenario must be distinct.

- Role, tags and numbered instructions are the same as before, and the output is two tables with named columns. I gave only one example, from the checkout cart.

**Prompt file:** [QA_prompt_req_test_scenarios.txt](QA_prompt_req_test_scenarios.txt)
### AI output

**Output file:** [test-scenarios-AI-output.xlsx](test-scenarios-AI-output.xlsx)
### Critical review of the AI output

- The output had 16 scenarios and a matrix of 18 requirements. All 13 scenarios from the criteria map to a requirement, the six parked points show not covered, and the IDs match.

- Four scenarios say the page “behaves correctly” or “handles” something, which doesn’t say what to verify. That wording came from the example row in my prompt, so the scenarios had to be made more precise without going into the detail that belongs in test cases.

### Refinement of the AI-drafted test scenarios

The five scenarios were rewritten to say what the system does, written for the tester and not in acceptance-criteria style. TS-12 and TS-13 stay as assumptions, with their expected results left open until questions G2 and G4 are answered.

**Final test scenarios**

| **ID** | **Scenario**                                                                                                                                 | **Type**   |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------|------------|
| TS-01  | Verify the product page shows the product's image, name, description, price, category and brand                                              | Happy path |
| TS-02  | Verify the product page shows the products related to the product                                                                            | Happy path |
| TS-03  | Verify the system shows a quantity of 1 by default when the page of an in-stock product opens                                                | Happy path |
| TS-04  | Verify a visitor can change the quantity to values within the allowed range                                                                  | Happy path |
| TS-05  | Verify a visitor can add an in-stock product to the cart in the selected quantity and receives a confirmation                                | Happy path |
| TS-06  | Verify a logged-in visitor can save a product to their favorites and receives a confirmation                                                 | Happy path |
| TS-07  | Verify a visitor can reach a product's page from the catalogue                                                                               | Happy path |
| TS-08  | Verify a visitor can reach a product's page from a related product                                                                           | Happy path |
| TS-09  | Verify the system displays a message saying the product could not be found when the page of a product that is not in the catalogue is opened | Negative   |
| TS-10  | Verify the system displays a message saying the product is out of stock and does not allow it to be added to the cart                        | Negative   |
| TS-11  | Verify a visitor who is not logged in cannot save a product to their favorites                                                               | Negative   |
| TS-12  | Verify the system does not allow an empty or non-numeric quantity to be added to the cart                                                    | Negative   |
| TS-13  | Verify the system does not display a product and shows an error or not-found message when the product address is malformed                   | Negative   |
| TS-14  | Verify a quantity below the lower limit is handled at and beyond the boundary                                                                | Edge       |
| TS-15  | Verify a quantity above the upper limit is handled at and beyond the boundary                                                                | Edge       |
| TS-16  | Verify saving a product that is already in the visitor's favorites does not create a duplicate                                               | Edge       |

**Key Takeaways:** The mapping and the IDs were right, and the weak spot was wording. A model copies what the prompt shows it, faults included, so an example needs as much care as the instructions. It also wrote its scenarios in the Gherkin format of the ACs, and I wanted to avoid anti-patterns in scenarios as well, so this had to be corrected with a revised prompt.

**Refined output file:** [test-scenarios-AI-output-refined.xlsx](test-scenarios-AI-output-refined.xlsx)
## Part D: Using AI to surface edge cases from the requirements

### Effective prompt: edge cases

- I wanted to find any missing edge cases that no existing scenario covers. The input is the story, the criteria, and the refined scenarios with their RTM, so the model can see what is already covered, and I asked only for what is missing.

- The prompt points to where edge cases usually sit, unusual or boundary inputs, things that change between opening the page and acting on it, missing data, and actions that fail or repeat. The scope stays on the Product Detail page.

- One example from a registration form shows the style and how the matrix is updated. The output uses the same two tables as Part C, which makes the old and new scenarios easy to compare.

**Prompt file:** [QA_prompt_edge_cases_by_AI.txt](QA_prompt_edge_cases_by_AI.txt)
### AI output

**Output file:** [edge-cases-AI-output.xlsx](edge-cases-AI-output.xlsx)
### Critical review of the AI output

- The model added 14 scenarios, TS-17 to TS-30, all in scope, and none repeating an existing one. Six of them match questions from my requirements analysis that the model never saw, which gives me more confidence in both lists.

- TS-24 and TS-25 were valid but clumsy, so had to fix the wording, so the intent was clear.

### Refinement of the AI-drafted edge cases

The model put six scenarios in a “domain knowledge” row, which a traceability matrix doesn’t have, so I mapped each to its closest requirement. Only TS-12 had no defensible link. It sits in a final row as an assumption that points to question G2.

**Added edge cases**

| **ID** | **Scenario**                                                                                                                                   | **Type** |
|--------|------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| TS-17  | Verify the product page opens correctly when the product has no related products                                                               | Edge     |
| TS-18  | Verify the related products do not include the product being viewed                                                                            | Edge     |
| TS-19  | Verify the product page opens correctly when the product has no image                                                                          | Edge     |
| TS-20  | Verify the product page shows a product name and description that contain special characters or markup as plain text                           | Edge     |
| TS-21  | Verify the handling of a decimal quantity, such as 2.5, entered on the product page                                                            | Edge     |
| TS-22  | Verify the handling of a quantity entered with leading zeros or in exponent notation                                                           | Edge     |
| TS-23  | Verify the quantity when it is changed by one step down from 1 and by one step up from 999999999                                               | Edge     |
| TS-24  | Verify the selected quantity after the product page is refreshed with a changed quantity                                                       | Edge     |
| TS-25  | Verify the quantity added to the cart when a visitor types a quantity and adds the product without leaving the quantity field                  | Edge     |
| TS-26  | Verify the handling of adding a product to the cart when it went out of stock after the page was opened                                        | Edge     |
| TS-27  | Verify the handling of adding a product to the cart or saving it to favorites when it was removed from the catalogue after the page was opened | Negative |
| TS-28  | Verify the handling of saving a product to favorites when the visitor's login session ended after the page was opened                          | Negative |
| TS-29  | Verify the favorites contain the product once when the save action is triggered twice in quick succession                                      | Edge     |
| TS-30  | Verify the handling of saving an out-of-stock product to the favorites of a logged-in visitor                                                  | Edge     |

**Key Takeaways:** Both versions agreed on six points, which gives me more confidence in both. The “domain knowledge” row would have caused more confusion than answers in a traceability matrix, so every scenario was mapped back to a requirement.

**Refined output file:** [edge-cases-AI-output-refined.xlsx](edge-cases-AI-output-refined.xlsx)
## Part E: Using AI to expand the suite: detailed test cases from the final scenarios

### Effective prompt: test cases

- I wanted detailed cases that can be run, each mapped to a scenario. The prompt carries the story, the criteria and all 30 scenarios with the matrix, and the instructions say which technique to use and when: equivalence partitioning, 3-value boundary value analysis, decision table, state transition and error guessing, with the technique shown in the title.

- Where the criteria give no result, the model writes “To be confirmed” and puts the open point in a Remarks column, so it doesn’t invent a message. The first output came back in acceptance-criteria style, so I added a rule that expected results say what the system does and displays precisely.

- The role, tags, and numbered instructions are the same as before. There is one example, from my Day 1 test cases for format only, and a fixed table, and one prompt covers all 30 scenarios.

**Prompt file:** [QA_prompt_test_cases_AI.txt](QA_prompt_test_cases_AI.txt)
### AI output

**Output file:** [test-cases-AI-output.xlsx](test-cases-AI-output.xlsx)
### Critical review of the AI output

- The model returned 42 cases for the 30 scenarios. The mapping needed no change, the test data was usable as drafted in 32 of them and the content of the expected results followed the criteria.

- Some expected results were worded like acceptance criteria, and two messages were invented. A few details went off the rails, and the steps were inconsistent.

- I explored the Toolshop, and noted differences from the criteria in the Remarks: a quantity cap of 99, a reset while typing and no message for an unknown product. So, the test cases are only based off the ACs and not current behavior, and questions have been parked for confirmations.

### Refinement of the AI-drafted test cases

The corrections were few and repeated across rows: a fixed first step, an empty-cart baseline, a spare test product, and an admin user for the data-changing cases, realistic address inputs, and 38 expected results rewritten as what the system displays. They use the Toolshop’s message text where it exists and “to be confirmed” where it does not.

**Key Takeaways:** The model wrote the steps, test data, expected results and postconditions for all 42 cases, each mapped to a scenario and a technique. The content was mostly right, so the effort went into checking it field by field.

**Refined output file:** [test-cases-AI-output-refined.xlsx](test-cases-AI-output-refined.xlsx)
## Part F: AI-drafted defect report

### Effective prompt: defect report

- I wanted a report built only from what I had observed. The prompt gives the observation, the criterion it breaks and the fields I wanted, and tells the model to use nothing else and to write “Not provided” where a field has no source. Severity uses a four-level scale defined in the prompt, as ISTQB also defines severity, not levels.

- This prompt took about 10 rounds. The guide describes the model as a new employee who is capable but lacks context, and that is how it behaved. The early versions carried fields that belong to test cases and left out the product details, the username used in testing, and the frequency of occurrences.

- The Role, tags, and numbered instructions are the same as in the other prompts. The output is a two-column table, and there is no example, so there was nothing for the model to copy, which I think is why it took so many iterations to get it right. The fields are the ones a defect report usually has.

**Prompt file:** [QA_prompt_defect_report.txt](QA_prompt_defect_report.txt)
### Critical review of the AI output

- A logged-in user adds the Hammer to favorites and gets “Upsss... something wrong”, although intermittently, and the product is not added. This is also recorded as a bug in the site’s own documentation.

- Over the rounds I corrected the prompt on several points. A defect report has no preconditions, and the title stays short, with the detail going in the description along with the product, the username and the frequency. Reported by and Date reported are separate fields. Test item is not a field in any tool, so it became Feature, Test environment and Build version.

- The final output was correct on the title, description, steps, expected, and actual results and severity. The expected message matches AC11 word for word, and the model didn’t guess a cause or invent evidence although it still added a Precondition field

### Refinement of the AI-drafted defect report

The refined report adds a description, drops the Precondition field with its point moving into the description. The Impact line is shorter, corrected severity, all required fields such as user story and feature. The refined report is below.

| **Field**          | **Value**                                                                                                                                                                                                                                                                                                                                                        |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID                 | DEF-001                                                                                                                                                                                                                                                                                                                                                          |
| Title              | Error “Upsss... something wrong” shown when adding Hammer to favorites                                                                                                                                                                                                                                                                                           |
| Feature            | Product Detail                                                                                                                                                                                                                                                                                                                                                   |
| User story         | Product Detail, AC11 – Add to Favorites                                                                                                                                                                                                                                                                                                                          |
| Description        | When logged in as Jane Doe, selecting “Add to favourites” on the Hammer product detail page shows the error “Upsss... something wrong” and the Hammer is not added to favorites. Hammer was not one of her favorites beforehand. This happens intermittently. The user can’t save the product, and the message doesn’t explain what happened or what to do next. |
| Reported by        | Renuka                                                                                                                                                                                                                                                                                                                                                           |
| Date reported      | 19 October 2026                                                                                                                                                                                                                                                                                                                                                  |
| Test environment   | https://with-bugs.practicesoftwaretesting.com, Google Chrome                                                                                                                                                                                                                                                                                                     |
| Build version      | 1.0.0                                                                                                                                                                                                                                                                                                                                                            |
| Steps to reproduce | 1. Log in as Jane Doe.<br>2. Open the Hammer product detail page.<br>3. Select “Add to favourites”.                                                                                                                                                                                                                                                                   |
| Expected result    | The Hammer is added to Jane Doe’s favorites and the success message “Product added to your favorites list.” is displayed.                                                                                                                                                                                                                                        |
| Actual result      | The error message “Upsss... something wrong” is displayed on the product detail page. The Hammer is not added to Jane Doe’s favorites.                                                                                                                                                                                                                           |
| Severity           | Medium. A secondary feature fails, and there is no way to complete the action.                                                                                                                                                                                                                                                                                   |
| Priority           | Medium                                                                                                                                                                                                                                                                                                                                                           |
| Status             | New                                                                                                                                                                                                                                                                                                                                                              |
| Impact             | Adding other products to favorites may show the same error. Users cannot build a favorites list.                                                                                                                                                                                                                                                                 |
| Evidence           | Not provided                                                                                                                                                                                                                                                                                                                                                     |

**Key Takeaways:** A defect report looks simple, but it took about 10 rounds to get a prompt that produced a presentable one, although because of missing example. The model didn’t know which fields a defect report needs or what to leave out and had to be told.

# Limits of AI in testing, and when not to rely on it:

**Core idea:** AI produces text that sounds right, and nothing in it checks that the text is true. That is fine for drafts, ideas and repetitive work, but it can’t be the authority on what is correct, on what the system does, or on any check that must give the same answer every time.

## Hallucination risk

- A hallucination, in ISTQB terms, is output that looks factually wrong or irrelevant to the task. The model works from patterns in its training data, so what it writes can be fluent and still wrong. Plausible is not the same as correct.

- The Ministry of Testing article makes a practical point. The first output is often rough or plausible, built on whatever context the model guessed, or had, so it is a starting signal and not an answer. Better prompts help, but they don’t remove the need to review it.

- In testing, the syllabus describes hallucinations as invented or irrelevant test cases, test scripts that are wrong or don’t run, and test cases that verify acceptance criteria that don’t exist. That can mislead the tester and undermine the validity of the results.

- Hallucinations are checked by cross verifying the output against the documentation, requirements and known system behavior, and by domain experts. In Part E, the two invented messages were caught by comparing each expected result with the criteria. The questions I wrote for the Product Owner and the Business Analyst in Part B are the second kind of check, since the model can’t answer them itself. The syllabus also asks for outputs to be consistent with each other.

## Deterministic checks

- A deterministic check returns the same result every time it runs against the same input. Language models are non-deterministic. They generate text by sampling each next word from a probability distribution, so the same prompt can give different answers on different runs. Temperature is the setting that controls how much of that sampling randomness is allowed. Lowering it makes the output more consistent, but it doesn’t guarantee a reproducible result.

## Context, risk and judgement

- AI doesn’t know the product’s history, its architecture, or business priorities, so it can’t judge the associated risks holistically. The Ministry of Testing article advises against using it where a task is ambiguous, depends on the domain or on how the system behaves, such as risk assessment, business rules and test strategy. Its partner-system example, described earlier under Test data, shows what this cost is the suite passed because the mocks held only the rules the team already knew.

- The Toolshop quantity limit is a small version of the same thing. The user story says the quantity can go up to 999,999,999, but it caps at 99 in the app, and a model working only from the story wouldn’t see the difference. I found this by exploring the app more closely. Practical checks, domain and product knowledge, and conversations with the team are a good way of confirming the real behavior.

**Key Takeaways:** Use AI for drafts, repetitive work, and initial ideas, but check anything it states as a fact against the requirements or the system, or conversations with the team. Anything that needs a deterministic check shouldn’t be left to AI and needs to be reviewed critically, and checks that must give the same answer every time belong in scripts, generated by AI. Risk, business rules, requirement analysis, and what the product actually does stay with the tester.

# Responsible AI use: validating, not blindly accepting AI output

**Core idea:** AI output is a draft, and I am the one who signs it off, since “the AI wrote it” is no answer when something reaches a client unchecked. Validating it means checking it against the requirement, the documentation or the running system, and never against how convincing it reads. The same care applies to the data I give AI and to anything I let it do on its own.

## Validating AI output

- Fluent does not mean correct. The model writes with the same confidence whether it is right or wrong, so nothing in the text shows which parts to trust. In Part E, two invented messages sat among 42 cases that all looked right, and I found them only because each expected result was compared with the criteria.

- The check has to be against a source that didn’t come from the AI, such as the acceptance criteria, the user story, the Toolshop, and, once I run the cases, the application. Where no source exists, the point is an assumption and stays marked as one.

- The review also has to look for what is missing, not only what is wrong. A missing scenario leaves nothing on the page to question, so it is harder to catch than a wrong one. Comparing the 14 new edge cases with my own analysis questions was one way to test gaps.

## Other responsible use

- Client, user and production, and confidential project data stay out of AI tools, because tools may access data for training purposes, and on regulated projects such as health, that can break data protection rules. Where a prompt needs data, synthetic data or placeholders do the job. The prompts in this exercise used only public Toolshop material and a sample user.

- For any action AI takes, I usually have it approved by me first, or I limit what it can do, and I approve anything I can’t easily undo, because a wrong step is harder to spot or reverse once it has been carried out.

**Key Takeaways:** AI can draft and widen my thinking, but I answer for whatever I use from it. I check it against a real source, look for the gaps as well as the errors, and match the depth of the check to the risk. Client data and unattended actions stay under my control.

# Reflection: where AI helped most and where my judgement mattered

AI helped most where the work was repetitive and well defined. It wrote the steps, test data, expected results and postconditions for 42 test cases, and the test data was usable as drafted in 32 of them. It also proposed 14 edge cases that I hadn’t written, and six of those matched questions from my own analysis that it had never seen, so it widened what I was looking at. That fits the Ministry of Testing article, which sees AI’s value in extending existing patterns and producing repetitive data. I didn’t time the work, so I can’t put a figure on the time saved, but I believe the initial drafts of these artifacts generated from AI do help with tedious work of writing these from scratch and the formatting of course, although I do end up spending a long time reviewing and refining output.

Judgement mattered wherever the answer depended on a standard, the product, or the business. 7 of the 23 analysis questions weren’t worth asking, and it took someone who knew what a tester does with the answers to see that. The invented messages came to light only because I read the output against the Toolshop’s own criteria. The defect report was the clearest case: the model had to be told what a report contains and what it leaves out, such as preconditions, and it took about 10 rounds before the result was presentable, because it didn't have a context for what it should look like. The closing line of the Ministry of Testing article fits: AI helps us move faster, but without human understanding we are just automating blind spots.

The Day 1 lesson held. At that time the standard wasn’t in the prompt, and severity went into every test case unchallenged. This time the prompts named the technique and the format, and the faults that remained were mostly wording, standards, format, and test data. So, the split that works is to let AI draft initial ideas, drafts, patterns and debugging, and to keep with me the decision about what is correct, what the user may need, and what stays and what doesn’t. I check each expected result against the requirements, criteria, any designs, the system, or domain and product knowledge before I accept it.
