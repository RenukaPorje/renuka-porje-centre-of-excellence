# Summary and Key Takeaways

The 7 testing Principles:

1.  **Testing shows the presence, not the absence of defects**.

This re-establishes my understanding of the purpose of testing. Testing can show that defects are present in a test object, but it can’t prove the absence of defects. The core idea is to test to find defects and have them resolved, rather than trying to prove that there are no defects at all.

It reduces the probability of undiscovered defects remaining after testing is complete.

Key Takeaways: Even if you are unable to find any more defects, it still doesn’t prove the test object is 100% correct.

2.  **Exhaustive testing is impossible.**

In an ideal world, it would be reassuring to achieve 100% coverage, but practically it’s not always possible. Maybe for a new or small product or feature, but once it matures, the complexity, timelines and delivery schedules do not always allow for exhaustive testing.

Key Takeaways: Testing everything is neither feasible nor always advisable. So rather than attempting to test everything, use test techniques and approaches such as risk-based testing and test case prioritisation to focus on what brings the most value and is most critical to the client/user currently.

3.  **Early testing saves time and money.**

Many times, defects have a ripple effect. Unless you find the first one, you won’t realise there are cascaded defects associated. For eg.: End-to-End design didn’t account for the distinct data field mapping on both components, leading to a defect during integration testing. This incorrect value is then used further for calculations and sent downstream for processing. Find this late in the SDLC, and you have cascading defects spanning multiple components. What if some of the testing activities were initiated early – maybe attending requirement reviews or design discussions to understand the intended change? This would bring a tester’s perspective to the discussion, when appropriate, helping the team catch the issue early and giving enough time to address any design changes required.

Key Takeaways: To find defects early, testing should be started as early as possible. This also introduces the ‘Shift-Left Testing’ approach. I understand that this holds true for both static and dynamic testing.

4.  **Defects cluster together.**

This sheds light on how a small number of components or modules usually contain most of the defects. CTFL also mentions that this is an illustration of the Pareto principle.

Key Takeaways: Predicted defect clusters, and actual defect clusters from testing, can be really helpful for risk-based testing.

5.  **Tests wear out.**

If the same set of tests is run repeatedly, you may stop finding many defects after a certain time, as they become ineffective in identifying any remaining failures.

Key Takeaways: To overcome this, it’s important to update test cases, including the test data, to increase the probability of detecting new or remaining failures. That said, sometimes it’s helpful, and even a must, to run the same suite, for eg.: a regression suite for a mature product.

6.  **Testing is context dependent.**

There is no one universally accepted approach to testing. It depends on the context and could be done differently in each case.

7.  **Absence-of-defects fallacy.**

As the name suggests, it is a fallacy to expect that completed verification will ensure the success of your test object. Thoroughly testing all requirement specifications and fixing all identified defects can give you a functioning system, but is in no way conclusive that the object is 100% defect-free.

Key Takeaways: It could still be something that doesn’t fulfil the user’s needs or achieve the business goal laid out against it. Which is why it advises conducting validation in addition to verification.

## Test Design Techniques

1.  What is Equivalence Partitioning (EP)?

Equivalence Partitioning groups inputs into valid and invalid partitions — test one value per group, the core idea being that if one from a partition passes, all in that partition pass.

Eg.: Age field accepting 18–60: partitions are <18 (invalid), 18–60 (valid), >60 (invalid).

So, you test values 17, 30, 61 – one from each partition.

2.  Boundary Value Analysis (BVA)

Boundary Value Analysis tests values at the edges of input ranges — the idea is that defects cluster at boundaries, as implementation errors are most common here.

2 value BVA: Test two values at each boundary

Eg.: Same example – test 17, 18 for the lower boundary; and 60, 61 for the upper boundary

3 value BVA: Test 3 values at each boundary – the boundary itself, within, and beyond that boundary

Eg.: Same example – test 17, 18, 19 for the lower boundary; and 59, 60, 61 for the upper boundary

3.  What is Decision Table Testing?

Decision Table Testing maps every combination of conditions to their expected outcomes, essential when there’s complex business logic or rules with multiple conditions.

Example: for a loan eligibility rule based on credit score, income, and employment status, the decision table ensures every combination is covered and documented.

4.  What is State Transition Testing?

Most real-life systems operate in different states, triggered by events or inputs.

State Transition Testing validates system behaviour as it moves between these defined states, covering both valid transitions and the invalid ones that should be blocked.

Example: Order states: Pending → Processing → Shipped → Delivered → Returned.

