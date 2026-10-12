**Accessibility Testing**

**Web accessibility and why it matters**

Web accessibility is about removing the barriers that make using a website or app difficult for some people. These users are people who have disabilities affecting visual (total blindness, low vision, colour-blindness), auditory (complete or partial hearing loss). It also covers people with cognitive or motor difficulties, and temporary or situational limitations like a broken wrist or an arm or a phone screen in bright sunlight.

Why it matters:

- **Ethical:** In current times especially, the web is how people bank, shop, work and use government services. If a site doesn't work for someone, they are left with a bad user experience and locked out of any such services. Most accessibility fixes also make the product easier for everyone (e.g.: captions, good contrast, keyboard navigation and shortcuts).

- **Legal:** Also, it is now included to be a requirement by law in many places. For e.g.: the European Accessibility Act has applied since June 2025 to many consumer services like e-commerce and banking, Section 508 covers US federal agencies, and website accessibility lawsuits under the ADA are common in the US.

Businesses or many clients now ask for it up front. A WCAG level written into the contract and checking if it conforms to accessibility standards is common now, so it is treated as a standard requirement.

The web has never been fully accessible, and it still isn't standard practice everywhere, mainly because teams see it as slow and expensive. A lot of that cost comes from leaving it to the end. Fixing contrast, labels and keyboard behaviour after release is usually a lot more work than getting them right during design and development. Testers need to be involved early for this reason.

There are certain defined guidelines for web accessibility to be considered while designing and coding the site. These guidelines are WCAG.

**WCAG principles**

**Perceivable**: Information and UI components must be presented in a way users can easily perceive. For e.g.: Text alternatives for non-text content (Images, etc.), captions and audio descriptions for media, good colour contrast

**Operable**: UI components, action controls and navigation must be usable. All functionality must also be available from the keyboard. For e.g.: no content that flashes in a way that can trigger seizures, clear page titles and visible focus indicators

**Understandable**: Content and the UI must be readable and behave in a predictable manner. For e.g.: Page language, navigation and labels are consistent across pages, errors telling exactly what went wrong and suggest ways to fix it

**Robust:** Content should work with current and future browsers and any assistive technologies. Elements have a name, role and value so a screen reader can announce them correctly.

**Common accessibility issues:**

Most defects logged in accessibility testing may be along these lines:

- Low colour contrast: Text is hard to read against the background.

- Missing alt text for images: Meaningful images should have appropriate text. Decorative images should have an empty alt text so it can be skipped by screen readers.

- Keyboard operability: Some components or controls are not reachable using keyboard. Not all functionality is operable using only a keyboard. Like having to resort to a mouse because tabbing skips a field or traps there, getting stuck somewhere and can't get out without using a mouse.

- Focus order/logical flow issues: The focus indicator jumps around the page and doesn’t follow a flow in a page.

- Focus indicator issues: You cannot tell where it is when you are tabbing. Multiple Styles of focus or a very faint or light contrast indicator through the page.

- Unlabelled form fields: A field has only placeholder text as its label, or the label isn't connected to the field, so a screen reader doesn't say what to enter.

- Empty or vague links or buttons: Buttons with no name, or links that just say “click here” and take you to wrong or unexpected pages.

- Page basic details: No page title, or the page language isn't set.

- No reflow at zoom: When zoomed in to 400%, and the page gives sideways scrolling, or content gets cut off. This should instead give a downwards scrolling allowing you to access every label or component, in a flow that’s not broken and no content being cut off.

- Errors not announced: A form error shows up on screen but a screen reader says nothing about it.

## ARIA

ARIA is a set of extra attributes (like role, aria-label and aria-expanded) that tell assistive technology more about an element. It only changes what gets announced. It doesn’t actually add any behaviour to the element.

# Manual accessibility testing

Automated testing does reduce work, but it only catches part of the accessibility issues. The number people quote varies, from around 20-30% to 57% in Deque's own study. Manual accessibility testing catches what automation can't. For e.g.: a tool can tell that an image has alt text, but not whether the alt text actually makes sense for the particular image.

Test planning:

- Cover all the different components (menus, forms, pop-ups, tables).

- Most viewed or primary content, and the main flows like login or checkout.

- Note down the browser and screen reader used, because results can differ.

Performing an automated scan first to clear the easy checks, and then manually check the keyboard, then reflows, the tab flows and the screen reader can be quite effective.

**Keyboard testing**

