**What I learned, in short**

The primary takeaway from this would be that Incubyte treats _how_ software is built just as seriously as _what_ gets built. The culture is not just a set of values or guiding principles. It shows up in practices: TDD, tests first, small steps, MVP mindset, insistence on collaboration and communication, and every individual owning their part in the outcome of the release. That also showed me that TDD and SOLID are not separate technical concepts. They are how that culture is practiced day to day.

**Culture and craftsmanship**

**Here is my understanding and takeaway from each of the core values**

- **Relentless Pursuit of Quality with Pragmatism:** Quality is subjective, and there is no single agreed definition of it, which also makes it hard to measure. It’s something you ensure in every step of the process, and keep working on continuously. The way to approach it is to keep checking how well the work meets the client's current needs and expectations. That is where pragmatism comes in, you keep the standards high and keep pushing, but you stay practical and act, so effort goes where it matters, and you don’t give up long-term success for quick short-term wins.

- **Extreme ownership:** Each individual owns their decisions, successes or failures. They analyse their decisions, approaches, check what worked and what didn’t. They register the successes and share it with the team. When it comes to failures, admitting and owning up to what went wrong, and really working to find the _why_ of it to make sure it doesn’t happen again. The entire team owns the outcome through to release, so there is no "someone else will catch it." Or “it isn’t my responsibility, let somebody else figure it out”. It also means being proactive and taking initiative, picking up work without waiting to be assigned and following up without being prompted.

- **Proactive collaboration:** Raise things early instead of waiting until they become problems. It’s important that you communicate, sometimes even overcommunicate, about the updates, progresses, blockers, anything, that may or could impact the client and overall release. This is so you don’t take the client or your team by surprise. The team that is well aware of the latest internally, is better positioned to handle anything concerning that may arise. So, treat internal and external stakeholders with utmost importance and always communicate and collaborate, making sure there's an alignment. Since we work remotely, it’s a team sport at Incubyte, so no working in silos, and making sure everyone gets heard.

- **Active pursuit of mastery:** In an industry such as ours, where things keep changing regularly and rapidly, it's important that you set aside some time daily, or even weekly to keep learning whatever is new to help you better perform, or potentially contribute in your role. It’s an ongoing journey. There shouldn’t, and there can never be a point where you will have learnt everything that you possibly could. So, it’s an individual responsibility to find opportunities to learn, continue to do so consistently, and share it where appropriate through any means possible.

- **Give, Invite, and Act on Feedback**: While it can be uncomfortable for most to give feedback without worrying if you are actually offending, there are approaches to help you do that – like R.E.A.C.H and Radical Candor. Feedback should be given on time, honestly and respectfully, and should be about the behaviour, not directed to the person. And while you do that, it’s equally important to often invite feedback as well, this helps you understand the impact of your work, and areas where you can improve. While that is great, it’s important to actually implement and act on these observations rather than just make a note of it**.**

- **Create Ecstatic Customers:** Everything is about helping the client succeed, so it means being a trusted partner. That means offering solutions rather than just taking orders, understanding the client’s business, checking in regularly for feedback, and being transparent about problems and escalating them at the earliest sign instead of waiting for them to become critical. And, treating internal stakeholders with the same importance and attention as the external clients.

**Three Laws of TDD:**

The laws:

- no production code unless it makes a failing test pass
- no more of a test than is enough to fail, compiling failure is also a failure
- no more production code than is enough to pass that one test.

What I learned is that these laws are not about writing more tests. They are about the order in which this process happens. Because the failing test comes first, "done" is defined before the production code is built. So, when a test passes, it means something, that the behaviour it was trying to test, but was failing, now actually works, and the solution is derived incrementally, one problem at a time.

Each law also blocks any shortcut: if it doesn’t have a failing test, the code doesn’t have a reason to exist, and the same goes for oversized tests and over-building. The laws work in a cycle that is _Red, Green, Refactor_: write a failing test, make it pass, then refactor with the passing tests. Refactoring is a continuous, integrated process step, rather than a later phase or an afterthought.