Test valid transitions and invalid ones, such as Pending → Delivered directly.

## Scope & feature

[**https://practicesoftwaretesting.com/auth/register**](https://practicesoftwaretesting.com/auth/register)

[**https://practicesoftwaretesting.com/auth/login**](https://practicesoftwaretesting.com/auth/login)

Assumptions: Age limits for registration (unconfirmed)

There is no written requirement or acceptance criteria for the registration age limit. The limits used in these test cases are inferred from the error messages: "Customer must be 18 years old." and "Customer must be younger than 75 years old."

Impact: affected BVA test cases

Action: ideally a question to the Business Analyst and/or Product Owner to confirm the behaviour.

[**Test cases by AI – Excel**](AI-generated-test-cases.xlsx)

[**Test cases hand-designed**](Hand-designed-test-cases.xlsx)

## Comparison analysis

### What did I miss

- It took me considerably longer to write the detailed test cases myself as compared to Claude. The scenarios themselves were not difficult to derive, but the repetitive work – test data, repeated steps, formatting the Excel sheet – was tedious and time-consuming, which AI helps substantially with.

- Initially, I designed only 1 test case testing state transition from logged out Account lockout. I realised during further test analysis that to ensure comprehensive testing and to demonstrate my understanding of the State Transition technique, I must write test cases covering all states and transitions.

- Fields: I picked fields as per the technique being used, so missed fields like house number. Claude covered it and many other fields.

- Length limits on text fields: I focused BVA on password, email and age fields to demonstrate the techniques, and I wasn’t sure about the expected limits either. AI covered this across many other fields, targeting at least one valid partition and every distinct invalid partition.

- Partitions inside a field: I had one invalid case per rule. AI also covered some edge cases:
  - whitespace-only first name and superscript characters in first name

  - phone with "+" and spaces

  - email containing a space

  - a known breached password (P@ssw0rd)

  - invalid DOB dates – leap year considerations, 30<sup>th</sup> Feb

- Age boundaries: I treated 18 and 74 as valid. AI tested exact days around each limit (18y-1d, exactly 18, 18y+1d, 74y-1d, exactly 74, 74y+1d). This covers rare scenarios, like a person one day past 74 but not yet 75, which my scenarios miss.

- Expected results: Hand-designed tests say "Validation message shown". AI has the exact message for each case and where it appears (under the field, or at the top of the form for server errors). I wrote the cases without seeing the real messages or any mock-ups.

- State transition, beyond the diagram: I stopped at Login Success and Account Locked, and missed these edge scenarios:
  - admin unlock
  - the counter resetting after a successful login
  - the admin exemption from lockout

### What did AI miss

- It didn’t challenge the request and gave test cases with both priority and severity included.

Reason: ‘writing clear well-structured test cases (preconditions steps expected results priority severity)’ – this statement from the review steps was given as context. I should have clearly asked Claude to structure TCs based on ISTQB standards, and challenge anything amiss – like asking for severity on a test case.

- _AC: Account locking_

> _Given I have entered incorrect credentials 3 times consecutively_
>
> _When I try to log in again_
>
> _Then the error "Account locked, too many failed attempts. Please contact the administrator." is displayed_
>
> _And the API returns HTTP 423._

- Even after I provided the context and documentation, Claude initially suggested that the account lockout should be triggered after the 4<sup>th</sup> consecutive failed attempt, not 3<sup>rd</sup>.

- I was aiming to write test cases as per techniques to be used, to practice and demonstrate, but as per my prompt, Claude reasonably designed a comprehensive test suite covering every field and input, even employing EP technique across 30 test cases, across all fields in the form.

- Given the task, I only focused on writing test cases, and didn’t capture my test analysis, plan, or a well-designed set of test data. Claude, with my prompt, followed the entire ISTQB testing process: a test plan, a test analysis summary per technique, test data, even an open questions/risks/anomalies column in the table. Although my Day 1 focus was only test case design using three techniques, it was impressive how Claude’s sheet reflected all testing activities across the STLC phases.

- Confirmation email: AC mentions a confirmation email is sent after registration. AI only covers the redirect and that the new account can log in, not the email. I have included this.

- It used 2-value and 3-value BVA inconsistently, and I wasn’t able to see the reasoning.

AI generated a lot of test cases and other artefacts, so these are only some of the observations I was able to make so far.

Critically reviewing helped me find things like the severity column in test cases and the lockout stage scenario, assumed rules based on similar examples industry and some others so far.
