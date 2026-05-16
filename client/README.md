# GoalTrack Portal

GoalTrack Portal is a functional web-based goal setting and tracking system built for AtomQuest Hackathon 1.0. It supports the complete employee goal lifecycle: goal creation, manager approval, quarterly achievement updates, check-in documentation, reporting, and HR/Admin governance.

## Live demo

https://goal-tracker-portal.vercel.app/

## Demo access

No separate login is required for the hackathon demo. Use the in-app role switcher to test each journey.

| Role | Demo users | Main actions |
| --- | --- | --- |
| Employee | Aarav Mehta, Nisha Rao, Kabir Sen | Create goals, validate weightage, submit goals, update quarterly actuals |
| Manager | Priya Iyer, Rahul Das | Review goals, edit submitted weightages, approve or return goals, complete check-ins, push shared KPIs |
| Admin / HR | Ananya Kapoor | Monitor completion, unlock goal sheets, review audit logs, export reports, view analytics |

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | React.js, JavaScript, JSX |
| Styling | HTML, CSS |
| Build tool | Vite |
| Package manager | npm |
| Deployment | Vercel |
| Version control | Git, GitHub |

## Key features

- Employee goal creation with thrust area, title, description, UoM, target, status, actuals, and weightage.
- Validation rules for total weightage = 100%, minimum 10% per goal, and maximum 8 goals per employee.
- L1 manager approval workflow with inline weightage editing, return for rework, and locked goals after approval.
- Shared departmental KPIs where linked achievement updates sync across recipients.
- Quarterly achievement tracking with planned vs actual progress.
- Progress scoring for Min, Max, Timeline, and Zero UoM types.
- Structured manager check-in comments for each quarter.
- Admin dashboard for completion tracking, exception unlocks, audit logs, analytics, and CSV export.

## BRD schedule

The portal follows the required goal cycle windows:

| Period | Window opens | Purpose |
| --- | --- | --- |
| Goal Setting | May | Goal creation, submission, and manager approval |
| Q1 Check-in | July | Planned vs actual progress update |
| Q2 Check-in | October | Planned vs actual progress update |
| Q3 Check-in | January | Planned vs actual progress update |
| Q4 / Annual | March / April | Final achievement capture |

## How the scoring works

| UoM type | Meaning | Score logic |
| --- | --- | --- |
| Min | Higher is better, such as revenue or leads | Achievement / Target |
| Max | Lower is better, such as cost or turnaround time | Target / Achievement |
| Timeline | Date-based completion | 100% if completed on or before deadline, otherwise 0% |
| Zero | Zero equals success, such as safety incidents | 100% if actual is 0, otherwise 0% |

Scores are weighted by each goal's weightage to calculate overall progress.

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

PowerShell users with script execution disabled can use:

```bash
npm.cmd run dev
```

Create a production build:

```bash
npm.cmd run build
```

Serve the production build locally:

```bash
node serve-dist.cjs
```

## Architecture

The hackathon demo is a single-page React application with seeded in-memory data for fast evaluation and low hosting cost. The UI state transitions are grouped around API-like actions, so a backend can later replace the local state without changing the core user experience.

Recommended production architecture:

- React static frontend hosted on Vercel or similar static hosting.
- Node.js or serverless backend API for users, goals, approvals, check-ins, reports, and audit logs.
- Relational database for employee hierarchy, goal sheets, quarterly actuals, check-in comments, and change history.
- Microsoft Entra ID for SSO and role mapping.
- Email or Microsoft Teams notification workers for reminders, approvals, and escalations.

## Submission summary

The application satisfies the required Employee, Manager, and Admin journeys. It includes exportable reports, audit visibility, role-based workflows, goal validation, shared goals, quarterly check-ins, and a deployable live demo link.
