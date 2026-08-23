import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const root = path.resolve(import.meta.dirname, '..')
const siteUrl = 'https://prempokhrel.com.np'
const contentDir = path.join(root, 'content')
const taxonomy = yaml.load(readFileSync(path.join(contentDir, 'subjects.yml'), 'utf8'))

function ids(collection) {
  return readdirSync(path.join(contentDir, collection))
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

const paths = [
  '/',
  '/subjects',
  '/notes',
  '/blogs',
  '/quizzes',
  '/videos',
  '/about',
  ...taxonomy.levels.map((level) => `/levels/${level.id}`),
  ...taxonomy.subjects.map((subject) => `/subjects/${subject.id}`),
  ...ids('notes').map((id) => `/notes/${id}`),
  ...ids('blogs').map((id) => `/blogs/${id}`),
]

const urls = paths.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap)
console.log(`Generated sitemap with ${paths.length} URLs.`)