**SOLID:**

What I learned is that all five principles aim at the same thing: code that is easier to maintain, understand, and extend.

- **Single Responsibility:** A class should do one thing only. If it has more than one reason to change, it’s doing too much, so you need to split it as per what work it does. For example, a class that calculates an invoice and also emails it should be two classes.

- **Open/Closed:** Extend functionality by adding new code instead of editing code that already works.

- **Liskov Substitution:** A child class should work anywhere its parent is used. If a child has to override most of what the parent does, inheritance is probably the wrong choice.

- **Interface Segregation:** A client should not depend on methods it does not use, so replace fat interfaces with small, specific ones.

- **Dependency Inversion:** depend on abstractions instead of concrete details, this lets tests swap real dependencies for test doubles (stubs, fakes, mocks), so unit tests stay isolated, fast, and repeatable, and a failure points to the unit under test.

So, TDD means quality is there from the start, in small steps, and SOLID means the code stays easy to change later on, which ties back to the long-term quality Incubyte talks about.

**Reflection: connecting my background**

**QA:**

Quality with pragmatism: Sometimes 100% coverage isn’t practical, or there isn’t enough time to run the full regression suite. I looked at which modules carry the most risk and tested those first, because if they fail, users feel it the most and the impact on business value is heavier. It changed the way I approach QA, to be more realistic and focus on the value the client actually gets, rather than chasing a perfect number.

In my last project, I was responsible for testing a new scheme with ever-evolving requirements, a complex set of business rules, logic, and key integration changes compared to the legacy schemes.

Testing everything was not practical when the scheme was due to launch in a few months, and it was a high-impact, critical public sector project that could affect the social welfare system used nationwide. So, I used the core idea behind risk-based testing and prioritisation, along with test design techniques like boundary value analysis (BVA) and equivalence partitioning (EP), that help with coverage without overwhelming the test suite. I prioritised the core modules: Entitlements, Payments and Integration, testing the key integrations, API endpoints and data flow. I also considered defect trends and focused my testing in these areas. Lower priority features such as Customer details and Claim Summary were covered once these core areas were assured, and also tested as part of the regression suite, as these features were read only and didn’t interact directly with other modules or systems.

Create ecstatic customers: I don’t only focus on functional requirements. Over the years I have made it a point to look beyond them, at things like the actual impact or value a feature brings to the clients, and the overall user experience. I consistently collaborate with stakeholders, at every chance I get, to understand their feedback and what the user experience is like for them. I also suggest improvements with this in mind, and I gather feedback during UAT.

Extreme Ownership & Proactive collaboration: I owned the outcome of the features I worked on. I clarified things early and worked with the cross-functional teams to validate assumptions, so we moved as a team and quality was part of every step, not just checked after development. I also followed up on issues, tasks and action items proactively, so clients didn’t face delays or surprises. Early involvement during requirement reviews and ongoing collaboration with developers, BAs and POs helped catch issues early.

Active Pursuit of Mastery and Feedback: I keep looking for ways to improve the QA processes and techniques we follow. Every so often I ask tech leads, peers and senior developers for feedback, on the outcomes and on QA standards, for myself and for the team.

**Business analytics:**

My master’s in business analytics taught me to think beyond testing. This is how I connect what I learned here to the values:

- Quality with pragmatism: It made me ask what value a feature or piece of work actually brings. It also covered the concept of MVP, and prioritising requirements with methods like MoSCoW.

- Create ecstatic customers: Being customer-centric, asking open-ended questions during requirement gathering. This helps in understanding and mapping customer journeys and pain points first, before working on the solutions.

- Give, invite, and act on feedback: Doing user research and gathering feedback constantly.

- Extreme ownership: Spotting business process improvements and proposing them as and when the opportunity arises.

- Proactive collaboration: Acting as the bridge between what users expect and how it gets built technically.

- Create ecstatic customers: Building a thorough understanding of the product and its domain, so I understand the what, why and how of it.
