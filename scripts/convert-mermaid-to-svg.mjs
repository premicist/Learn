#!/usr/bin/env node
/**
 * Convert Mermaid diagrams to static SVG files.
 *
 * Why: Mermaid renders diagrams at runtime with JavaScript, which causes slow
 * page loads and broken text wrapping on mobile. Static SVGs render instantly,
 * scale perfectly at any screen size, and need no JS on the page.
 *
 * How: jsdom cannot do real text layout (SVG getBBox is missing), so diagrams
 * produced there get wrong dimensions. We therefore render with a real browser
 * engine (headless Microsoft Edge / Chrome), which computes true node sizes and
 * a true viewBox, then save the SVG output to disk.
 *
 * Usage: node scripts/convert-mermaid-to-svg.mjs
 */

import fs, { promises as fsp } from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath, pathToFileURL } from 'url'
import { execFile } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const contentDir = path.join(rootDir, 'content')
const flowchartsDir = path.join(rootDir, 'public', 'flowcharts')
const tmpHtmlPath = path.join(__dirname, '.mermaid-render.html')

const BROWSER_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
]

function findBrowser() {
  return BROWSER_CANDIDATES.find((p) => fs.existsSync(p)) || null
}

function extractMermaidBlocks(content) {
  const regex = /```mermaid[ \t]*\r?\n([\s\S]*?)\r?\n```[ \t]*(?:\r?\n|$)/g
  const blocks = []
  let match
  while ((match = regex.exec(content)) !== null) {
    blocks.push({ code: match[1].trim(), fullMatch: match[0] })
  }
  return blocks
}

function detectEol(content) {
  return content.includes('\r\n') ? '\r\n' : '\n'
}

function sanitizeName(str) {
  return String(str)
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function frontmatterField(content, field) {
  const match = content.match(new RegExp(`^${field}:[ \\t]*(.+)$`, 'm'))
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : null
}

async function collectMarkdown(dir) {
  const out = []
  let entries = []
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await collectMarkdown(full)))
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

function buildHtml(diagrams) {
  const payload = JSON.stringify(diagrams)
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>mermaid static render</title>
<style>
  body { margin: 0; font-family: sans-serif; background: #ffffff; }
  #out { font-size: 12px; }
</style>
</head>
<body>
<div id="out"></div>
<script src="../node_modules/mermaid/dist/mermaid.min.js"></script>
<script>
  var diagrams = ${payload};
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    fontFamily: "'Noto Sans Devanagari', 'Segoe UI', system-ui, sans-serif",
    fontSize: 16,
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      curve: 'basis',
      nodeSpacing: 45,
      rankSpacing: 55,
      padding: 16,
      wrappingWidth: 260
    }
  });
  (function () {
    function emit(id, svg) {
      var s = document.createElement('script');
      s.type = 'text/plain';
      s.id = 'svg_' + id;
      s.textContent = svg;
      document.getElementById('out').appendChild(s);
    }
    function emitError(id, message) {
      var s = document.createElement('script');
      s.type = 'text/plain';
      s.id = 'err_' + id;
      s.textContent = message;
      document.getElementById('out').appendChild(s);
    }
    var queue = diagrams.slice();
    function next() {
      if (queue.length === 0) {
        document.body.setAttribute('data-done', '1');
        return;
      }
      var d = queue.shift();
      var renderId = 'm' + d.id;
      Promise.resolve()
        .then(function () { return mermaid.render(renderId, d.code); })
        .then(function (res) { emit(d.id, res.svg); })
        .catch(function (e) { emitError(d.id, (e && e.message) || String(e)); })
        .then(next);
    }
    next();
  })();
