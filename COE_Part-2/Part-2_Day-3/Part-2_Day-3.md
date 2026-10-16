**Day 3: BDD, Gherkin and Acceptance Criteria in Depth**

**1. Behavior-Driven Development**

**Core idea:** BDD is a way of working that closes the gap between business and technical people. The team builds a shared understanding through concrete examples, and those examples become documentation that is checked against the system. It sits on top of your existing agile process rather than replacing it.

**Key points**

- Three practices, in order: **Discovery** (what it *could* do), **Formulation** (what it *should* do), **Automation** (what it *actually* does).

- Discovery is structured conversation around real examples. When new to BDD, one should start here, because the other two don’t pay off until you’ve got it Discovery part right.

- Formulation turns the examples into Gherkin, which both humans and computers can read. Writing it collaboratively gives the team a shared language, which is understood by every non-technical or technical person working on the product alike, and that domain language carries into the code.

- Automation connects each example to the system as a test. It fails first, then you build the behavior. The suite becomes a safety net and cuts manual regression, so people can spend time on other higher value activities such as exploratory testing.

- The tests and documents are a nice side-effect, but the primary goal is to work towards building a development process that is driven by the system's behavior to deliver a working software that does what user needs.

**2. Discovery workshop**

**Core idea:** A short, structured conversation where business and technical people agree as much as they can about a story’s behavior before development starts.

**Key points**

- Models include Example Mapping, OOPSI Mapping and Feature Mapping.

- Hold it as late as possible before dev starts, so details aren’t lost, and the team still has room to change plans.

- 3-6 people is the rule of thumb. The minimum is the Three Amigos: Product Owner (PO), developer, tester. This does not mean that it must strictly restrict 3 people only, but it merely suggests that the group should stay as small as possible.

- Advisable to spend about 25-30 minutes per story. If it runs longer, the story is too big or details are missing, so split it or park it for more research.

- Purpose is shared understanding, which catches missing details and wrong assumptions early.

**3. Example Mapping**

**Core idea:** A card-based method for making the pre-development conversation fast and productive. It’s the main tool for clarifying acceptance criteria (AC).

**Key points: the four card colors**

- **Yellow:** The story, at the top.

- **Blue:** Rules (the ACs), under the story.

- **Green:** Examples, under the rule they illustrate.

- **Red:** Questions or assumptions that can’t be answered in the session, so they are parked, and the team moves on.

- You keep going until scope is clear, or time runs out. Many red cards or an oversized map means the story isn’t ready or needs to be broken down into two more.

- Rules can also surface new stories, or things to slice off and defer.

**4. Examples**

**Core idea:** Good examples are concrete, not abstract, or vague

**Key points**

- Use names, places, exact dates, and amounts, and anything else relevant to the domain, or the rules.

- Leave out any technical or implementation details, this isn't the time determine how it be implemented, that comes later.

- The “imagine it’s 1922”, test: Come up with examples that make no assumptions about technology, as if no computers existed. Most software does something people could do manually.

**5. History of BDD**

**Core idea:** BDD grew out of problems with test-driven development (TDD) and with how teams described requirements. Given/When/Then and Cucumber came out of the same effort.

**Key points**

- Dan North pioneered BDD in the early 2000s, as a response to TDD, to help teams know how to approach testing, coding, and to reduce misunderstandings. Liz Keogh has written about it since 2004.

- Given/When/Then came from Dan North and Chris Matts, working from the ubiquitous language idea in Domain-Driven Design and a focus on business value. It also grew partly from the “As a / I want / So that” story template.

- Cucumber came from the RSpec Story Runner, which Aslak Hellesøy wanted to make better for the whole team, including non-developers.

**6. Myths about BDD**

**Core idea:** Four common misunderstandings of what BDD is.

**Key points**

- **You can’t pick the practices in any order.** Liz Keogh’s ordering: conversations matter more than capturing them, which matters more than automating them. Formulating without discovery is a waste of effort.

