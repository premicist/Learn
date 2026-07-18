# Economics Learning Site

A learning website (notes, blog posts, quizzes, videos) built with React + Vite,
content-managed through **Decap CMS** and hosted free on **GitHub Pages**.

**First time here? Start with [SETUP.md](./SETUP.md)** — it walks through the
one-time setup (about 15 minutes) so you can start posting content through a
simple dashboard instead of editing code.

## Local development
```
npm install
npm run dev
```
This regenerates the site's data from `/content` and starts a local preview
at `http://localhost:5173`.

## Project structure
- `content/` — your notes, blog posts, quizzes, videos, and subject list.
  Edit these through `/admin` (recommended) or by hand.
- `admin/` — the Decap CMS dashboard configuration.
- `scripts/build-content.mjs` — turns `content/` into data the site reads.
  Runs automatically before `dev`/`build`; you don't need to run it yourself.
- `src/` — the React application.
- `.github/workflows/deploy.yml` — automatically builds and publishes the
  site to GitHub Pages on every push to `main`.
