# ⚡ IRONLOG

A sleek, premium, privacy-focused, and offline-first workout logger and fitness tracker. Built entirely on modern web standards with zero backend database costs.

---

## 📖 Table of Contents
- [Features](#-features)
- [Aesthetic & Design Philosophy](#-aesthetic--design-philosophy)
- [Technology Stack](#-technology-stack)
- [Security Architecture](#-security-architecture)
- [Getting Started](#-getting-started)
- [Data Ownership & Portability](#-data-ownership--portability)
- [License](#-license)

---

## ⚡ Features

### 1. Offline-First Resilience
- Fully functional workout logging, rest timers, and progress analytics operate without an active internet connection. Perfect for basement gyms or spots with weak cell signals.

### 2. Privacy by Design
- No remote servers or trackers. All routines, logs, and biometric data are stored 100% on your local device's hardware.

### 3. Active Workout Session Tracker
- Build custom templates or log workouts on-the-go.
- Interactive set tracker supporting standard, warmup, drop, and supersets.
- **Dynamic Rest Timer:** Triggers a background visual countdown overlay between sets.

### 4. Interactive Progress Analytics
- Custom built-in SVG line charts track personal records (PRs) and strength volume over time.
- Muscle distribution frequency graphs map out your training volume dynamically.

### 5. Persistent Local Storage
- Utilizes the browser's Storage Manager API (`navigator.storage.persist()`) to request OS-level protection against browser data cleaning cycles, preventing accidental data loss.

---

## 🎨 Aesthetic & Design Philosophy
- **Dynamic Light/Dark Modes:** Implemented using Vanilla CSS custom properties (variables) mapping to smooth transitions.
- **Modern Typography:** Styled with Outfit/Inter google fonts.
- **Glassmorphic UI Components:** Soft shadows, subtle gradients, and crisp cards create a high-end dashboard feel.
- **Micro-Animations:** Fluid interactions and button transitions bring the app to life.

---

## 🛠️ Technology Stack
- **Frontend Core:** React 19 (declarative UI & hooks-based state orchestration).
- **Styling:** Vanilla CSS3 (CSS Variables, Flexbox, Grid) for maximum speed and control.
- **Client Storage:** LocalStorage wrapped in a custom transactional state engine (`useStore`).
- **Security:** Native Browser Web Crypto API for secure SHA-256 password hashing.
- **Service Workers:** Configured for PWA caching, enabling sub-millisecond load times.

---

## 🔒 Security Architecture

### Local Password Hashing
To prevent exposing user credentials in plaintext within browser data stores, **IRONLOG** uses native cryptographic functions:
* Passwords are converted into a secure **SHA-256 hash** before being committed to `localStorage`.
* Plaintext passwords are never stored, logged, or exported.

### Zero-Friction Plaintext Migration
If you are upgrading from an older version of **IRONLOG**, the application securely handles migration:
1. When you log in with your plaintext password, the store verifies it.
2. Upon successful verification, it hashes the password and automatically replaces the plaintext entry in storage.
3. Subsequent logins use the secure SHA-256 verification pathway.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kiranjdv/ironlog.git
   cd ironlog
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the project in development mode:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal output) to view it in your browser.

### Running Unit Tests
To run the automated tests in CI/non-watch mode:
```bash
npm test
```

### Production Build
To bundle the application into static files for production deployment:
```bash
npm run build
```
This outputs optimized, minified files inside the `build/` directory, ready to be hosted for free on GitHub Pages, Vercel, Netlify, or similar platforms.

---

## 📂 Data Ownership & Portability
You own 100% of your data. **IRONLOG** provides import/export interfaces in the Settings page:
- **JSON Backup:** Exports all user profiles, workout templates, log history, and PR achievements into a single `.json` database file.
- **JSON Restore:** Upload your backup file to instantly reload all configurations and logs onto any new device.
