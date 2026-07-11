# ⚡ IRONLOG

**A sleek, offline-first, privacy-focused workout logger and fitness tracker — with an optional AI coach.**

IRONLOG runs entirely in your browser. There is no backend server, no account creation on a remote database, and no tracking. All your workouts, personal records, body metrics, and goals live on your device, in your control.

---

## Table of Contents

- [Features](#features)
- [Why IRONLOG](#why-ironlog)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [AI Coach Setup](#ai-coach-setup)
- [Project Structure](#project-structure)
- [Data & Privacy](#data--privacy)
- [Security](#security)
- [Roadmap](#roadmap)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)


---

## Features

| Category | Details |
|---|---|
| 🏋️ **Workout Logging** | Log warm-up, working, superset, and dropset entries per exercise, with a built-in rest timer |
| 📊 **Analytics** | Weight progression charts, volume-over-time tracking, muscle balance breakdown, activity heatmap, estimated 1RM strength scores |
| 🏆 **Personal Records** | Automatic PR detection and history as you log sets |
| 📅 **Planner** | Weekly schedule view, built-in and custom workout templates |
| 🎯 **Goals & Achievements** | Set target weight/rep goals per exercise; unlock achievements (streaks, milestones, total sets) |
| 📏 **Body Tracking** | Log weight, body fat %, and measurements over time with trend charts |
| 🤖 **AI Coach** *(optional)* | Bring-your-own API key coach that gives advice grounded in your actual training history |
| 💾 **Backup & Restore** | Export/import your entire dataset as JSON; export workout history as CSV |
| 🌓 **Dark/Light Mode** | Full theming via CSS variables |
| 📱 **PWA / Offline Support** | Installable, works fully offline via a service worker |

---

## Why IRONLOG

Most fitness trackers fall into a few traps:

- **Privacy & data monetization** — routines, weights, and biometrics stored on remote servers you don't control
- **Poor gym connectivity** — server-dependent apps lag or fail in basement gyms with weak signal
- **Subscription paywalls** — simple logging gated behind recurring fees
- **Fragile local storage** — offline apps that lose data on a routine browser cleanup, with no easy way to migrate devices

IRONLOG addresses all four: it's fully client-side, works with zero connectivity, is free to host and use, and gives you explicit export/import tools plus a request to the browser for persistent storage protection.

---

## Tech Stack

- **React 19** — component architecture, hooks-based state management
- **Vanilla CSS3** — CSS custom properties for instant theme switching, responsive Grid/Flexbox layout
- **LocalStorage** — client-side persistence (see [Roadmap](#roadmap) for planned migration to IndexedDB/SQLite)
- **Service Worker (PWA)** — offline asset caching
- **Storage Manager API** (`navigator.storage.persist()`) — requests protection from automatic browser data eviction
- **Anthropic API** *(optional, user-supplied key)* — powers the AI Coach feature

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                   App.js                     │
│         (tab routing, theme toggle)          │
└───────────────────┬───────────────────────────┘
                     │
      ┌──────────────┴──────────────┐
      │         useStore()          │
      │  (auth, workouts, PRs,      │
      │   goals, templates,         │
      │   schedule, settings)       │
      └──────────────┬──────────────┘
                     │
   ┌─────────────────┼─────────────────────────┐
   │                 │                         │
Dashboard   Workout / History / Analytics   Planner / Goals /
                                            Body / Settings / Coach
```

Each page receives the `store` object as a prop and reads/calls the functions it needs. Components like `ExerciseCard`, `SetRowComp`, `RestTimer`, and `LineChart` are presentational and reusable across pages.

> **Note:** `useStore.js` currently centralizes all state in a single hook. A planned refactor will split this into `useAuth`, `useWorkouts`, `usePlanner`, and `useSettings` for better separation of concerns — see [Roadmap](#roadmap).

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd ironlog
npm install
```

### Running locally

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000). The page reloads automatically on changes.

### Building for production

```bash
npm run build
```

Bundles an optimized, minified production build into the `build/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

### Running tests

```bash
npm test
```

---

## AI Coach Setup

The AI Coach feature uses the Anthropic API directly from your browser — no backend relay, no data leaving your device except the prompt you choose to send.

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Go to **Settings → AI Coach API Key** in IRONLOG and paste it in
3. Open the **Coach** tab and start asking questions

Your key is stored in `localStorage` alongside the rest of your data and is never transmitted anywhere except directly to Anthropic's API when you send a message. The coach's responses are grounded in your actual logged workouts, PRs, and goals — it does not fabricate data it doesn't have.

**This step is entirely optional.** IRONLOG functions fully as a workout tracker without an API key configured.

---

## Project Structure

```
src/
├── components/         # Reusable UI pieces (ExerciseCard, RestTimer, LineChart, etc.)
├── constants/           # Static data: muscle groups, templates, achievements
├── hooks/
│   └── useStore.js      # Central state hook (auth, workouts, settings, etc.)
├── pages/               # One component per tab (Dashboard, Workout, Analytics, ...)
├── styles/
│   └── theme.css        # All app styling via CSS custom properties
├── utils/
│   └── helpers.js        # Date formatting, streak calculation, etc.
├── App.js               # Tab routing & top-level layout
└── index.js             # Entry point + service worker registration

public/
├── manifest.json        # PWA manifest
└── service-worker.js    # Offline caching logic
```

---

## Data & Privacy

- All data is stored under `localStorage` keys prefixed with `il_` (e.g. `il_workouts`, `il_prs`, `il_settings`)
- **Backup**: Settings → Backup (.json) collects all `il_`-prefixed keys into a single downloadable file
- **Restore**: Settings → Restore replaces current data with a previously exported backup (with a confirmation prompt)
- **Export CSV**: Download your workout history in spreadsheet-friendly format
- **Persistent Storage**: Settings → Request asks the browser to exempt IRONLOG from automatic storage eviction

---

## Security

### Password Hashing

Account passwords are no longer stored in plaintext. On registration and login, IRONLOG hashes the password client-side using the **Web Crypto API's SHA-256** implementation (`crypto.subtle.digest`) before it ever touches `localStorage`. Only the resulting hash is persisted under `il_users` — the raw password stays in memory only for the duration of the hashing call and is discarded immediately after.

At a high level, the flow is:

```
User enters password
        │
        ▼
SHA-256 hash (with per-user salt)
        │
        ▼
Store { name, email, passwordHash, salt } in il_users
```

A per-user salt is generated (via `crypto.getRandomValues`) and stored alongside the hash, so two users with the same password don't produce identical hash values, and precomputed rainbow-table lookups are far less useful against the stored data.

On login, the entered password is salted and hashed the same way, and the result is compared against the stored hash — the plaintext password itself is never stored or compared directly.

> This is a **client-side, demo-appropriate** hashing scheme intended to remove the plaintext-storage gap for a fully local, backend-less app. It is not a substitute for server-side authentication with a dedicated password-hashing algorithm (e.g. bcrypt/argon2) in contexts where a real backend and network-exposed login exist.

### Automatic Plaintext Migration

Existing installs that registered accounts before this change had plaintext passwords sitting in `il_users`. To avoid silently breaking logins or forcing a manual reset, IRONLOG runs a **one-time, automatic migration** the first time it loads after the update:

1. On startup, the store reads `il_users` and inspects each user record.
2. Any record missing a `passwordHash`/`salt` pair (i.e., still holding a raw `pass` field) is detected as a legacy plaintext entry.
3. For each legacy entry, IRONLOG generates a fresh salt, hashes the existing plaintext password with it, writes the new `{ passwordHash, salt }` fields, and **deletes the plaintext `pass` field** from that record.
4. The migrated `il_users` object is written back to `localStorage`, replacing the old plaintext version.

This migration is idempotent and safe to run on every load — once a record has a `passwordHash`, it's skipped on subsequent checks. Users experience no visible change: existing credentials continue to work, but are now hashed at rest going forward.

---

## Roadmap

- [x] Hash stored passwords (client-side) instead of plaintext
- [ ] Split `useStore.js` into focused hooks: `useAuth`, `useWorkouts`, `usePlanner`, `useSettings`
- [ ] Migrate from `localStorage` to IndexedDB or WASM SQLite for structured queries and larger datasets
- [ ] Migrate inline component styles to shared CSS classes
- [ ] Add input validation across forms
- [ ] Optional end-to-end encrypted sync via user-linked WebDAV/Google Drive/Dropbox
- [ ] Expand AI Coach with proactive insights (plateau detection, overtraining risk, auto-generated weekly reports)
- [ ] Unit + component test coverage with CI (GitHub Actions)

---

## Known Limitations

- Authentication is client-side only (SHA-256 hashed, salted, and local — see [Security](#security)) and is not intended as a substitute for real server-side authentication in contexts with network-exposed login
- Single-device by default (no built-in sync; use JSON export/import to move data between devices)
- `useStore.js` is a large, centralized hook that could be modularized further
- Some components rely on inline styles rather than shared CSS classes

---

## Contributing

This is currently a personal/portfolio project. Issues and suggestions are welcome — feel free to open an issue describing the bug or feature request.

---

