import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { generateResourceCatalog } from './generate-resource-catalog.mjs'

const root = path.resolve(import.meta.dirname, '..')
const sourceDir = path.join(root, 'admin')
const publicDir = path.join(root, 'public', 'admin')

mkdirSync(publicDir, { recursive: true })
generateResourceCatalog(root)
for (const file of ['config.yml', 'index.html', 'preview.css', 'guided-widgets.js', 'guided-widgets.css']) {
  copyFileSync(path.join(sourceDir, file), path.join(publicDir, file))
}

console.log('Synchronized CMS files into public/admin/.')
