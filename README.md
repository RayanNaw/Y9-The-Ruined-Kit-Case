# The Ruined Kit Investigation

Year 9 MYP Science, Unit 2: Body Systems. Live site: https://rayannaw.github.io/Y9-The-Ruined-Kit-Case/

Students work through six stages: the mystery, Discover: enzymes, Discover: enzyme team, Evidence, Advice to Omar, and Extend. Roles A, B and C change how much support each student sees.

## Teacher view (class progress)
The teacher view is at the bottom of the site ("Teacher view") or at `.../#teacher`.
It reads every student's answers from a Google Sheet that you own. One-time setup (about 5 minutes):

1. Create a new Google Sheet (any name, e.g. "Ruined Kit progress").
2. In the sheet, open **Extensions > Apps Script**. Delete what is there and paste in the whole of `apps-script.gs` from this repository.
3. On the line `const PIN = 'CHANGE-ME';` replace CHANGE-ME with your own PIN. Click **Save**.
4. Click **Deploy > New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, allow the permissions Google asks for, and copy the **Web app URL** (it ends in `/exec`).
6. In `index.html`, find `const SYNC_URL='';` and paste the URL between the quotes. Commit the change.

Students type their name and class on the first screen. Their answers save to the sheet a few seconds after they type. Open the teacher view, enter your PIN, and the table updates every 20 seconds.
