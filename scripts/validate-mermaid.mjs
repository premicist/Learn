// Parses every ```mermaid fence under /content with the real Mermaid parser, so a
// broken diagram fails `npm run check` (and therefore CI) instead of silently
// rendering "(Diagram could not be rendered)" in the browser.
//
// The most common breakage is an UNQUOTED label that contains parentheses:
//     S1[Profit (P > SAC)]        ✗  Mermaid reads "(" as a stadium shape
//     S1["Profit (P > SAC)"]      ✓  quote the whole label
// The same rule applies to [ ] { } , : and HTML inside a label.
// Runs automatically as part of `npm run check` (see package.json).
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'

const root = path.resolve(import.meta.dirname, '..')
const contentDir = path.join(root, 'content')

const DIAGRAM_PATTERN = /^[ \t]*```mermaid[ \t]*\r?\n([\s\S]*?)^[ \t]*```/gm
const FIX_HINT = 'Quote any label containing ( ) [ ] { } , : or HTML — e.g. A["Profit (P > SAC)"]'

if (!existsSync(contentDir)) {
  console.log('Mermaid validation skipped: no /content directory found.')
  process.exit(0)
}

// Mermaid installs DOMPurify hooks at initialize time, so it needs a DOM even
// when only parsing. jsdom supplies one for Node.
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { pretendToBeVisual: true })
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.DOMParser = dom.window.DOMParser
globalThis.Node = dom.window.Node
globalThis.Element = dom.window.Element
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.SVGElement = dom.window.SVGElement
try {
  Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true })
} catch {
  // Node already exposes a read-only navigator; jsdom's window.navigator is used instead.
}

const mermaid = (await import('mermaid')).default
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' })

function findMarkdownFiles(dir) {
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...findMarkdownFiles(entryPath))
    else if (entry.name.endsWith('.md')) found.push(entryPath)
  }
  return found.sort()
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length
}

const failures = []
let diagramCount = 0

for (const filePath of findMarkdownFiles(contentDir)) {
  const raw = readFileSync(filePath, 'utf8')
  for (const match of raw.matchAll(DIAGRAM_PATTERN)) {
    diagramCount += 1
    const chart = match[1].trim()
    if (!chart) continue
    try {
      await mermaid.parse(chart)
    } catch (error) {
      const detail = String(error?.message ?? error)
      const headline = detail.split('\n').find((line) => line.trim())?.trim() ?? 'diagram failed to parse'
      const token = /got '([^']+)'/.exec(detail)
      const reason = token ? `${headline} (parser stopped at token '${token[1]}')` : headline
      failures.push(`${path.relative(root, filePath).split(path.sep).join('/')}:${lineOf(raw, match.index)} — ${reason}`)
    }
  }
}

if (failures.length > 0) {
  console.error(`Mermaid validation failed (${failures.length} of ${diagramCount} diagram(s)):\n- ${failures.join('\n- ')}`)
  console.error(`\nHint: ${FIX_HINT}`)
  process.exitCode = 1
} else {
  console.log(`Mermaid validation passed (${diagramCount} diagram(s)).`)
}
