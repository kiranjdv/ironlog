# ⚡ IRONLOG

**A sleek, offline-first, privacy-focused workout logger and fitness tracker.**

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
- **IndexedDB** — client-side structured database persistence (with automatic, backwards-compatible local migration from localStorage)
- **Service Worker (PWA)** — offline asset caching
- **Storage Manager API** (`navigator.storage.persist()`) — requests protection from automatic browser data eviction

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
                                            Body / Settings
```

Each page receives the `store` object as a prop and reads/calls the functions it needs. Components like `ExerciseCard`, `SetRowComp`, `RestTimer`, and `LineChart` are presentational and reusable across pages.

> **Note:** `useStore.js` orchestrates focused modular sub-hooks: `useAuth`, `useSettings`, `useWorkouts`, `usePlanner`, `useBodyLog`, `useGoals`, and `useCustomExercises` for better separation of concerns and maintainability.

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



---

## Project Structure

```
src/
├── components/         # Reusable UI pieces (ExerciseCard, RestTimer, LineChart, etc.)
├── constants/           # Static data: muscle groups, templates, achievements
├── hooks/
│   ├── useAuth.js            # User credentials and local session hook
│   ├── useBodyLog.js         # Body metrics logs state hook
│   ├── useCustomExercises.js  # Custom exercises state hook
│   ├── useGoals.js           # Target goals state hook
│   ├── usePlanner.js         # Weekly schedules and template design hook
│   ├── useSettings.js        # User units and theme preferences hook
│   ├── useStore.js           # Main hook orchestrator
│   └── useWorkouts.js        # Workouts history and active log hook
├── pages/                    # One component per tab (Dashboard, Workout, Analytics, ...)
├── styles/
│   └── theme.css             # All app styling via CSS custom properties (inc. dark/light modes)
├── utils/
│   ├── crypto.js             # Web Crypto SHA-256 password hashing
│   ├── db.js                 # IndexedDB client-side database helper and mock DB
│   └── helpers.js            # Date formatting, streak calculation, etc.
├── App.js                    # Tab routing, database loading screen, & top-level layout
└── index.js                  # Entry point + service worker registration

public/
├── manifest.json        # PWA manifest
└── service-worker.js    # Offline caching logic
```

---

## Data & Privacy

- All data is stored locally in an IndexedDB database named `ironlog_db` (using dedicated object stores for workouts, body logs, goals, users, and a key-value store for preferences/metadata).
- **Backup**: Settings → Backup (.json) queries all IndexedDB tables and compiles them into a single downloadable file.
- **Restore**: Settings → Restore wipes all IndexedDB tables and restores the JSON backup file (fully compatible with backups from previous versions).
- **Export CSV**: Download your workout history in spreadsheet-friendly format
- **Persistent Storage**: Settings → Request asks the browser to exempt IRONLOG from automatic storage eviction

---

## Security

### Password Hashing

Account passwords are no longer stored in plaintext. On registration and login, IRONLOG hashes the password client-side using the **Web Crypto API's SHA-256** implementation (`crypto.subtle.digest`) before it ever touches the database. Only the resulting hash is persisted under the `users` database table — the raw password stays in memory only for the duration of the hashing call and is discarded immediately after.

At a high level, the flow is:

```
User enters password
        │
        ▼
SHA-256 hash (with per-user salt)
        │
        ▼
Store { name, email, passwordHash, salt } in users store
```

A per-user salt is generated (via `crypto.getRandomValues`) and stored alongside the hash, so two users with the same password don't produce identical hash values, and precomputed rainbow-table lookups are far less useful against the stored data.

On login, the entered password is salted and hashed the same way, and the result is compared against the stored hash — the plaintext password itself is never stored or compared directly.

> This is a **client-side, demo-appropriate** hashing scheme intended to remove the plaintext-storage gap for a fully local, backend-less app. It is not a substitute for server-side authentication with a dedicated password-hashing algorithm (e.g. bcrypt/argon2) in contexts where a real backend and network-exposed login exist.

### Automatic Plaintext Migration

Existing installs that registered accounts before this change had plaintext passwords sitting in the user database. To avoid silently breaking logins or forcing a manual reset, IRONLOG runs a **one-time, automatic migration** the first time it loads after the update:

1. On startup, the store reads the `users` table and inspects each user record.
2. Any record missing a `passwordHash`/`salt` pair (i.e., still holding a raw `pass` field) is detected as a legacy plaintext entry.
3. For each legacy entry, IRONLOG generates a fresh salt, hashes the existing plaintext password with it, writes the new `{ passwordHash, salt }` fields, and **deletes the plaintext `pass` field** from that record.
4. The migrated `users` object is written back to IndexedDB, replacing the old plaintext version.

This migration is idempotent and safe to run on every load — once a record has a `passwordHash`, it's skipped on subsequent checks. Users experience no visible change: existing credentials continue to work, but are now hashed at rest going forward.

---

## Roadmap

- [x] Hash stored passwords (client-side) instead of plaintext
- [x] Split `useStore.js` into focused hooks: `useAuth`, `useWorkouts`, `usePlanner`, `useSettings`
- [x] Migrate from `localStorage` to IndexedDB or WASM SQLite for structured queries and larger datasets
- [ ] Migrate inline component styles to shared CSS classes
- [x] Add input validation across forms
- [ ] Optional end-to-end encrypted sync via user-linked WebDAV/Google Drive/Dropbox
- [ ] Unit + component test coverage with CI (GitHub Actions)

---

## Known Limitations

- Authentication is client-side only (SHA-256 hashed, salted, and local — see [Security](#security)) and is not intended as a substitute for real server-side authentication in contexts with network-exposed login
- Single-device by default (no built-in sync; use JSON export/import to move data between devices)
- Modularized hooks are orchestrated by `useStore.js` to simplify layout but are fully separate hooks internally.
- Some components rely on inline styles rather than shared CSS classes

---

## Contributing

This is currently a personal/portfolio project. Issues and suggestions are welcome — feel free to open an issue describing the bug or feature request.

---

