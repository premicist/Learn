// scripts/prerender-shells.mjs
// Generates static directory shells (dist/<route>/index.html) after `vite build`.
// This guarantees that:
// 1. Direct route requests on GitHub Pages return HTTP 200 OK instead of 404.
// 2. Social bots (Facebook, X, WhatsApp, Telegram, LinkedIn) get real Open Graph
//    titles, summaries, and images without running JavaScript.
// 3. React Router immediately takes over in the browser for client navigation.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const root = path.resolve(import.meta.dirname, '..')
const distDir = path.join(root, 'dist')
const contentDir = path.join(root, 'content')
const siteUrl = 'https://prempokhrel.com.np'

if (!existsSync(distDir)) {
  console.error('prerender-shells: dist directory not found. Run vite build first.')
  process.exit(1)
}

const templateHtml = readFileSync(path.join(distDir, 'index.html'), 'utf8')

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function injectMeta(html, { title, description, url, image, type = 'website' }) {
  let result = html
  const escapedTitle = escapeHtml(title)
  const escapedDesc = escapeHtml(description)
  const escapedUrl = escapeHtml(url)

  // Replace Title
  result = result.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapedTitle}</title>`
  )

  // Replace Description
  result = result.replace(
    /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta name="description" content="${escapedDesc}" />`
  )

  // Replace Open Graph Tags
  result = result.replace(
    /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:title" content="${escapedTitle}" />`
  )
  result = result.replace(
    /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:description" content="${escapedDesc}" />`
  )

  // Inject or update og:url
  if (result.includes('og:url')) {
    result = result.replace(
      /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:url" content="${escapedUrl}" />`
    )
  } else {
    result = result.replace(
      '</head>',
      `  <meta property="og:url" content="${escapedUrl}" />\n  </head>`
    )
  }

  // Inject or update og:type
  result = result.replace(
    /<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(type)}" />`
  )

  // Inject og:image if provided
  if (image) {
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
    result = result.replace(
      '</head>',
      `  <meta property="og:image" content="${escapeHtml(fullImageUrl)}" />\n  <meta name="twitter:image" content="${escapeHtml(fullImageUrl)}" />\n  </head>`
    )
  }

  // Inject canonical link
  result = result.replace(
    '</head>',
    `  <link rel="canonical" href="${escapedUrl}" />\n  </head>`
  )

  return result
}

function writeShell(routePath, meta) {
  const cleanRoute = routePath.replace(/^\//, '').replace(/\/$/, '')
  if (!cleanRoute) return // Don't overwrite dist/index.html root

  const targetDir = path.join(distDir, cleanRoute)
  mkdirSync(targetDir, { recursive: true })

  const outputHtml = injectMeta(templateHtml, {
    ...meta,
    url: `${siteUrl}/${cleanRoute}`,
  })

  writeFileSync(path.join(targetDir, 'index.html'), outputHtml, 'utf8')
}

// 1. Process Notes
let shellCount = 0
const notesDir = path.join(contentDir, 'notes')
if (existsSync(notesDir)) {
  for (const file of readdirSync(notesDir).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(path.join(notesDir, file), 'utf8')
    const { data } = matter(raw)
    const id = file.replace(/\.md$/, '')
    writeShell(`/notes/${id}`, {
      title: `${data.title || id} — Prem Pokhrel ECON`,
      description: data.summary || `Read comprehensive study notes on ${data.title || id}.`,
      image: data.image || '',
      type: 'article',
    })
    shellCount++
  }
}

// 2. Process Blogs
const blogsDir = path.join(contentDir, 'blogs')
if (existsSync(blogsDir)) {
  for (const file of readdirSync(blogsDir).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(path.join(blogsDir, file), 'utf8')
    const { data } = matter(raw)
    const id = file.replace(/\.md$/, '')
    writeShell(`/blogs/${id}`, {
      title: `${data.title || id} — Economics Blog`,
      description: data.excerpt || `Read article on ${data.title || id}.`,
      image: data.image || '',
      type: 'article',
    })
    shellCount++
  }
}

// 3. Process Subjects & Levels
const subjectsRaw = readFileSync(path.join(contentDir, 'subjects.yml'), 'utf8')
const taxonomy = yaml.load(subjectsRaw)

for (const level of taxonomy.levels || []) {
  writeShell(`/levels/${level.id}`, {
    title: `${level.title} — Prem Pokhrel ECON`,
    description: level.description || `Economics curriculum and notes for ${level.title}.`,
    type: 'website',
  })
  shellCount++
}

for (const subject of taxonomy.subjects || []) {
  writeShell(`/subjects/${subject.id}`, {
    title: `${subject.title} — Study Materials & Units`,
    description: subject.description || `Explore guided units, notes, and quizzes for ${subject.title}.`,
    type: 'website',
  })
  shellCount++
}

// 4. Primary App Routes
const primaryRoutes = [
  { route: '/subjects', title: 'All Subjects — Prem Pokhrel ECON', description: 'Browse economics subjects from Class 11 and 12 through Bachelor’s and Master’s level.' },
  { route: '/notes', title: 'Economics Study Notes — Prem Pokhrel ECON', description: 'Comprehensive, syllabus-aligned study notes covering microeconomics, macroeconomics, and Nepalese economy.' },
  { route: '/blogs', title: 'Economics Articles & Blogs — Prem Pokhrel ECON', description: 'Insights, analysis, and contemporary discussions on economic theory and Nepal’s economy.' },
  { route: '/quizzes', title: 'Economics Quizzes & Practice — Prem Pokhrel ECON', description: 'Interactive multiple choice questions and numerical tests for economics students.' },
  { route: '/practice-sets', title: 'Practice Sets & Model Questions — Prem Pokhrel ECON', description: 'Timed practice questions and handwritten numerical exercises for exam preparation.' },
  { route: '/videos', title: 'Economics Video Lessons — Prem Pokhrel ECON', description: 'Curated video lectures explaining key economics models and calculations.' },
  { route: '/about', title: 'About Prem Pokhrel — Economics, Explained', description: 'Learn more about Prem Pokhrel and the Economics Learning Platform mission.' },
  { route: '/whiteboard', title: 'Interactive Economics Whiteboard & Diagram Studio', description: 'Free digital blackboard pre-loaded with neoclassical, Keynesian, and market equilibrium curves.' },
  { route: '/teacher', title: 'Teacher Dashboard — Prem Pokhrel ECON', description: 'Filter and export classroom student practice submissions.' },
]

for (const r of primaryRoutes) {
  writeShell(r.route, {
    title: r.title,
    description: r.description,
    type: 'website',
  })
  shellCount++
}

console.log(`Generated ${shellCount} static directory shells with route-specific Open Graph tags.`)