- **Automating after the code is written isn’t BDD.** It’s valid test automation, but not BDD.

- **Discovery needs a real conversation.** One person writing scenarios alone isn’t BDD.

- **Using Cucumber doesn’t mean you’re doing BDD.**

- **Only writing Given-When-Then ACs is not BDD.**

**7. Responsibilities**

**Core idea:** Who contributes to the Three Amigos, plus the basics of how a feature file is structured.

**Key points: the Three Amigos**

- **Product owner:** Scope. Decides what’s in or out of scope as edge cases come up.

- **Tester:** Creates scenarios and edge cases. How will it break, and what haven’t we covered?

- **Developer:** Adds steps and thinks about the implementation details and technical roadblocks.

- Each sees the product differently, so examples have to be discovered *together*. It’s not limited to three people only, or to one meeting at the start.

**Key points: who writes Gherkin**

- Early on, the whole team writes it while the language and style are being settled.

- Later, a dev (or automation engineer) and a tester can pair on it, and it's advisable that the PO or business rep actively reviews the output.

**Key points: feature file structure**

- The Feature header covers why (*In order to*), who (*As a*) and what (*I want*). The scenarios underneath give concrete examples of that behavior.

- If a feature has too many scenarios, it’s probably more than one feature and need to be split.

- A scenario should be describable in one plain sentence, and if that's difficult or complex to describe then it most probably is covering too much.

- Keep one thing per step, so split steps that join two actions or two conditions with “And”. A list inside one step, such as “name, quantity and price”, is fine. Use the same terminology across the file, and every time for the same action (pick “I am logged in” or “I have logged in”, not both).

**8. Writing better Gherkin**

**Core idea:** Describe behavior (*what*), not implementation (*how*). A declarative style keeps scenarios readable, less complex, easy to write and understand since it strips off the implementation details, and resilient which stops it from breaking every time the UI changes.

**Key points**

- Compare the behavioural version with a procedural version:

  - visit /login,

  - type in the username field, type in the password field, press the login button, see the welcome page.

> The first is a functional requirement. The second is a procedure, and procedures belong in step definitions not in examples or scenarios.

- Test for it: “Will this wording need to change if the implementation does?” If yes, it needs to be rewritten.

- **Imperative style** (typing into fields, pressing buttons) is tied to the current UI and costs more to maintain. It’s fine in some contexts, but it isn’t a default way of writing them.

- **Declarative style** states the idea, not the mechanics. The Cucumber page example uses named personas (Free Frieda, Paid Patty) with steps like “logs in with her valid credentials” and “sees a Free article”. Details like, which articles are free, live in the step definitions, so a business change doesn’t mean rewriting scenarios.

- Fewer implementation details also make the scenario easier to read and understand.

**Anti-patterns mentioned:** UI coupling, over-specification, brittle scenarios.

**9. Gherkin Reference**

**Core idea:** This is the syntax manual for Gherkin. It explains what each keyword does and how a feature file is structured.

**Structure and keywords**

- One Feature per file, and it must be the first primary keyword. The free text under it is ignored at runtime, but it’s where you can put a short explanation and the business rules (general acceptance criteria).

- **Rule** (since Gherkin 6) represents one business rule and groups the scenarios that illustrate it. This is the Example Mapping blue card and green card structure written directly into the file, so rule-based AC and scenario-based AC sit together.

- **Example** and Scenario are the same thing. An example is a concrete illustration of a rule, and also a test. The Cucumber page recommends 3-5 steps, because more than that and it loses its value as documentation.

- Steps follow one pattern: initial context (Given), event (When), expected outcome (Then). And, But and \* are readability aliases.

- **Background** holds Given steps repeated across every scenario in a feature or rule. Those steps are incidental, not essential. You can only have one, per feature or rule.

- **Scenario Outline** plus **Examples** table runs the same scenario with different values. It runs once per row, which is useful for validations and edge cases.

