# Setup guide: GitHub Pages + Decap CMS

This site is now wired so that you can log in to a `/admin` page and write notes,
blog posts, quizzes, and videos through forms — no code editing needed. Every
time you click "Publish" in that admin page, your live site rebuilds and
updates automatically within a couple of minutes.

You only need to do the steps below **once**. After that, posting content is
just: go to `yourusername.github.io/yourrepo/admin/`, log in, write, publish.

## How content flows (for your own understanding)

```
You write in /admin  →  Decap CMS saves a file to GitHub  →  GitHub Actions
rebuilds the site  →  GitHub Pages serves the updated site
```

Your notes/blogs/quizzes/videos live as plain files under the `content/`
folder. A small script (`scripts/build-content.mjs`) turns them into the data
the website reads. You never need to touch that script or the `content/`
files directly — the admin panel does it for you.

## One-time setup

### 1. Create the GitHub repository
Create a new **public** repository on GitHub (public is required for the free
GitHub Pages + this OAuth method to work smoothly) and push this project to
it — e.g. via GitHub Desktop, or:
```
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Fix the two placeholders that reference your repo name
- In `vite.config.ts`, change `base: '/REPO_NAME/'` to `base: '/YOUR_REPO/'`
  (must match your repo name exactly, with leading and trailing slashes).
- In `admin/config.yml`, change `repo: REPLACE_WITH_USERNAME/REPLACE_WITH_REPO_NAME`
  to `repo: YOUR_USERNAME/YOUR_REPO`.
Commit and push these two small edits.

### 3. Turn on GitHub Pages
In your repo: **Settings → Pages → Build and deployment → Source → GitHub
Actions**. That's it — the included workflow (`.github/workflows/deploy.yml`)
will now build and publish your site on every push to `main`. Check the
**Actions** tab to watch it run; your site will appear at
`https://YOUR_USERNAME.github.io/YOUR_REPO/` a minute or two after it finishes.

### 4. Connect the login (so `/admin` knows who you are)
Decap CMS needs a way to check "is this really me" before letting anyone edit
your content. Since your site itself is hosted on GitHub Pages (not Netlify),
we use a free Netlify account for this login step only — nothing about your
actual site moves there.

1. Go to **netlify.com**, sign up free, click **Add new site → Import an
   existing project**, and connect the same GitHub repo. (Netlify will try to
   build it too — that's fine, you can ignore or delete that deployment
   later; we only need the site to exist so its login settings are usable.)
2. Note the site's URL, e.g. `https://random-name-12345.netlify.app`.
3. Go to **github.com/settings/developers → OAuth Apps → New OAuth App** and
   fill in:
   - **Homepage URL**: your Netlify site URL from step 2
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
   Click **Register application**, then **Generate a new client secret**.
   Keep this tab open.
4. Back in Netlify: **Site configuration → General → Access & security →
   OAuth → Install provider → GitHub**, and paste in the Client ID and
   Client Secret from step 3.
5. In `admin/config.yml`, change `base_url:` to your Netlify site URL from
   step 2. Commit and push.

### 5. Log in and start posting
Visit `https://YOUR_USERNAME.github.io/YOUR_REPO/admin/`, click **Login with
GitHub**, approve access, and you'll see a dashboard with **Notes**, **Blog
Posts**, **Quizzes**, **Videos**, and **Subjects & Levels** — click any one,
fill in the form, hit **Publish**, and your live site updates automatically.

## Everyday use
That's it from here on — no more setup. Just go to the `/admin/` URL, log in,
and write. Ignore everything above unless something breaks.

## If something looks broken
- **Site shows a blank page after deploying**: almost always the `base` in
  `vite.config.ts` doesn't match your repo name exactly. Double check it.
- **Admin page says login failed**: double-check the callback URL in your
  GitHub OAuth App is exactly `https://api.netlify.com/auth/done`, and that
  the `base_url` in `admin/config.yml` matches your Netlify site URL exactly
  (including `https://`, no trailing slash).
- **A new note/blog doesn't show the right subject**: the "Subject ID" field
  must exactly match an ID from the Subjects & Levels collection (lowercase,
  no spaces, e.g. `microeconomics`).
