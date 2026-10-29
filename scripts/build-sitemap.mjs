import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const root = path.resolve(import.meta.dirname, '..')
const siteUrl = 'https://prempokhrel.com.np'
const contentDir = path.join(root, 'content')
const taxonomy = yaml.load(readFileSync(path.join(contentDir, 'subjects.yml'), 'utf8'))

const today = new Date().toISOString().split('T')[0]

function getFileDate(filePath) {
  try {
    return statSync(filePath).mtime.toISOString().split('T')[0]
  } catch {
    return today
  }
}

function collectionItems(collection, priority = 0.8, changefreq = 'weekly') {
  const dir = path.join(contentDir, collection)
  try {
    return readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const id = file.replace(/\.md$/, '')
        const lastmod = getFileDate(path.join(dir, file))
        return {
          route: `/${collection}/${id}`,
          lastmod,
          changefreq,
          priority,
        }
      })
  } catch {
    return []
  }
}

const entries = [
  { route: '/', lastmod: today, changefreq: 'daily', priority: 1.0 },
  { route: '/subjects', lastmod: today, changefreq: 'weekly', priority: 0.9 },
  { route: '/notes', lastmod: today, changefreq: 'daily', priority: 0.9 },
  { route: '/blogs', lastmod: today, changefreq: 'weekly', priority: 0.8 },
  { route: '/quizzes', lastmod: today, changefreq: 'weekly', priority: 0.8 },
  { route: '/videos', lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { route: '/about', lastmod: today, changefreq: 'monthly', priority: 0.5 },
  ...taxonomy.levels.map((level) => ({
    route: `/levels/${level.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.8,
  })),
  ...taxonomy.subjects.map((subject) => ({
    route: `/subjects/${subject.id}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 0.85,
  })),
  ...collectionItems('notes', 0.8, 'weekly'),
  ...collectionItems('blogs', 0.7, 'monthly'),
  ...collectionItems('quizzes', 0.7, 'weekly'),
  ...collectionItems('videos', 0.6, 'monthly'),
]

const urls = entries
  .map(
    (e) => `  <url>
    <loc>${siteUrl}${e.route}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap)
console.log(`Generated sitemap with ${entries.length} URLs.`)
