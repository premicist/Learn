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
This synchronizes the CMS files, generates the sitemap and typed site data from `/content`, validates the content, and starts a local preview at `http://localhost:5173`.

Before committing content or code changes, run:

```bash
npm run check
npm run build
```

## Project structure
- `content/` — your notes, blog posts, quizzes, videos, and subject list.
  Edit these through `/admin` (recommended) or by hand.
- `admin/` — the Decap CMS dashboard configuration.
- `scripts/build-content.mjs` — turns `content/` into data the site reads.
  Runs automatically before `dev`/`build`; you don't need to run it yourself.
- `scripts/validate-content.mjs` — checks subject references, required metadata,
  dates, quiz answer indexes, and media identifiers before generation.
- `scripts/build-sitemap.mjs` — generates `public/sitemap.xml` from the route and
  content tree.
- `scripts/sync-admin.mjs` — keeps the canonical `admin/` CMS files synchronized
  with the deployed `public/admin/` copy.
- `src/` — the React application, including route-level SEO, article pages,
  searchable content directories, quiz feedback, and local progress persistence.
- `.github/workflows/deploy.yml` — automatically builds and publishes the
  site to GitHub Pages on every push to `main`.
