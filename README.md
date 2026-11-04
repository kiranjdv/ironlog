# ⚡ IRONLOG

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/PWA-Offline--First_(v3)-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Offline First" />
  <img src="https://img.shields.io/badge/Storage-IndexedDB-336791?style=for-the-badge&logo=sqlite&logoColor=white" alt="IndexedDB" />
  <img src="https://img.shields.io/badge/Security-AES--GCM--256-00C853?style=for-the-badge&logo=shield&logoColor=white" alt="AES-256 Encryption" />
  <img src="https://img.shields.io/badge/Architecture-Zero--Backend-FF4081?style=for-the-badge" alt="Zero Backend" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License MIT" />
</p>

**A sleek, offline-first, privacy-focused workout logger and fitness tracker with zero backend and user-owned cloud sync.**

IRONLOG runs entirely in your browser. There is no corporate backend server, no remote database tracking, and no subscription paywalls. All your workouts, personal records, body composition metrics, and goals live strictly on your device—with optional, client-side encrypted multi-device sync through your personal Google Drive or WebDAV storage.

---

## 📑 Table of Contents

- [Features](#features)
- [Why IRONLOG](#why-ironlog)
- [Design & Aesthetics](#design--aesthetics)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Mathematical & Algorithmic Foundations](#mathematical--algorithmic-foundations)
- [Data Privacy & Cryptographic Security](#data-privacy--cryptographic-security)
- [Cloud Synchronization (Zero-Backend)](#cloud-synchronization-zero-backend)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## ✨ Features

| Category | Details |
|---|---|
| 🏋️ **Active Workout Logging** | Track warm-up, working, superset, and dropset entries per exercise, with an interactive floating rest timer and live workout duration tracker |
| 📖 **80+ Exercise Form Guides** | Instant offline guides with setup, execution, pro mind-muscle cues, common mistake warnings, starter volume targets, and one-click video tutorials |
| 🔤 **Offline Typo-Tolerance** | Built-in Levenshtein distance algorithm auto-suggests corrections and "Did you mean?" prompts for custom exercises in real time |
| 🗑️ **Custom Exercise Management** | Add custom exercises to any muscle group with one-click deletion (`🗑️`) directly from the exercise picker modal |
| ☁️ **User-Owned Cloud Sync** | Zero-backend multi-device sync via **Google Drive (AppData folder)** or **WebDAV** with optional client-side **AES-GCM-256 Zero-Knowledge encryption** |
| 🗂️ **Unified Subtab Navigation** | Streamlined 5-tab interface with segmented inner subtabs: **Analytics** (*Insights* vs. *History*) and **Settings** (*Preferences* vs. *Body Tracking*) |
| 🎯 **Advanced Goals & Targets** | Multi-type goal tracking: **Strength PRs**, **Bodyweight & Physique**, and **Consistency Habits** with real-time PR sync |
| ⏳ **Deadlines & Countdowns** | Set target dates on goals with smart countdown badges (*"14 days left"*, *"Due Today"*, *"Overdue by 3d"*) |
| 🏆 **Trophy Cabinet & Badges** | Live progress indicators on locked achievements (*e.g., "7/10 workouts • 70%"*, *"SBD 210/250 kg • 84%"*), celebration modals, and trophy filters |
| 📊 **Deep Analytics & 1RM** | Estimated 1RM calculations (Epley formula), volume/tonnage progression over time, muscle balance breakdown, and GitHub-style 53-week activity heatmap |
| ⚡ **100% Crisp SVG System** | Pure scalable vector graphics throughout the entire interface (including custom thunderbolt logo) via modular `<Icon />` components and native SVG charts |
| 📏 **Body Composition** | Log body weight, body fat %, and physique measurements with trend charts |
| 📅 **Planner & Templates** | Weekly calendar schedule with built-in PPL, 5x5, and full-body templates + custom routine builder |
| 🌓 **Dual Athletic Themes** | **Cyberpunk Dark Mode** (Matte Obsidian + Neon Volt) & **Kinetic Light Mode** (Porcelain Slate + Kinetic Cyber-Green) with dynamic button contrast (`--accent-contrast`) |
| 🗑️ **Safe Workout Management** | Vibrant crimson delete buttons with hover glow and two-step confirmation safeguards, accessible on mobile headers and expanded footers |
| 💾 **Backup & Privacy** | One-click JSON backup/restore, CSV export, and browser persistent storage request via Storage Manager API |
| 📱 **PWA / Offline First (v3)** | 100% functional offline with Service Worker v3 caching, installable on mobile and desktop |

---

## 💡 Why IRONLOG

Most modern fitness trackers suffer from critical structural problems:

- **Privacy & biometric monetization** — workout routines, body measurements, and biometric data stored on remote third-party servers and sold to advertisers.
- **Poor gym connectivity** — server-dependent apps lag, timeout, or fail in basement gyms with weak cellular reception.
- **Subscription paywalls** — basic features like plate math, historical charts, or extra routines locked behind $10–$15/month fees.
- **Fragile local storage** — simple web apps that lose data on browser cleanup without reliable migration or backup tools.

IRONLOG solves these problems: it operates **100% client-side**, functions flawlessly with zero internet connectivity, is free to host and use, and provides explicit JSON/CSV export tools backed by IndexedDB and the browser Storage Manager API.

---

## 🎨 Design & Aesthetics

IRONLOG features a high-performance, athletic aesthetic built for lifters:

- **Cyberpunk Dark Theme**: Deep obsidian `#0A0A0C` background paired with high-voltage neon volt `#C8FF00` highlights.
- **Kinetic Light Theme**: Crisp porcelain slate `#F8FAFC` canvas paired with punchy, high-contrast kinetic cyber-green `#16A34A` and snow-white cards.
- **Dynamic Text Contrast (`--accent-contrast`)**: Automatically adapts button typography between bold obsidian black on dark neon and crisp white on vivid green.
- **Pure SVG Vector Icons**: All icons render through crisp, scalable vectors—no blurry emojis or font-icon artifacts.
- **Interactive Celebrations**: Celebratory modals and visual bursts trigger whenever you achieve a personal record or smash a fitness target.
- **Segmented Subtabs**: Clean, glassmorphic pill switchers allow instant toggling between deep analytics and raw history logs, or preferences and body measurements.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | **React 19** | Component-driven declarative UI, custom hooks architecture (`useState`, `useEffect`, `useCallback`) |
| **Styling & Theme** | **Vanilla CSS3** | Zero-dependency styling, CSS custom properties, glassmorphism, responsive Flexbox & CSS Grid |
| **Client Database** | **IndexedDB (`ironlog_db`)** | Asynchronous transactional NoSQL storage with multi-store isolation and legacy migration |
| **Cryptography** | **Native Web Crypto API** | Client-side **PBKDF2** key derivation, **AES-GCM-256** zero-knowledge cloud encryption, and salted **SHA-256** password hashing |
| **Offline Engine** | **Service Worker (v3) & PWA** | Shell caching, asset cache-busting, and native desktop/mobile home-screen installability |
| **Cloud Synchronization** | **Google Drive REST API & WebDAV** | Direct client-to-cloud serverless synchronization targeting Google Drive `appDataFolder` |
| **Storage Resilience** | **Storage Manager API** | Invokes `navigator.storage.persist()` to obtain explicit persistent storage status from browser engine |
| **Algorithms** | **Dynamic Programming & Math** | Pure client-side Levenshtein distance matrix evaluation and sports-science formulas |
| **Testing** | **Jest & React Testing Library** | Automated test suite verifying cryptographic hashing, AES-256 encryption, and mock database transactions |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                           App.js                            │
│    (unified 5-tab dock/nav, segmented subtab routing)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                │          useStore()         │
                │  (orchestrator for sub-hooks)│
                └──────────────┬──────────────┘
                               │
    ┌───────────┬──────────────┼──────────────┬───────────┐
    │           │              │              │           │
 useAuth   useWorkouts     useGoals       useBodyLog   usePlanner
 (Crypto)  (History/PRs)   (Targets)      (Metrics)   (Templates)
    │           │              │              │           │
    └───────────┴──────────────┴──────────────┴───────────┘
                               │
               ┌───────────────┴───────────────┐
               │    IndexedDB Layer (db.js)    │
               │   Stores: users, workouts,    │
               │   bodyLog, goals, kv_store    │
               └───────────────┬───────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            │                                     │
   Local JSON/CSV Export               User-Owned Cloud Sync
   (Settings -> Backup)              (Google Drive / WebDAV)
                                      🔒 AES-GCM-256 Encrypted
```

### Modular Hooks Pattern
State management is decoupled from UI components using the **Hooks Orchestrator Pattern** under `src/hooks/`:
- `useAuth`: Salted SHA-256 credential authentication and session state.
- `useWorkouts`: Workout history, active logging, sets, supersets, and PR detection.
- `useGoals`: Multi-type targets (Strength, Physique, Consistency) with IndexedDB persistence.
- `useBodyLog`: Body weight, body fat %, and historical measurement tracking.
- `usePlanner`: Schedule organizer and routine template management.
- `useCustomExercises`: User-defined exercises with categorization and one-click deletion.
- `useSettings`: User preferences, weight units (kg/lbs), and theme state.

---

## 🧮 Mathematical & Algorithmic Foundations

### 1. One-Rep Max (1RM) Estimation — Epley Formula
In [`AnalyticsPage.js`](file:///src/pages/AnalyticsPage.js), theoretical maximum single-rep strength is computed from completed submaximal sets using the sports-science standard **Epley Formula**:

$$\text{1RM} = w \times \left(1 + \frac{r}{30}\right)$$

*Where $w$ is the weight lifted and $r$ is the repetitions completed.*

### 2. Typo-Tolerant Matching — Levenshtein Dynamic Programming
In [`exerciseGuideData.js`](file:///src/constants/exerciseGuideData.js), mistyped exercise names (e.g., *"suma squat"* or *"spidar curl"*) are matched against the 80+ exercise encyclopedia using dynamic programming:

$$\text{Similarity}(s_1, s_2) = \frac{\max(|s_1|, |s_2|) - \text{Levenshtein}(s_1, s_2)}{\max(|s_1|, |s_2|)}$$

Inputs scoring $\ge 70\%$ automatically present the lifter with *"Did you mean?"* suggestions and immediate technique cues.

### 3. Training Volume & Tonnage Aggregation
Cumulative session mechanical load is aggregated across all valid completed sets:

$$\text{Total Volume} = \sum_{\text{exercises}} \sum_{\text{sets}} (\text{Weight} \times \text{Reps})$$

### 4. 53-Week Calendar Heatmap Projection
Activity is mapped onto a discrete 53-week (371 days) calendar matrix ending dynamically on the Saturday of the current week:

$$\text{EndingSaturday} = \text{Today} + (6 - \text{DayOfWeek})$$

---

## 🔒 Data Privacy & Cryptographic Security

### 1. Client-Side Web Crypto Authentication
Passwords are protected using the hardware-accelerated **Web Crypto API** (`crypto.subtle.digest`):
- Passwords are salted with cryptographically secure random bytes (`crypto.getRandomValues`).
- Passwords never leave the browser and are never stored in plaintext.

### 2. Zero-Knowledge AES-GCM-256 Cloud Encryption
When syncing to Google Drive or WebDAV, your entire database is encrypted client-side using a user-defined passphrase:
- **Key Derivation:** **PBKDF2** with **100,000 iterations** of SHA-256 (`crypto.subtle.deriveKey`).
- **Cipher:** **AES-GCM-256** with cryptographically random 96-bit IV and 128-bit salt.
- Even if third parties or cloud providers inspect the backup file, they cannot read your workouts or body metrics without your passphrase.

### 3. Persistent Storage Immunity
IronLog invokes the **Storage Manager API** (`navigator.storage.persist()`) to request persistent storage status, protecting `ironlog_db` from automated browser cache eviction during low-disk scenarios.

---

## ☁️ Cloud Synchronization (Zero-Backend)

IronLog supports multi-device synchronization **without introducing a central server**:

1. **Google Drive (AppData Folder):**
   - Uses the official Google Identity Services (GIS) token client.
   - Synchronizes directly into Google Drive's hidden `appDataFolder`.
   - Files are invisible in regular Google Drive views, preventing accidental user deletion.
2. **WebDAV Support:**
   - Compatible with Nextcloud, ownCloud, and self-hosted NAS setups via standard REST Basic Auth.
3. **Auto-Sync:**
   - Optional toggle to automatically push encrypted backups to your cloud account upon finishing workouts.

---

## 📁 Project Structure

```
src/
├── components/               # Reusable UI pieces
│   ├── CelebrationModal.js   # Personal record & goal smash celebrations
│   ├── CloudSyncCard.js      # Zero-backend Google Drive & WebDAV sync panel
│   ├── ExerciseCard.js       # Set logging card with form guide launcher & history
│   ├── ExerciseGuideModal.js # 80+ form guide encyclopedia with setup & cues
│   ├── Icons.js              # 100% scalable SVG icon library
│   ├── LineChart.js          # Pure SVG min-max normalized charts
│   ├── RestTimer.js          # Interactive floating rest timer
│   └── SetRowComp.js         # Set row editor (warmup, working, superset, dropset)
├── constants/
│   ├── exerciseGuideData.js  # 80+ form guides, Levenshtein engine & keyword aliases
│   └── workoutData.js        # Muscle groups, routine templates, trophy definitions
├── hooks/                    # Modular state management
│   ├── useAuth.js            # Cryptographic session & user state
│   ├── useBodyLog.js         # Weight & body composition tracking
│   ├── useCustomExercises.js # Custom exercise store with add & delete actions
│   ├── useGoals.js           # Multi-type goals, deadlines & trophy sync
│   ├── usePlanner.js         # Weekly schedule & routine templates
│   ├── useSettings.js        # Theme, units (kg/lbs), and cloud sync preferences
│   ├── useStore.js           # Central state orchestrator
│   └── useWorkouts.js        # Workout execution, history, and PR detection
├── pages/                    # Core view tabs
│   ├── AnalyticsPage.js      # Performance insights, 1RM, volume & history subtab
│   ├── BodyPage.js           # Physique & measurement trend logs
│   ├── DashboardPage.js      # Quick launch, streaks, stats overview
│   ├── GoalsPage.js          # Deadlines, countdowns & trophy cabinet
│   ├── HistoryPage.js        # Full workout logs with crimson deletion safeguards
│   ├── LoginPage.js          # Client-side cryptographic auth view
│   ├── PlannerPage.js        # Routine scheduler and template builder
│   ├── SettingsPage.js       # App preferences, Cloud Sync & backup tools
│   └── WorkoutPage.js        # Active workout logger with typo-tolerant quick add
├── styles/
│   └── theme.css             # CSS variables, dual athletic themes, crimson buttons
├── utils/
│   ├── cloudSync.js          # AES-256 encryption, Google Drive & WebDAV REST APIs
│   ├── cloudSync.test.js     # Cryptographic unit tests for zero-knowledge sync
│   ├── crypto.js             # Web Crypto salted SHA-256 hashing
│   ├── crypto.test.js        # Auth crypto unit tests
│   ├── db.js                 # IndexedDB transaction layer & mock DB for testing
│   └── helpers.js            # Streaks, time formatting, muscle lookups
├── App.js                    # Layout shell, 5-tab mobile dock & subtab router
├── App.test.js               # Core app render test
└── index.js                  # Entry point with Service Worker registration

public/
├── manifest.json             # PWA manifest
└── service-worker.js         # Offline asset caching script (v3)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
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

Opens [http://localhost:3000](http://localhost:3000) in your browser. The app hot-reloads automatically upon changes.

### Building for Production

```bash
npm run build
```

Compiles a minified, production-ready build into `build/`, ready for deployment on static hosting providers (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

## 🧪 Testing

IRONLOG features an automated Jest test suite covering cryptographic security, zero-knowledge encryption, and transactional database integrity:

```bash
# Run all tests once
npm test -- --watchAll=false
```

Test suites include:
- `crypto.test.js`: Verifies client-side SHA-256 hashing and deterministic salt behavior.
- `cloudSync.test.js`: Tests AES-GCM-256 encryption, wrong passphrase rejection, and full snapshot restoration.
- `App.test.js`: Validates component tree rendering and IndexedDB initialization.

---

## 🗺️ Roadmap

- [x] Client-side salted SHA-256 password hashing
- [x] Modular sub-hooks architecture (`useStore.js` decomposition)
- [x] IndexedDB structured database persistence
- [x] 100% Clean SVG vector icon system
- [x] Multi-type goal tracking (Strength, Physique, Habits) with target deadlines
- [x] Live progress indicators on locked achievements
- [x] High-contrast Kinetic Light Theme
- [x] 80+ Exercise Form Guide Library with setup, execution & common mistake warnings
- [x] 100% Offline Levenshtein typo-tolerance & live search auto-correction
- [x] Streamlined 5-tab mobile dock with segmented internal subtabs
- [x] Service Worker v3 offline caching upgrade
- [x] Mobile-optimized workout deletion with two-step confirmation & glowing crimson styling
- [x] One-click custom exercise deletion (`🗑️`) in exercise picker
- [x] User-owned Zero-Backend Cloud Sync via Google Drive (AppData) & WebDAV
- [x] Client-side AES-GCM-256 Zero-Knowledge cloud encryption
- [ ] Barbell Plate Calculator & Visual Loader Widget
- [ ] Web Bluetooth (BLE) sensor integration for heart-rate monitors

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/kiranjdv/ironlog).
