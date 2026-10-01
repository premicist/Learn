# Prem Pokhrel — Economics Learning Platform

An open, student-friendly economics learning website designed for secondary school (NEB Class 11 & 12), Bachelor's, and Master's students in Nepal and beyond.

The website provides syllabus-aligned notes, interactive quizzes, practice assignments, economic diagrams, and bilingual (Nepali and English) learning materials.

Live website: **[prempokhrel.com.np](https://prempokhrel.com.np)**

---

## What Students Get on the Platform

* **Guided Study Paths**: Step-by-step syllabus units following NEB and university economics curricula.
* **Smartphone-Friendly Reading**: Built for smooth reading on any mobile screen with fast loading.
* **Day & Night Reading Themes**: Switch between **Light**, **Warm Sepia (Eye Comfort)**, and **Dark Mode**, with one-tap text sizing (A- / A+).
* **Bilingual Support**: Comprehensive notes in both English and Nepali with clear technical terminology.
* **Interactive Tools**: Clear mathematical formulas (KaTeX), flowcharts (Mermaid), and interactive charts.
* **Quizzes & Practice Sets**: Instant multiple-choice feedback and numerical practice problems.
* **Progress Tracking**: Bookmark important notes, check off completed lessons, and search everything instantly with **Ctrl + K**.

---

## Running the Website on Your Computer

### Prerequisites
Make sure you have **Node.js** (version 22 or newer) and **Python 3** installed on your computer.

### Step 1: Install dependencies
Open your terminal in this project folder and run:

```bash
npm install
```

### Step 2: Start the local preview
Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your web browser to see the live website. Any change you make to notes or code will refresh automatically.

### Step 3: Check and build before publishing
Before uploading or committing your changes:

```bash
# Run content and code validation
npm run check

# Build the production website
npm run build
```

---

## Folder Organization

* **`content/`** — All study materials live here as simple Markdown and YAML files:
  * `content/notes/` — Chapter notes and study guides.
  * `content/curriculum.yml` — Guided unit sequences and syllabus topics.
  * `content/subjects.yml` — List of subjects, levels, and theme colors.
  * `content/quizzes/` — Multiple-choice quiz questions and answers.
  * `content/practice-sets/` — Self-paced numerical and writing assignments.
  * `content/blogs/` & `content/videos/` — Articles and video lessons.
* **`src/`** — The website code (React, TypeScript, and CSS styling).
* **`public/`** — Static images, icons, robots.txt, and sitemap.
* **`scripts/`** — Helper tools that turn content files into website data and validate links.
* **`admin/`** — Dashboard settings for adding or editing content through a web browser.

---

## Publishing Changes Online

Every time you push changes to the `main` branch on GitHub:
1. GitHub automatically tests and builds your website.
2. The live site at **prempokhrel.com.np** updates within a couple of minutes.

