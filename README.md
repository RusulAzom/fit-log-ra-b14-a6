<div align="center">

# 🏋️ FitLog — Workout Library & Gym Companion

**A dark-themed, no-nonsense gym companion web application built for logging daily sets, organizing today's workout plan, and saving exercises for future sessions.**

[![Next.js](https://img.shields.io/badge/Next.js-13.5_App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📖 Overview

FitLog is a workout library and daily planner in one dark, high-contrast interface.
It pulls twelve major lifts from a Cloudflare Workers REST API, renders them as a
clickable library, and lets you assemble a five-lift plan for today, save lifts for
later, and tick sessions off as done — all persisted in the browser, so nothing is
lost on refresh.

- **Dark, high-contrast UI** — lime (`#ccff00`) accents, heavy display type, zero clutter.
- **Zero-config persistence** — no accounts and no backend state; everything lives in `localStorage`.
- **Resilient data layer** — the API layer automatically fails over to a mirror endpoint.

---

## ✨ Key Features

| # | Feature | What it does |
|---|---------|--------------|
| 1 | **Dynamic Workout Library** | Browse twelve major lifts fetched via the API, complete with automatic fallback handling and loading states. |
| 2 | **Multi-Location Sorting** | Sort by **Duration**, **Calories** or **Rating** — both in the Home library and on the My Plan page tabs. |
| 3 | **Live Plan & Saved Counters** | Navbar badge counters update instantly as lifts are added or removed, and both link straight to `/my-plan`. |
| 4 | **Interactive Plan Log & Metrics** | Live summary of total exercises, minutes and burned calories, with **Mark as Done** and **Remove** actions backed by toasts. |
| 5 | **LocalStorage Persistence** | Today's plan, saved lifts and completed IDs survive page reloads. |

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js](https://nextjs.org/) 13 — App Router, client components |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/) (`lucide-react`) |
| **Notifications** | [`react-hot-toast`](https://react-hot-toast.com/) |
| **State & Persistence** | React Context API + `localStorage` |
| **API** | Cloudflare Workers REST API (primary & fallback endpoint support) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or newer
- **npm** (ships with Node)

### Install and run locally

```bash
# 1. Clone the repository
git clone https://github.com/RusulAzom/fit-log-ra-b14-a6.git
cd fit-log-ra-b14-a6

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server on port 3000 |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint the project with `next lint` |

---

## 📂 Project Structure

```
fit-log-ra-b14-a6/
├── public/
│   └── imgs/                      # Logo and fallback workout imagery
├── src/
│   ├── app/
│   │   ├── globals.css            # Tailwind layers + base dark theme
│   │   ├── layout.jsx             # Root layout: WorkoutProvider + Toaster
│   │   ├── not-found.jsx          # Custom dark 404 page
│   │   ├── page.jsx               # Home: workout library + sort dropdown
│   │   ├── my-plan/page.jsx       # Metrics, tabs, sorting, plan actions
│   │   └── workout/[id]/page.jsx  # Dynamic workout details page
│   ├── components/                # Navbar, Footer, EmptyState
│   ├── context/
│   │   └── WorkoutContext.jsx     # plan / saved / completed + localStorage
│   └── services/
│       └── api.js                 # API helpers with automatic fallback
├── tailwind.config.ts
└── package.json
```

---

## 🔌 API Reference (`src/services/api.js`)

| Endpoint | URL |
|----------|-----|
| **Primary** | `https://api.abcz.workers.dev/api/fitlog` |
| **Alternative (fallback)** | `https://api.api-store.workers.dev/api/fitlog` |

Two helpers are exported, each wrapped in a `try/catch` block:

| Helper | Returns |
|--------|---------|
| `getAllWorkouts()` | An array of workout objects — `[]` if every endpoint fails |
| `getWorkoutById(id)` | A single workout, or `null` when the id does not exist |

**Fallback behaviour:** the primary endpoint is requested first. If it throws,
returns a non-OK status, is abandoned after an 8-second timeout, or returns an
unexpected (non-array) payload, the request is automatically retried against the
alternative endpoint.

### Workout shape

```json
{
  "id": 1,
  "name": "Barbell Bench Press",
  "description": "The classic horizontal press for chest strength.",
  "image": "https://img.magnific.com/...",
  "equipment": "Barbell",
  "difficulty": "Intermediate",
  "sets": 4,
  "reps": "8-10",
  "duration": 15,
  "caloriesBurned": 120,
  "rating": 4.8,
  "muscleGroups": ["Chest", "Triceps"],
  "instructions": ["Lie flat on the bench...", "Grip the bar..."]
}
```

---

## 🧠 State Management & Persistence

`WorkoutProvider` (React Context) owns the application state and exposes it
through the `useWorkouts()` hook.

| Value | Type | Purpose |
|-------|------|---------|
| `plan` | `Workout[]` | Today's plan — capped at **5** lifts |
| `saved` | `Workout[]` | Lifts saved for later |
| `completed` | `number[]` | IDs of lifts marked as done |
| `hydrated` | `boolean` | `true` once `localStorage` has been read |

| Function | Behaviour |
|----------|-----------|
| `addToPlan(workout)` | Rejects duplicates and enforces the 5-lift cap → toast `Added to today's plan` |
| `saveForLater(workout)` | Rejects duplicates → toast `Saved for later` |
| `removeFromPlan(id)` | Removes a lift from today's plan → toast `Removed from plan` |
| `removeFromSaved(id)` | Removes a lift from the saved list → toast `Removed from saved` |
| `markAsDone(id)` | Toggles completed status → toast `Workout marked as done!` |

State is serialised to `localStorage` under the key **`fitlog-state`** and
re-read on mount, so plans and saved lifts survive page reloads.

---

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Hero, live API library, sort dropdown, clickable workout cards |
| `/workout/[id]` | Image, description, muscle tags, specs table, numbered instructions, Add to plan / Save for later |
| `/my-plan` | Metrics summary, `Today's Plan` / `Saved` tabs, sorting, View Details / Mark as Done / Remove |
| `*` | Custom dark 404 page with a link back home |

---

## ☁️ Deployment

1. Push the repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new).
3. Keep the defaults — Vercel detects Next.js automatically.
4. Deploy. No environment variables are required.

---

<div align="center">

**Train with intent. Log every set.** 💪

</div>


