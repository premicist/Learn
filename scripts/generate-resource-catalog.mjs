import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const COLLECTIONS = [
  ['note', 'notes'],
  ['blog', 'blogs'],
  ['quiz', 'quizzes'],
  ['video', 'videos'],
]

export function generateResourceCatalog(root = path.resolve(import.meta.dirname, '..')) {
  const contentRoot = path.join(root, 'content')
  const resources = []

  for (const [type, collection] of COLLECTIONS) {
    const directory = path.join(contentRoot, collection)
    if (!existsSync(directory)) continue
    for (const file of readdirSync(directory).filter((entry) => entry.endsWith('.md')).sort()) {
      const filePath = path.join(directory, file)
      const parsed = matter(readFileSync(filePath, 'utf8'))
      resources.push({
        id: file.replace(/\.md$/, ''),
        type,
        title: String(parsed.data.title || file.replace(/\.md$/, '')),
        subjectId: parsed.data.subjectId || '',
        summary: String(parsed.data.summary || parsed.data.excerpt || parsed.data.description || ''),
        date: parsed.data.date || '',
      })
    }
  }

  const outputDirectory = path.join(root, 'public', 'admin')
  mkdirSync(outputDirectory, { recursive: true })
  const outputPath = path.join(outputDirectory, 'resource-catalog.json')
  writeFileSync(outputPath, `${JSON.stringify(resources, null, 2)}\n`, 'utf8')
  console.log(`Generated CMS resource catalog with ${resources.length} item(s).`)
  return resources
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.url.replace('file://', ''))) {
  generateResourceCatalog()
}