</script>
</body>
</html>
`
}

function runBrowser(browserPath, htmlPath) {
  return new Promise((resolve, reject) => {
    const profileDir = path.join(os.tmpdir(), 'mermaid-svg-render-profile')
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--disable-extensions',
      '--allow-file-access-from-files',
      `--user-data-dir=${profileDir}`,
      '--dump-dom',
      '--virtual-time-budget=600000',
      pathToFileURL(htmlPath).href,
    ]
    execFile(
      browserPath,
      args,
      { maxBuffer: 1024 * 1024 * 1024, timeout: 10 * 60 * 1000 },
      (error, stdout) => {
        if (error && !stdout) {
          reject(new Error(`Browser failed: ${error.message}`))
          return
        }
        resolve(stdout || '')
      },
    )
  })
}

function parseRenderedSvgs(domHtml) {
  const results = new Map()
  const errors = new Map()
  const svgRe = /<script type="text\/plain" id="svg_(m?\d+)">([\s\S]*?)<\/script>/g
  let m
  while ((m = svgRe.exec(domHtml)) !== null) {
    results.set(m[1], m[2])
  }
  const errRe = /<script type="text\/plain" id="err_(m?\d+)">([\s\S]*?)<\/script>/g
  while ((m = errRe.exec(domHtml)) !== null) {
    errors.set(m[1], m[2])
  }
  return { results, errors }
}

function rewriteRootTag(tag, width, height) {
  let t = tag
  // Mermaid sets style="max-width: Npx" for fluid diagrams. Convert it into a
  // real intrinsic size so the SVG behaves like a normal image when used in <img>.
  t = t.replace(/\s+style="max-width:[^"]*"/, '')
  if (width && height) {
    if (/\swidth="[^"]*"/.test(t)) t = t.replace(/\swidth="[^"]*"/, ` width="${width}"`)
    else t = t.replace(/^<svg\b/, `<svg width="${width}"`)
    if (/\sheight="[^"]*"/.test(t)) t = t.replace(/\sheight="[^"]*"/, ` height="${height}"`)
    else t = t.replace(/^<svg\b/, `<svg height="${height}"`)
  }
  return t
}

function finalizeSvg(svg) {
  const out = svg.trim()
  const openTagMatch = out.match(/<svg\b[^>]*>/)
  if (!openTagMatch) return out
  const originalTag = openTagMatch[0]

  let width = null
  let height = null
  const vb = originalTag.match(/viewBox="([^"]*)"/)
  if (vb) {
    const parts = vb[1].trim().split(/\s+/).map(Number)
    if (parts.length === 4 && parts.every((n) => Number.isFinite(n))) {
      width = Math.ceil(parts[2])
      height = Math.ceil(parts[3])
    }
  }

  // NOTE: the <style> block must be kept. Mermaid applies theme fills and
  // strokes to nodes through CSS rules, not inline attributes, so removing it
  // would make every box render black.
  const newTag = rewriteRootTag(originalTag, width, height)
  return (newTag + out.slice(originalTag.length)).trim()
}

async function main() {
  const browser = findBrowser()
  if (!browser) {
    console.error(
      'No supported browser found.\nInstall Microsoft Edge or Google Chrome, then re-run:\n  node scripts/convert-mermaid-to-svg.mjs',
    )
    process.exitCode = 1
    return
  }
  console.log(`Using browser: ${browser}`)

  const mdFiles = await collectMarkdown(contentDir)
  console.log(`Scanning ${mdFiles.length} markdown files...\n`)

  const jobs = []
  for (const filePath of mdFiles) {
    const content = await fsp.readFile(filePath, 'utf8')
    const blocks = extractMermaidBlocks(content)
    if (blocks.length === 0) continue

    const subjectRaw = frontmatterField(content, 'subjectId') || 'general'
    const subjectId = sanitizeName(subjectRaw)
    const noteId = sanitizeName(path.basename(filePath, '.md'))

    blocks.forEach((block, index) => {
      jobs.push({
        id: String(jobs.length),
        code: block.code,
        filePath,
        subjectId,
        noteId,
        index,
        svgName: `${noteId}-diagram-${index + 1}.svg`,
      })
    })
  }

  console.log(`Found ${jobs.length} Mermaid diagrams to convert.\n`)

  const byFile = new Map()
  for (const job of jobs) {
    if (!byFile.has(job.filePath)) byFile.set(job.filePath, [])
    byFile.get(job.filePath).push(job)
  }
  const rendered = new Map()

  const BATCH_SIZE = 30
  const batches = []
  for (let i = 0; i < jobs.length; i += BATCH_SIZE) batches.push(jobs.slice(i, i + BATCH_SIZE))

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b]
    process.stdout.write(`Rendering batch ${b + 1}/${batches.length} (${batch.length} diagrams)... `)
    const html = buildHtml(batch.map((j) => ({ id: j.id, code: j.code })))
    await fsp.writeFile(tmpHtmlPath, html, 'utf8')
    const domHtml = await runBrowser(browser, tmpHtmlPath)
    const { results, errors } = parseRenderedSvgs(domHtml)

    for (const job of batch) {
      const svg = results.get(job.id)
      if (svg) {
        rendered.set(`${job.filePath}::${job.index}`, finalizeSvg(svg))
      } else {
        const reason = errors.get(job.id) || 'no SVG returned by renderer'
        console.error(`\n  ! ${job.noteId} diagram ${job.index + 1}: ${reason}`)
      }
    }
    console.log('done')
  }

  try {
    await fsp.unlink(tmpHtmlPath)
  } catch {
    /* ignore */
  }

  await fsp.mkdir(flowchartsDir, { recursive: true })

  let written = 0
  let failed = 0
  for (const job of jobs) {
    const svg = rendered.get(`${job.filePath}::${job.index}`)
    if (!svg) {
      failed++
      continue
    }
    const dir = path.join(flowchartsDir, job.subjectId)
    await fsp.mkdir(dir, { recursive: true })
    await fsp.writeFile(path.join(dir, job.svgName), svg, 'utf8')
    written++
  }

  let patchedFiles = 0
  for (const [filePath, fileJobs] of byFile) {
    let content = await fsp.readFile(filePath, 'utf8')
    const eol = detectEol(content)
    const blocks = extractMermaidBlocks(content)
    let changed = false
    for (let i = 0; i < blocks.length; i++) {
      const job = fileJobs[i]
      if (!job) continue
      if (!rendered.has(`${filePath}::${i}`)) continue
      const alt = job.noteId.replace(/-/g, ' ')
      const relPath = `/flowcharts/${job.subjectId}/${job.svgName}`
      const imgTag = `![${alt} diagram ${i + 1}](${relPath})`
      content = content.replace(blocks[i].fullMatch, `${imgTag}${eol}`)
      changed = true
    }
    if (changed) {
      await fsp.writeFile(filePath, content, 'utf8')
      patchedFiles++
    }
  }

  console.log('')
  console.log('--------------------------------------------------')
  console.log(`Diagrams found      : ${jobs.length}`)
  console.log(`SVGs written        : ${written}`)
  console.log(`Failed to render    : ${failed}`)
  console.log(`Markdown files wired: ${patchedFiles}`)
  console.log(`Output folder       : public/flowcharts/`)
  console.log('--------------------------------------------------')

  if (failed > 0) {
    console.log('\nRe-run after fixing the notes listed above. Diagrams that failed')
    console.log('keep their original ```mermaid blocks in the markdown.')
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})