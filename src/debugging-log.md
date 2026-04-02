# BSF-Nutrifeed Debugging Log
**Developer:** Naomi Akinleye
**Track:** Frontend Development
**Program:** DSHub Internship Cohort A 2026

---

## Bug 1: Instruction Text Pasted into Code File

**What happened:**
When setting up the Dashboard component, I accidentally copied
the instruction text along with the code and pasted everything
into Dashboard.js. This caused the app to crash with a
"Missing semicolon" error.

**Error message:**
SyntaxError: Missing semicolon. The error pointed to a line
that contained plain English text instead of code.

**How I identified it:**
The browser showed a red error screen. I checked the terminal
and saw "Compiled with problems" with a SyntaxError message
pointing to a specific line number in Dashboard.js.

**How I fixed it:**
I opened Dashboard.js, selected all the content with Cmd + A,
deleted everything, and carefully pasted only the code from
inside the grey code box — not the surrounding instructions.

---

## Bug 2: Dashboard Component Appearing Twice

**What happened:**
The Farm Dashboard section was showing up twice on the page.
The metrics and alerts were duplicated on the screen.

**Error message:**
No error message — the app still compiled successfully.
The bug was a visual/layout issue.

**How I identified it:**
I noticed while scrolling through the browser that the
dashboard section appeared two times in a row. I then
checked App.js and found that <Dashboard /> had been
added twice.

**How I fixed it:**
I opened App.js and found two instances of <Dashboard />.
I deleted one of them and saved the file. The page then
showed the dashboard only once as expected.

---

## Bug 3: App Could Not Be Reached in Browser

**What happened:**
When trying to view the app at localhost:3000, the browser
showed "This site can't be reached" and the page would
not load.

**Error message:**
Browser error: "This site can't be reached. 
localhost refused to connect."

**How I identified it:**
The browser could not connect to localhost:3000. I checked
VS Code and realised the terminal running npm start had
been closed, which stopped the local development server.

**How I fixed it:**
I opened a new terminal in VS Code, navigated to the
project folder using cd ~/Desktop/nutrifeed-app, and
ran npm start again. The browser then loaded the app
successfully at localhost:3000.

---

## Performance Improvements Made

1. Separated code into individual component files
   (Dashboard.js, FarmForm.js, ProductList.js) to keep
   the project organised and maintainable.

2. Added CSS media queries to make the app responsive
   on both mobile and desktop screens.

3. Used useState and useEffect hooks in React to manage
   data loading efficiently without slowing down the page.

---

## Summary
All three bugs were successfully identified and resolved.
The app now compiles without errors and runs smoothly
across mobile and desktop devices.