The goal is the to enable same functionality to everyone using a keyboard or a mouse alike. This doesn't need any special tools, just try to navigate through the site using keyboard only. The moment you have to resort to a mouse to get something done, you note that there is an issue here.

<table>
<colgroup>
<col style="width: 23%" />
<col style="width: 76%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Key</strong></th>
<th><strong>Action</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Tab</td>
<td>Moves forward</td>
</tr>
<tr class="even">
<td>Shift + Tab</td>
<td>Moves backwards</td>
</tr>
<tr class="odd">
<td>Enter / Return</td>
<td>Opens a link, activates a button</td>
</tr>
<tr class="even">
<td>Spacebar</td>
<td>Toggles a checkbox, activates a button</td>
</tr>
<tr class="odd">
<td>Arrow keys</td>
<td><ul>
<li><p>Scrolls the page</p></li>
<li><p>Moves and selects radio buttons in a group</p></li>
<li><p>Sometimes moves between menu items or tab panels</p></li>
</ul></td>
</tr>
<tr class="even">
<td>Esc</td>
<td>Closes dialogs, menus and pop-ups</td>
</tr>
</tbody>
</table>

When testing with the keyboard, important things to check would be:

- **Reach:** Can every link, UI component and control be reached with Tab?

- **Logical order:** Does the Tab move through the page in an order that makes sense?

- **Focus indicator:** Can I see where focus is at all times and does it have a good contrast? Is it the same style throughout or does it keep changing randomly?

- **Actionable controls:** Does every control that works with a mouse also work with the keyboard?

- **No keyboard traps:** Can I browse through using Tab from the browser's address bar all the way to the bottom of the page and back without getting trapped in any component? Or do I have to end up using a mouse to get out of certain fields and go back in the page?

- **Expected behaviour:** Custom components (menus, tabs, dropdowns) should work the way they are usually expected universally, for e.g.: arrow keys inside a menu, Esc to close.

- **Dropdowns and pop-ups:** They should be accessible and operable using only a keyboard, and focus shouldn't get lost when they close.

## Skip links and arrow keys

A skip link lets keyboard users jump past repeated content, like the menu, company name, main headings straight to the main content. Not everyone needs to go through the menu every time they visit website, so it’s a good practice to include these.

Arrow keys are used to move around inside one component, like menus, tab panels and data grids. Tab gets you into the component and the arrow keys move you within it.

**Reflow**

Content should still work when the page is zoomed in, without having to scroll sideways. A 1280 wide window at 400% zoom is the same as a small phone screen.

- Set viewport to 1280 px wide

- Zoom in up to 400% (Ctrl/Cmd +)

- Content should reflow into the smaller space, with no sideways scrolling

- All labels, components and functionality must be available and fully accessible. Exceptions: maps, videos, diagrams and data tables, since they need the wider layout to make sense.

**Forms**

- Are all fields labelled? A placeholder is not a label since it disappears once you start typing.

- Are all fields reachable and modifiable through the keyboard and screen reader?

- Error messages are announced by a screen reader? Do they say what went wrong and how to fix it?

**Screen readers**

A screen reader reads out what is on the page based on the code, not on how it looks. So, a page can look perfect and still not work.

Things to check:

- The page title is read out.

- Headings and landmarks make sense.

- Images have meaningful alt text.

- Buttons and links have names. If it only says "button", the name is missing.

- Form fields announce their label and their errors.

# Accessibility testing tools

- **axe DevTools:** browser extension in Dev tools. Go to the axe DevTools tab and scan the page. It shows the issues ranked critical, serious, moderate or minor, with a suggestion on how to fix. "Needs review" items have to be checked manually.

- **WAVE**: browser extension. Click the icon and it shows icons on the page itself: red for errors, yellow for alerts, green for features, blue for structural elements, etc. It provides info on how to fix issues (Reference tab). It also automatically detects the contrast ratio, mentions all details in the Contrast Tab.

> It gives an AIM Score (WAVE Accessibility Impact) which provides a measure of impact of page accessibility issues on users with disabilities. This is based on:

- Number of detectable errors

- Error density (number of detectable errors by page elements)

- Number of WAVE alerts (possible or likely accessibility issues)

<!-- -->

- **Lighthouse:** extension in Chrome DevTools, open the Lighthouse tab, tick Accessibility and run it. It gives a score out of 100, but it only covers the automated checks, so 100 doesn't mean the page is accessible.

- **ANDI:** a bookmarklet (not an extension) from the US Social Security Administration. Click the bookmark on the page and tab through the elements. It shows the name each element would get, which is close to what a screen reader would announce, and flags things like missing alt text and empty links.

