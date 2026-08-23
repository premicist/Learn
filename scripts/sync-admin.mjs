import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const sourceDir = path.join(root, 'admin')
const publicDir = path.join(root, 'public', 'admin')

mkdirSync(publicDir, { recursive: true })
for (const file of ['config.yml', 'index.html']) {
  copyFileSync(path.join(sourceDir, file), path.join(publicDir, file))
}

console.log('Synchronized CMS files into public/admin/.')
