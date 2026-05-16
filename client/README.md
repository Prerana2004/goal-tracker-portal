# GoalTrack Portal

Functional React demo for the AtomQuest Hackathon 1.0 in-house goal setting and tracking portal.

## Run locally

```bash
npm install
npm run dev
```

PowerShell users with script execution disabled can use:

```bash
npm.cmd run dev
```

Production build:

```bash
npm.cmd run build
node serve-dist.cjs
```

## Demo journeys

- Employee: switch to Employee, choose Aarav/Nisha/Kabir, create goals, validate 100% total weightage, submit goals, and update quarterly actuals.
- Manager: switch to Manager, review team goal sheets, edit submitted weightages inline, approve or return for rework, complete quarterly check-ins, and push a shared KPI.
- Admin: switch to Admin, view completion dashboard, unlock approved sheets as an exception, inspect audit log, and review distribution analytics.

## Requirement coverage

- Goal creation with thrust area, title, description, UoM, target, status, actuals, and weightage.
- Validation for total weightage = 100%, minimum 10% per goal, and maximum 8 goals.
- L1 approval workflow with inline manager edits, return for rework, and locked goals after approval.
- Shared goals where linked actual achievement updates sync across recipients.
- Quarterly check-in windows, planned vs actual tracking, structured manager comments, and progress score formulas for Min, Max, Timeline, and Zero UoMs.
- Admin governance with completion dashboard, CSV export, audit trail, unlock exception handling, and analytics-style distribution chart.

## Architecture

The hackathon demo is a single-page React application with seeded in-memory data for fast evaluation and no hosting cost. State transition functions are grouped around API-like actions, so a future backend can replace local state with REST or serverless endpoints while keeping the UI flow intact. Recommended production path: React static hosting, Node/serverless API, relational database, Microsoft Entra ID SSO, and notification workers for email/Teams reminders.
