# ⚡ IRONLOG

**A sleek, offline-first, privacy-focused workout logger and fitness tracker.**

IRONLOG runs entirely in your browser. There is no backend server, no remote database tracking, and no subscription paywalls. All your workouts, personal records, body composition metrics, and goals live strictly on your device, completely under your control.

---

## Table of Contents

- [Features](#features)
- [Why IRONLOG](#why-ironlog)
- [Design & Aesthetics](#design--aesthetics)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Data & Privacy](#data--privacy)
- [Security](#security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Features

| Category | Details |
|---|---|
| 🏋️ **Active Workout Logging** | Track warm-up, working, superset, and dropset entries per exercise, with an interactive floating rest timer and live workout duration tracker |
| 🎯 **Advanced Goals & Targets** | Multi-type goal tracking: **Strength PRs**, **Bodyweight & Physique**, and **Consistency Habits** with real-time PR sync |
| ⏳ **Deadlines & Countdowns** | Set target dates on goals with smart countdown badges (*"14 days left"*, *"Due Today"*, *"Overdue by 3d"*) |
| 🏆 **Trophy Cabinet & Badges** | Live progress indicators on locked achievements (*e.g., "7/10 workouts • 70%"*, *"SBD 210/250 kg • 84%"*), celebration modals, and trophy filters |
| 📊 **Deep Analytics & 1RM** | Estimated 1RM calculations, volume/tonnage progression over time, muscle balance breakdown, and GitHub-style activity heatmap |
| ⚡ **100% Crisp SVG System** | Pure scalable vector graphics throughout the entire interface via modular `<Icon />` components |
| 📏 **Body Composition** | Log body weight, body fat %, and physique measurements with trend charts |
| 📅 **Planner & Templates** | Weekly calendar schedule with built-in PPL, 5x5, and full-body templates + custom routine builder |
| 🌓 **Dual Athletic Themes** | **Cyberpunk Dark Mode** (Matte Obsidian + Neon Volt) & **Kinetic Light Mode** (Porcelain Slate + Kinetic Cyber-Green) with dynamic button contrast |
| 💾 **Backup & Privacy** | One-click JSON backup/restore, CSV export, and browser persistent storage request |
| 📱 **PWA / Offline First** | 100% functional offline with service worker caching, installable on mobile and desktop |

---

## Why IRONLOG

Most modern fitness trackers suffer from several common problems:

- **Privacy & data monetization** — workout routines, body measurements, and biometric data stored on remote third-party servers.
- **Poor gym connectivity** — server-dependent apps lag, timeout, or fail in basement gyms with weak cellular reception.
- **Subscription paywalls** — basic features like plate math, historical charts, or extra routines locked behind monthly fees.
- **Fragile local storage** — simple web apps that lose data on browser cleanup without reliable migration or backup tools.

IRONLOG solves these problems: it operates **100% client-side**, functions flawlessly with zero internet connectivity, is free to host and use, and provides explicit JSON/CSV export tools backed by IndexedDB and the browser Storage Manager API.

---

## Design & Aesthetics

IRONLOG features a high-performance, athletic aesthetic built for lifters:

- **Cyberpunk Dark Theme**: Deep obsidian `#0A0A0C` background paired with high-voltage neon volt `#C8FF00` highlights.
- **Kinetic Light Theme**: Crisp porcelain slate `#F8FAFC` canvas paired with punchy, high-contrast kinetic cyber-green `#16A34A` and snow-white cards.
- **Dynamic Text Contrast (`--accent-contrast`)**: Automatically adapts button typography between bold obsidian black on dark neon and crisp white on vivid green.
- **Pure SVG Vector Icons**: All icons render through crisp, scalable vectors—no blurry emojis or font-icon artifacts.
- **Interactive Celebrations**: Celebratory modals and visual bursts trigger whenever you achieve a personal record or smash a fitness target.

---

## Tech Stack

- **React 19** — modern component architecture and custom hooks
- **Vanilla CSS3** — CSS custom properties, responsive Flexbox & CSS Grid, fluid micro-animations
- **IndexedDB** — client-side structured database persistence (with automatic legacy localStorage migration)
- **Web Crypto API** — client-side salted SHA-256 password hashing (`crypto.subtle.digest`)
- **Service Worker (PWA)** — offline asset caching and home-screen installability
- **Storage Manager API** (`navigator.storage.persist()`) — requests browser protection from automatic data eviction

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                           App.js                            │
│           (tab routing, dynamic theme attribute)            │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               │          useStore()           │
               │  (orchestrator for sub-hooks) │
               └───────────────┬───────────────┘
                               │
   ┌───────────┬───────────────┼───────────────┬───────────┐
   │           │               │               │           │
useAuth   useWorkouts     useGoals        useBodyLog   usePlanner
           & usePrs    & useAchievements  & useSettings & useCustomEx
```

### Modular Hooks Pattern
The central state is managed cleanly through focused hooks under `src/hooks/`:
- `useAuth`: Salted SHA-256 credential authentication and session state.
- `useWorkouts`: Workout history, active logging, sets, supersets, and PR detection.
- `useGoals`: Multi-type targets (Strength, Physique, Consistency) with IndexedDB persistence.
- `useBodyLog`: Body weight, body fat %, and historical measurement tracking.
- `usePlanner`: Schedule organizer and routine template management.
- `useCustomExercises`: User-defined exercises categorized by muscle groups.
- `useSettings`: User preferences, weight units (kg/lbs), and theme state.

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kiranjdv/ironlog.git
cd ironlog

# Install dependencies
npm install
```

### Running Locally

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000). The development server reloads automatically upon changes.

### Building for Production

```bash
npm run build
```

Compiles an optimized, minified production build into the `build/` directory, ready to deploy to any static hosting provider (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

### Running Tests

```bash
npm test -- --watchAll=false
```

---

## Project Structure

```
src/
├── components/          # Reusable UI pieces (ExerciseCard, Icons, RestTimer, LineChart, etc.)
│   ├── CelebrationModal.js
│   ├── ExerciseCard.js
│   ├── Icons.js         # Scalable SVG icon library
│   ├── LineChart.js
│   ├── RestTimer.js
│   └── SetRowComp.js
├── constants/           # Static constants: muscle groups, templates, achievements
│   └── workoutData.js
├── hooks/               # Modular state hooks
│   ├── useAuth.js
│   ├── useBodyLog.js
│   ├── useCustomExercises.js
│   ├── useGoals.js
│   ├── usePlanner.js
│   ├── useSettings.js
│   ├── useStore.js
│   └── useWorkouts.js
├── pages/               # Tab pages
│   ├── AnalyticsPage.js
│   ├── BodyPage.js
│   ├── DashboardPage.js
│   ├── GoalsPage.js     # Multi-type goals, countdowns & trophy cabinet
│   ├── HistoryPage.js
│   ├── LoginPage.js
│   ├── PlannerPage.js
│   ├── SettingsPage.js
│   └── WorkoutPage.js
├── styles/
│   └── theme.css        # CSS variables, dark/light themes, animations
├── utils/
│   ├── crypto.js        # Web Crypto SHA-256 hashing & salting
│   ├── db.js            # IndexedDB abstraction layer
│   └── helpers.js       # Date formatting, streaks, 1RM formulas
├── App.js               # Main layout & navigation
└── index.js             # React entry point + PWA registration

public/
├── manifest.json        # PWA manifest
└── service-worker.js    # Offline caching script
```

---

## Data & Privacy

- **Local Storage**: All data is stored in your browser's IndexedDB (`ironlog_db`). No data ever leaves your device unless you explicitly export it.
- **Backup (`.json`)**: Export your full database into a single file from **Settings → Backup**.
- **Restore (`.json`)**: Import and restore your data at any time on any device.
- **CSV Export**: Export your workout history into a spreadsheet-compatible format (`.csv`).
- **Storage Persistence**: Request browser protection via the Storage Manager API to prevent automatic cache evictions.

---

## Security

Account credentials are protected client-side using the **Web Crypto API** (`crypto.subtle.digest`):
- Passwords are salted with cryptographically secure random bytes (`crypto.getRandomValues`).
- Passwords are never stored or logged in plaintext.
- Automatic legacy migration safely converts any old plaintext passwords into salted SHA-256 hashes upon startup.

---

## Roadmap

- [x] Client-side salted SHA-256 password hashing
- [x] Modular sub-hooks architecture (`useStore.js` decomposition)
- [x] IndexedDB structured database persistence
- [x] 100% Clean SVG vector icon system
- [x] Multi-type goal tracking (Strength, Physique, Habits) with target deadlines
- [x] Live progress indicators on locked achievements
- [x] High-contrast Kinetic Light Theme
- [ ] End-to-end encrypted sync via user-owned cloud storage (Google Drive / WebDAV)
- [ ] Automated GitHub Actions CI test suite

---

## Contributing

Contributions, feature requests, and bug reports are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/kiranjdv/ironlog).
