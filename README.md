# ⚡ Frontend Quizz — Fullstack Developer Quiz Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

**Frontend Quizz** is a modern, high-performance **Fullstack Next.js 14 (App Router)** application designed to test and sharpen developer skills across core web and fullstack technologies. Built with rich Glassmorphism aesthetics, default Dark Mode, interactive visual feedback, and native REST API routes.

---

## 🌟 Key Features

- **🚀 9 Comprehensive Technology Stacks**:
  - 🌐 **HTML5** — Document structure, semantics, and accessibility elements.
  - 🎨 **CSS3** — Flexbox, Grid, Box Model, pseudo-classes, and responsive queries.
  - ⚡ **JavaScript (ES6+)** — Promises, async/await, closures, DOM, and array methods.
  - 📘 **TypeScript** — Interfaces, Generics, Union types, and utility types.
  - ⚛️ **ReactJS** — Hooks (`useState`, `useEffect`, `useMemo`), props, virtual DOM, and lifecycle.
  - ▲ **NextJS (App Router)** — Server Components (RSC), Client Directives, API Routes, and ISR.
  - 🟢 **NodeJS** — Event Loop, Express.js, `fs` module, CommonJS, and ES Modules.
  - 🐙 **Git & GitHub** — Commits, branching, rebase, merge conflicts, and pull requests.
  - ♿ **Accessibility (a11y)** — WCAG standards, ARIA roles, and keyboard navigation.

- **🎨 Modern Glassmorphism UI/UX**:
  - Shimmering backdrop blurs (`backdrop-filter: blur(16px)`), smooth border glows, and elevated cards.
  - **Default Dark Mode** with seamless light mode switch toggle.
  - Custom scrollbar & sticky welcome header layout for effortless category browsing.

- **⚡ Interactive Quiz Engine**:
  - Instant visual feedback: Emerald green checkmark for correct answers, Rose red cross for incorrect options.
  - Glowing gradient progress indicator and option selector cards (`A`, `B`, `C`, `D`).
  - Score celebration screen with percentage badges and feedback messages.

- **🔌 Native Backend REST API**:
  - Integrated Next.js App Router API Route (`/api/quizzes`) delivering structured JSON data with query parameter filtering (`?title=ReactJS`).

---

## 🏗️ Project Architecture

```
frontend-quizz/
├── app/
│   ├── api/
│   │   └── quizzes/
│   │       └── route.js          # REST API Handler (/api/quizzes)
│   ├── quiz/
│   │   └── [title]/
│   │       └── page.jsx          # Dynamic Quiz Route Page
│   ├── globals.css               # Design System, Glassmorphism & Themes
│   ├── layout.jsx                # Root Layout, Dark Mode & Toast Provider
│   ├── page.jsx                  # Hero Home Page
│   └── not-found.jsx             # Custom 404 Error Page
├── components/
│   ├── Navbar.jsx                # Glass Header & Theme Switcher
│   ├── MenuLinks.jsx             # Server Component for Subject Cards
│   ├── Test.jsx                  # Client Component Quiz Engine & Feedback
│   └── Result.jsx                # Celebration & Score Summary Screen
├── data/
│   └── db.json                   # Comprehensive 9-Subject Quiz Database
├── public/
│   ├── assets/                   # SVG Tech Icons & Background Patterns
│   └── fonts/                    # Rubik WOFF2 Fonts
├── next.config.mjs               # Next.js Configuration
└── jsconfig.json                 # Path Aliases (@/*)
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & Server Components)
- **Library**: [React 18](https://react.dev/)
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, CSS Variables)
- **Icons**: Custom SVG Vector Assets
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/azimjonjalilov/frontend-quizz.git
cd frontend-quizz
npm install
```

### 2. Run Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📡 API Reference

### Get All Quizzes
```http
GET /api/quizzes
```
**Response**:
```json
{
  "data": [
    {
      "title": "HTML",
      "color": "#FFF1E9",
      "icon": "./assets/icon-html.svg",
      "questions": [...]
    }
  ]
}
```

### Get Quiz by Category
```http
GET /api/quizzes?title=ReactJS
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