- **Doc Strings** (""") pass large text blocks to a step, and **Data Tables** (\|) pass lists of values. Tags (@) group features, and \# is for comments.

- Gherkin is localized into 70+ languages. The point is to write in whatever language your domain experts actually speak, to avoid translating between two.

**What each step type is for:**

- **Given** puts the system in a known state. These are basically the preconditions for the scenarios. Any user interactions are to be kept out of it.

- **When** is the action or the event, from a person or another system.

- **Then** is an expected outcome on something observable, like a UI message, a report or a notification. It shouldn’t check something buried inside the system, like a database record. Even if it makes more sense to be precise to the technical people, the page says to resist that temptation.

- Cucumber ignores the keyword when matching steps, so “Given there is money in my account” and “Then there is money in my account” count as duplicates. The page frames that as a feature, because it pushes you to write less ambiguous domain language, such as “balance of £430” vs “balance should be £430”.

**Anti-patterns the page flags or implies:**

- UI or technology details in scenarios. It reuses the “imagine it’s 1922” test.

- Too many steps in one example.

- Asserting on database state in a Then.

- Copy-pasting near-identical scenarios instead of using a Scenario Outline.

**Other points to note:**

- A colon goes after some keywords and not others, and adding one where it doesn’t belong makes your test get ignored.

- Block comments aren’t supported, and comments must start on a new line.

- Two-space indentation is the recommendation.

**10. Product School: Acceptance Criteria**

**Core idea:** Acceptance criteria are the conditions a feature must meet before it counts as done. The article treats them as a communication tool between PM, the devs and testers, and is aimed at cutting misunderstanding and rework. It’s a PM-oriented, but it’s a precise and beginner-friendly overview: best practices, two formats, and a lot of examples.

**Key points:**

- Write AC early, ideally in planning, and keep revising them through the cycle. They matter most for complex work or work that spans multiple teams.

- Four best practices:

  - Start with the user’s needs.

  - Be specific and measurable (“page loads within 2 seconds”, not “the system should be fast”).

  - Cover edge cases as well as the expected path.

  - Keep the wording simple.

- Two formats:

  - **Checklist:** short, flat conditions. Good for simple requirements and for tracking progress.

  - **Scenario-oriented (Given/When/Then):** These describe behavior in context. Better when behavior varies by situation.

- Method for stories: Identify the user and write the story in “As a / I want / so that” format, then define ACs that are clear, complete, measurable and testable, ideally in Given/When/Then.

- In Agile/Scrum, ACs help in sprint planning,

  - For estimation,

  - Feed the Definition of Done, where a story isn’t done until every criterion is met,

  - guide the work during the sprint,

  - and what the work is measured against at sprint review.

  - They also have to be testable so they can become automated tests in CI.

- The examples (Airbnb Instant Book, Slack DMs, Trello due dates, a Wishlist) all follow the same pattern: one story, several scenarios covering create, view, edit, remove, notify.

**Anti-patterns**

Compared with the Cucumber pages, a lot of its own examples are the kind that would need rewriting:

- **UI-coupled steps:** “clicks the ‘Forgot Password’ link”, “clicks the ‘Reserve’ button”, “clicks on the ‘Due Date’ button”. This is the imperative style that Cucumber says is brittle.

- **Vague or untestable wording:** “the system should display a notification”, “the due date is approaching” (how close, exactly?), “a list of available properties that match the search criteria”.

- **Abstract, not concrete:** no named people, amounts or dates, which goes against the Cucumber’s advice to use concrete examples.

- **Too many outcomes per scenario:** the Airbnb booking scenario checks payment, email and calendar update all at once, so it covers more than one outcome. Not a hard no, but other articles advise against it.

- **Edge cases are advised but barely shown**: most every example is a happy path. There’s no declined card, no invalid date, no failed login beyond one case.

**Example from the article**

- Article version:

> “Given the user is on the login page
>
> When the user clicks on the ‘Forgot Password’ link
>
> Then the system should prompt the user to enter their email address”.

- A declarative rewrite would be closer to:

> “Given the user has forgotten their password
>
> When the user asks to reset it
>
> Then the user is asked to confirm their email address”.

**11. Sify / Kaiburr: Using Acceptance Criteria to Deliver High-Quality Features**

**Core idea:** Acceptance criteria are the “definition of done” for a story. They act as guide rails to the work and act as the main communication point between whoever owns the need and whoever builds it.

**Key points**

- ACs say *what* must be met, not *how* to build it. That gives the developers a clear idea of what to build, and testers a clear idea of what to test.

- What good AC cover:

  - Existing features the story relies on.

  - Changes to existing user behaviors.

  - Checks the user’s actions must pass.

  - Negative scenarios and proper error handling, exception handling.

  - The outcome of the user’s action.

  - Performance or speed targets where relevant.

  - What’s out of scope.

- Who writes them: These are usually by consensus. The PM defines behavior and performance as the user perceives it, and devs and ops can add metrics for performance, tracking, and internal use.

- Five checks for effective AC:

  - Anyone can understand them.

  - They say what, not how.

  - They’re from a user’s perspective.

  - They’re specific, clear, concise, and testable.

  - They stay within the story’s scope.

**The formats the article describes**

- **Scenario-based:** Describes the user's journey and experience through the scenarios a user will encounter, and how these experiences are handled, and how the user can navigate it.

- **Rule-based:** a list of conditions that must be met.

- **Hybrid (rules plus scenarios):** the most common for complex features. No format is better than another. The best one answers every question a reader of the story might have.

In Cucumber, a Rule is a business rule that scenarios illustrate, whereas the article uses rule-based for a flat checklist and scenario-based for a user's journey.

**What goes wrong without clear AC**

- The requirement is technically met but not the way the PO intended.

- Tests pass but the feature doesn’t meet the user’s needs.

- Rework, including fixes to older features that were impacted by the change.

- Poor performance because no target was set.

- Ambiguous or undefined error handling.

- Extra features nobody asked for (scope creep) and wasted time and money.

**12. Three Amigos**

**Core idea:** The Three Amigos is about making sure three perspectives are in the room when a piece of work is examined: business, development and testing. The aim is to get a clear shared understanding of what to build and how you’ll know it’s right, in a group as small as possible, and ideally expressed as examples.

**Key points**

- The three perspectives, each with its own question:

  - **Business:** What problem are we trying to solve?

  - **Development:** How might we build a solution?

  - **Testing:** What about this, and what could happen?

- They collaborate to define what to do and agree on how they’ll know it’s done correctly. The output is a clearer description of the work, often as examples.

- It applies before, during and after development. Reviewing what’s been built from all three angles is part of the practice, not just the kick-off.

- It’s a balance between two extremes: no collaboration between roles, and dragging the whole team into every detail of every story.

- Also known as Story Kick-Off huddles or the Triad.

- Benefits are developing a shared understanding of intent, misunderstandings caught early, so the team learns sooner and is aligned on the expected, and a sensible cap on how many people discuss each piece of work.

**Pitfalls**

- Treating it as strictly three people. If another stakeholder is relevant to the story, include them.

- Expanding it to the whole team. The point is to include each needed perspective in the smallest group possible.

- Turning it into a regular scheduled meeting or another agile ceremony. It should be a guide to which perspectives belong in each conversation, not another meeting on the calendar.

**13. ATDD course: From Stories to Executable Specifications**

**Core idea:** Acceptance tests are executable specifications. They say what the system must do, in the language of the problem, and they’re written before the code. They don’t break every time the system changes, because the technical detail sits in separate layers underneath.

**Stories, examples and specifications**

- An acceptance test describes behaviour from the outside, from the point of view of someone using the system. It works as an automated definition of done.

- Anyone can write acceptance tests (QA, BA, PO, developer). Whoever writes the spec invents the DSL language it needs.

**Effective tests**

- An acceptance test is written before the code, and every acceptance criterion gets its own test. TDD is then used to write the code that makes these acceptance tests pass.

- A good acceptance test says what the system does, not how. It uses steps like placeAnOrder or payByCreditCard, not “click this button”. It’s isolated, repeatable and atomic, shares no writable test data.

- Two checks: would the least technical domain expert or stakeholder in the group understand the test, and would it still hold if the system were replaced by something completely different (but with the same goal), like a robot shopping in a physical bookstore? That’s the “imagine it’s 1922” test from section 4.

**Test infrastructure**

- **DSL:** Domain Specific Language is a shared vocabulary that all test cases use. It keeps specs separate from implementation detail, makes complex scenarios easier to write, and reuse keeps the tests stable and easy to maintain. There are two kinds: external (a language of its own, like Gherkin) and internal (built on a normal programming language and its tools).

- **Isolation:** There are three levels:

  - Isolation of the system under test: based on the boundaries that define the system, decide what’s inside it and mock everything that's outside, including third-party systems.

  - Functional isolation: Each test creates its own data, like a new user and a new book in a shop.

  - Temporal isolation: The test infrastructure aliases names, the same test can run again for the same SUT and under same conditions.

- **Protocol drivers:** The same DSL call can go through different drivers (web, mobile), so one test can run through every channel. When the UI changes, only the driver changes. Assertions sit here, and each step either passes or fails, with errors worded in the language of the domain.

- **Stubs:** Stub is an adapter, not a simulation. It basically mocks the responses of the external systems, as it holds preprogrammed responses keyed on a unique value, so it stays simple.

- **Ownership:** Farley argues that developers should own the protocol drivers and keep the suite working, because they’re the ones who break it. They build the drivers alongside the feature, not after, or the spec stops working as a specification. He also considers a separate QA team owning the suite an anti-pattern.

- **Time:** Time is hard to control in a test. The options are to ignore time-based values or to control the clock, so a test can move time forward instead of waiting. Test cases stay synchronous and the DSL waits for a concluding event with a timeout. Fixed waits are an anti-pattern.

- **The four layer model:**

  - Test cases are the executable specifications, in domain language.

  - The DSL holds common set-up (like creating an account) and gives test data sensible defaults that a test can override when it needs precision.

  - Protocol drivers translate the DSL into the system’s interfaces.

  - The system under test is deployed like production, with stubs standing in for external systems.

  - Most tests are about three lines: a Given that sets up what’s needed, a When, and one expected outcome. A long, complicated test case is a warning sign.

- **Intermittent tests:** A test is most useful when it fails. Intermittency does so much damage because once a failure can’t be trusted, the suite stops being reliable. The causes are changes in the environment, changes in test data, mismatched versions of the test and the system, and variation in the system’s own behaviour. The fixes include keeping environments identical on every run, no shared writable data between tests, and keeping the tests in the same repository as the code they test.

- **Cucumber and SpecFlow:** The feature files make the test case layer. Step definitions act simply like translators, and they pull the parameters out of the step text and call the DSL, with no logic. He also mentions that writing code that interacts with the system directly in step definitions is a common anti-pattern, because every new spec then needs new detailed steps and nothing gets reused. Farley prefers an internal DSL, not because Gherkin is inherently bad, but it's mostly not implemented well. The biggest advantage of Gherkin is readability and structure.

**Test strategy and adoption**

- **Scope:** The behaviour of a releasable unit of software as perceived by the user. If the acceptance test passes, you should be comfortable releasing. Avoid end-to-end tests for systems you’re not responsible for, because they’re slow, fragile and hard to control.

- **Story size:** A week or two at most, ideally less than a week. If an example list gets too long, the story is probably too big and needs to be split.

- **Strategy:** The acceptance stage sits in the deployment pipeline after the commit stage. Define the minimum test data instead of copying production and leave out systems you don’t control.

**How it connects to the rest**

- BDD Gherkin is the test case layer. Clicks, fields and pages belong underneath it, in the DSL and drivers, with step definitions as a thin translation layer. This is the declarative rule from above articles.

- Each scenario sets up its own data, so the checkout scenarios, for instance, can run in any order.

- The Cucumber material is mostly about the conversation and discovery. Farley’s course covers that too with event storming, story mapping, specification by example, then also adds and emphasizes on what keeps the automation stable: the DSL, isolation and the layers. Both put the specification before the code.

**14. Exercise: Gherkin scenarios for an e-commerce checkout**

```gherkin
Feature: Checkout Flow - Cart review
  User story: As a shopper, I want to be able to access the cart
    so that I can review that the cart details are correct.

  Scenario: Display cart contents
    Given the shopper’s cart holds 2 of an item priced at $10.00
    When the shopper views the cart
    Then the cart should show the item’s name, quantity, unit price and line total
    And the cart total should be $20.00

  Scenario: Empty cart
    Given the shopper does not have any items in the cart
    When the shopper views the cart
    Then the shopper should be told that the cart is empty
    And checkout should be unavailable

  Scenario: Updating quantity
    Given the shopper’s cart holds 2 of an item priced at $10.00
    When the shopper changes the quantity from 2 to 3
    Then the item total and cart total should be updated to $30.00
    And the shopper should see a confirmation that the quantity was updated

  Scenario: Delete item
    Given the shopper’s cart holds a $10.00 item and a $15.00 item
    When the shopper deletes the $15.00 item
    Then the cart should hold only the $10.00 item
    And the cart total should be $10.00
    And the shopper should see a confirmation that the item was removed
  Rule: Quantity must be between 1 and 99

    Scenario Outline: Quantity below 1 resets to 1
      Given the shopper’s cart holds 4 of an item priced at $10.00
      When the shopper changes the quantity from 4 to <entered quantity>
      Then the quantity should reset to 1
      And the item total and cart total should be $10.00
      And the shopper should see a confirmation that the quantity was updated

      Examples:
        | entered quantity |
        | -1 |
        | 0 |

    Scenario Outline: Quantity above 99 resets to 99
      Given the shopper’s cart holds 2 of an item priced at $10.00
      When the shopper changes the quantity from 2 to <entered quantity>
      Then the quantity should reset to 99
      And the item total and cart total should be $990.00
      And the shopper should be warned that the maximum quantity is 99

      Examples:
        | entered quantity |
        | 100 |
        | 101 |
        | 9999 |
Feature: Checkout Flow - Sign in
  User story: As a shopper who is not signed in, I want to sign in or continue as a guest during the
    checkout flow, so that I can place the order without leaving the checkout.

  Scenario: Already signed in
    Given the shopper is signed in as Jonathan Smith
    And the shopper has items in the cart
    When the shopper proceeds to checkout
    Then the shopper should see that they are already signed in as Jonathan Smith
    And the shopper should have an option to proceed to the Billing Address step
  Rule: A shopper who is not signed in can sign in or continue as a guest

    Background:
      Given the shopper is not signed in
      And the shopper has items in the cart

    Scenario: Sign in options are offered
      When the shopper proceeds to checkout
      Then the shopper should be offered the options to sign in or continue as a guest

    Scenario: Shopper continues as guest
      When the shopper continues as a guest with an email address and a name
      Then the shopper should see that they are continuing as a guest
      And the shopper should have an option to proceed to the Billing Address step

    Scenario: Sign in with valid credentials
      When the shopper signs in with the valid credentials of Jonathan Smith
      Then the shopper should see that they are signed in as Jonathan Smith
      And the shopper should have an option to proceed to the Billing Address step

    Scenario: Sign in with invalid credentials
      When the shopper signs in with an incorrect password for Jonathan Smith
      Then the shopper should be told that the email or password is invalid
      And the shopper should remain on the Sign in step

    Scenario: Sign in with valid TOTP
      Given Jonathan Smith has TOTP enabled
      When the shopper signs in as Jonathan Smith with a valid TOTP code
      Then the shopper should see that they are signed in as Jonathan Smith
      And the shopper should have an option to proceed to the Billing Address step

    Scenario: Sign in with invalid TOTP
      Given Jonathan Smith has TOTP enabled
      When the shopper signs in as Jonathan Smith with an invalid TOTP code
      Then the shopper should be told that the TOTP code is invalid
      And the shopper should remain on the Sign in step
```

**15. Exercise: Rewriting poorly written Acceptance criteria**

**Story 1: Billing address**

*As a user, I want to be able to enter my billing address, auto-populating if already logged in, so that my invoice includes correct address details.*

**AC1**

> *Given the user is on the checkout page*
>
> *When they click on the Billing Address tab and enter their address in the form fields and press the Proceed button*
>
> *Then the address is saved in the database, and the user is taken to the next page*

**AC1 Rewrite**

```gherkin
    Given the shopper is on the Billing Address step
    When the shopper provides a valid billing address
    And the shopper proceeds
    Then the shopper should be taken to the Payment step
```

**AC2**

> *Given the user is logged in*
>
> *Then their details are pre-populated*

**AC2 Rewrite**

```gherkin
    Given the shopper is signed in
    And the shopper has an address saved in their profile
    When the shopper reaches the Billing Address step
    Then the shopper should see the saved address pre-populated
```

**AC3**

> *Given the user enters an invalid address*
>
> *Then an appropriate error message is shown*

**AC3 Rewrite**

```gherkin
    Given the shopper is on the Billing Address step
    When the shopper enters a Postal code that is invalid for the selected Country
    Then the shopper should be told that the Postal code is invalid
```

**AC4**

> *The address fields should be validated properly and not accept values that are too long*

**AC4 Rewrite**

```gherkin
  Scenario Outline: A value longer than its maximum is not accepted
    Given the shopper is on the Billing Address step
    When the shopper enters more than <maximum> characters in <field>
    Then the shopper should not have an option to proceed to the Payment step

    Examples:
      | field | maximum |
      | Street | 70 |
      | City | 40 |
      | State | 40 |
      | Postal code | 10 |
```

Question parked: Confirm the minimum limits with the Product Owner or Business Analyst.

**AC5**

> *Given the user leaves a mandatory field blank*
>
> *When they try to proceed*
>
> *Then the field turns red, the Proceed button is greyed out, the error “Please fill in all fields” is displayed at the top of the page and the cursor moves to the first empty field*

**AC5 Rewrite**

```gherkin
    Given the shopper is on the Billing Address step
    When the shopper leaves a mandatory field blank
    Then the shopper should not have an option to proceed to the Payment step
    And the shopper should be asked to enter mandatory values
```

Question parked: Confirm with the product owner whether an error message is also required.

Currently considered only button being disabled.

**AC6**

> *The billing address page should load quickly and be easy to use on all devices*

**AC6a Rewrite**

```gherkin
  Scenario: The Billing Address step loads within the maximum duration
    Given the shopper has completed the Sign in step
    When the shopper proceeds to the Billing Address step
    Then the Billing Address step should be displayed within 5 ms
```

**AC6b Rewrite**

```gherkin
  Scenario Outline: The Billing Address step is usable on a supported device
    Given the shopper opens the Billing Address step on a screen <screen width> px wide
    When the shopper fills in the form
    Then every field should be visible and fillable without horizontal scrolling

    Examples:
      | screen width |
      | 360 |
      | 768 |
      | 1280 |
```

The above example is with placeholder width values.

Question parked: Confirm the measurable conditions for performance, usability and device and browser compatibility.

**AC7**

> *Given a guest or registered user has a valid address*
>
> *Then the invoice should show the correct address*

**AC7 Rewrite**

```gherkin
  Scenario Outline: The invoice shows the billing address entered
    Given the shopper is checking out as <shopper type>
    And the shopper has entered a valid billing address
    When the shopper places the order
    Then the invoice for this order should show the billing address entered

    Examples:
      | shopper type |
      | a signed-in shopper |
      | a guest |
```

**17. Reflection on BA background**

My MSc in Business Analytics is why I treat acceptance criteria as more than a checklist. The coursework drilled in one habit: map the user’s need before anything gets written down. I learned about requirement sessions, workshops and interviews, using open-ended questions to find the real pain point and what would solve it in a way that supports the long-term business goals. Requirement gathering isn’t only about what the customer wants the product to do. It’s about why they want it, what exactly they need, and how it could best be delivered, treating it as a problem to solve.

That shapes how I view acceptance criteria, and my QA experience adds to the perspective from the other end of this. I know what a tester needs to derive and measure the expected outcome, and to design a test suite that covers every condition that the criteria state. A rule like “quantity must be between 1 and 99” gives a tester equivalence partitions and boundaries to test straight away, whereas “the system should handle large quantities” and “the page should load fast enough” gives nothing to check it against.

So, criteria must be clear, complete, unambiguous, and measurable. It should have concrete details and be testable. Written that way, they give business stakeholders, the delivery team, and testers the same picture of what the product should do. Keeping them free of UI or implementation and procedural detail makes them easier for business readers to follow, and easier to spot gaps in without getting into design, which mostly makes it complex and difficult for every stakeholder to note and spot any inconsistencies. The goal should be to build a shared understanding and language that everybody working on the product understands, and so this can be built into code too. This is in line with the ATDD’s course which talks about spending time and effort to set up a ubiquitous language for the product to ensure the entire team communicates, understands and works with the same domain specific terminology. This makes it easy and allows all stakeholders to come up with questions alike, without alienating one group with technical details, or individual terminologies making way into implementation.

BDD and Cucumber add structure to this understanding. Discovery before development, in a Three Amigos session with the product owner, developer and tester each bringing their own questions, is the same instinct as requirements elicitation, but it ends in concrete examples instead of a list of statements or a checklist. In Example Mapping, the rules are the criteria, the examples become scenarios, and questions nobody can answer in the room are parked and followed up, not guessed or assumed by anyone. The same goes for wording: a BA keeps one term for one thing, and Gherkin asks for the same, one phrase for each action.

While rewriting the billing address criteria, I kept the scope of this story. The minimum field lengths were a gap noted as to be confirmed with the product owner and the business analyst, because the story and the reference criteria only give maximums. I marked the screen widths and load time in AC6 the same way. Treating a gap as a question, not quietly filling it in, is what the red cards in Example Mapping are for.

The other takeaway is how anti-patterns look in the acceptance criteria of real projects: UI coupling, implementation detail, several outcomes unrelated in one criterion, and vague wording like “invalid address” or “appropriate error”. This was interesting since this is more common than we’d like, and many of these anti-patterns subtly make their way into ACs and end up defeating the purpose of BDD, therefore of Acceptance Test Driven Development. The tester can’t derive a test from those, and a developer can’t tell what to build. The result is reworking for the BA, revising the story and criteria, and reworking for the implementing team as well.

My masters in BA together with my QA experience give me a holistic or an end-to-end perspective on acceptance criteria, giving me a rationale to promote stories that align with INVEST mnemonic and acceptance criteria that are complete, concrete and testable. And since the benefit or side effects stretch beyond one specific activity or stage, it flows into the code too. It cuts rework and misalignment over the life of a project. With Cucumber, the automated scenarios also guide developers when they refactor or reimplement, because they show what behavior is expected from the outside and what must not change.