Tools only catch part of the issues, so every finding should be checked by hand before it is logged. Keyboard and screen reader checks cover the rest.

**Exercise:**

**Accessibility audit**

Using Deque's MarsCommuter demo site for the audit. It is a site for accessibility demos or sample for issues and is a made-up travel site with accessibility issues built in, so there will be things to find.

[Deque's MarsCommuter demo site](https://dequeuniversity.com/demo/mars/)

Approach:

1.  **Scope:** The home page, and the trip booking form.

> Browser**:** Chrome.
>
> Screen reader used: NVDA

2.  **Tools:** Used the accessibility tools below to run audits.

> **_WAVE:_**
>
> AIM Score of 5 out of 10.
>
> It found 24 errors, 97 alerts and 10 contrast errors.
>
> **_Snapshot of the WAVE Report._**
>
> <img src="media/image1.png" style="width:2.84191in;height:7.80901in" />
>
> **_Lighthouse:_**
>
> Accessibility score of 63. [Full Lighthouse report](Lighthouse-audit-results.pdf)

Issues it found:

1.  Buttons do not have an accessible name.

2.  Image elements do not have \[alt\] attributes.

3.  Select elements do not have associated label elements.

4.  \<frame\> or \<iframe\> elements do not have a title.

5.  Links do not have a discernible name.

6.  Background and foreground colors do not have a sufficient contrast ratio.

7.  Links rely on color to be distinguishable.

8.  Internationalization and localization: \<html\> element does not have a \[lang\] attribute.

9.  Some elements have a \[tabindex\] value greater than 0

> Best practices standards unmet:

1.  Document does not have a main landmark.

2.  Touch targets do not have sufficient size or spacing.

Verified all findings from Lighthouse audit report and WAVE results.

**Manual accessible audit**

Defect log:

| **ID**  | **Where**                                                                                      | **Issue and steps to reproduce**                                                                                                                                                                                                                                                      | **Severity** |
| ------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| DEF-001 | Low contrast of focus indicator on main search field                                           | The contrast of the focus indicator is too low.                                                                                                                                                                                                                                       | High         |
| DEF-002 | Missing focus on Login                                                                         | The focus indicator is missing on the Facebook login button.                                                                                                                                                                                                                          | High         |
| DEF-003 | Booking form: Keyboard - From/To not operable/accessible                                       | Cannot reach the From and To buttons using Tab (keyboard) in the Book your trip form.                                                                                                                                                                                                 | Critical     |
| DEF-004 | Booking form: Keyboard - Add Another Trip not reachable                                        | Cannot reach the Add Another Trip button using Tab (keyboard) in the Book your trip form.                                                                                                                                                                                             | High         |
| DEF-005 | Booking form: Keyboard - Departure Time not reachable                                          | Cannot reach the Departure Time button using Tab (keyboard) in the Book your trip form.                                                                                                                                                                                               | High         |
| DEF-006 | Image elements missing alternative text                                                        | Three images are without alternative text, so the screen reader has no content to present to the user about the function of the link.                                                                                                                                                 | High         |
| DEF-007 | Booking form: Departure and Returns date - date picker button does not have an accessible name | The date picker buttons for Departure and Returns have no accessible name, so NVDA announces them as “unlabelled graphic button”.                                                                                                                                                     | High         |
| DEF-008 | Departure time: no label for the form element                                                  | The Departure time field in the Book your trip form has no label. NVDA announces it only as “button”, so screen reader users cannot tell what it is. The Returns time field is announced correctly as “combo box, currently 12 PM”, so the behaviour is inconsistent between the two. | High         |
| DEF-009 | Traveller age: no label for the form element                                                   | The Traveller age group field in the Book your trip form has no label, so screen reader users cannot tell its function or what is expected of it.                                                                                                                                     | High         |
| DEF-010 | Reflow issues: sideways scroll                                                                 | When zoomed in to 400%, the page scrolls sideways. This makes it difficult for certain users and gives a poor overall experience.                                                                                                                                                     | High         |
| DEF-011 | Reflow issues: jumping of focus                                                                | When zoomed in to 400%, the focus jumps around, so the user loses track of where they are on the page and finds it difficult to follow.                                                                                                                                               | High         |
| DEF-012 | Reflow issues: content cut off on the left                                                     | When zoomed in to 400%, the page doesn’t resize properly. A significant portion on the left is cut off, and the content starts abruptly at the edge of the screen.                                                                                                                    | Low          |
