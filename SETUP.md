# Learn site setup

This site is a React + Vite learning website for economics notes, articles, quizzes, and videos. Content is authored through Decap CMS and deployed to GitHub Pages.

## Content flow

```text
/admin → DecapBridge → GitHub content files → validation/build → GitHub Pages
```

The editable source files live under `content/`. The `admin/config.yml` file is the canonical CMS configuration. The build synchronizes it into `public/admin/config.yml`; do not edit the public copy by hand. Each subject has a manually ordered `featured` list where editors can pin notes, blogs, quizzes, or videos by exact resource ID.

## Local development

```bash
npm install
npm run dev
```

The development command synchronizes the CMS, generates the sitemap, validates the content, generates typed data under `src/data/generated/`, and starts Vite at `http://localhost:5173`.

## One-time deployment setup

1. Confirm the repository is public and GitHub Pages is enabled with **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Confirm `vite.config.ts` uses `base: '/'` for the custom domain `prempokhrel.com.np`. If deploying under `username.github.io/repository-name/` instead, change it to `base: '/repository-name/'`.
3. Confirm the canonical `admin/config.yml` points to the correct DecapBridge site and repository. The matching deployed copy is generated automatically during the build.
4. Confirm the custom domain is configured through `public/CNAME` and that DNS points to GitHub Pages.
5. Visit `https://prempokhrel.com.np/admin/` to open the content dashboard. Publishing creates a GitHub commit through DecapBridge, which triggers the deployment workflow.

## Adding content

Use the `/admin/` dashboard whenever possible. Every note, blog, quiz, and video must use a valid `subjectId` from `content/subjects.yml`. Subject and level IDs must be lowercase kebab-case, such as `microeconomics`, `class-11`, or `managerial-economics`. Featured entries use `type` (`note`, `blog`, `quiz`, or `video`) plus the exact filename ID without `.md`; their order controls the display order on the subject page.

Notes support a Markdown body, optional cover image, and optional image alt text. Blog posts require a Markdown body. Quiz questions require at least two options, a valid zero-based `answerIndex`, and an explanation. Videos may include a YouTube ID, transcript, and key takeaways.

You can also edit files under `content/` directly. Run the following before committing:

```bash
npm run validate-content
npm run build
npm run lint
```

The validator checks taxonomy references, duplicate IDs, required fields, dates, quiz answer indexes, and YouTube IDs. The build will stop if validation fails.

## Deployment workflow

`.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch. It installs dependencies with `npm ci` on Node 22.22.0, validates content, synchronizes the CMS, generates the sitemap, builds the application, adds `.nojekyll`, creates a `404.html` SPA fallback, and deploys `dist/` to GitHub Pages.

## Common problems

If the site shows a blank page under a repository URL, check that `vite.config.ts` has the correct `base` path. If content does not appear under a subject, check the exact `subjectId` and run `npm run validate-content`. If the admin panel looks outdated, confirm that `admin/config.yml` is the source of truth and rebuild so it is synchronized to `public/admin/config.yml`.

## Scheduled Tests (Phase 2)

Scheduled Tests are authored in the `/admin/` dashboard under **Scheduled Tests**. New tests are drafts by default; set **Publish this test** only when the availability window and numerical answer key are ready. The build publishes only records whose `published` field is `true`.

Before publishing the first Scheduled Test, run `supabase/scheduled-tests.sql` in the Supabase SQL editor. Re-run the same file after pulling exam-integrity updates. It creates `scheduled_test_submissions`, allows the public anon key to insert submissions, blocks public table reads, enforces **one attempt per class + section + roll number**, and exposes only a sanitized top-10 leaderboard through the `get_scheduled_test_leaderboard` RPC. Duplicate rows from earlier tests are collapsed to the earliest submission. The RPC returns position, roll number, class, section, and numerical score; student names remain in the private table for teacher review.

The deployed frontend needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` configured in the deployment environment. The site still renders and scores a test locally when those variables are absent, but the submission cannot be saved until Supabase is configured.

### What the site can and cannot guarantee

**Enforced after the SQL is applied**
- One saved attempt per test for the same class, section, and roll number (`12` and `012` count as the same roll; `A` and `a` count as the same section).
- Students are blocked at Start if that identity already submitted.
- A second insert is rejected by the database, even if someone bypasses the page.
- The leaderboard shows each identity once (the first attempt).
- Correct answers stay hidden until the test window closes.

**Still trust-based / classroom-supervised**
- Identity is typed, not logged in. A student can still use someone else's unused roll number.
- Questions and the answer key ship in the public website, so a determined student can read them from the page source.
- The timer lives in the browser. Refreshing the same browser resumes the original start time; a different device can still start a fresh timer until the first successful submit.
- The score is calculated in the browser. A student who knows how to call the API could submit a fake score once.

For a high-stakes exam, supervise the room, publish a class roster, or add student sign-in. This site is built for a teacher-run classroom test, not an unproctored public contest.
