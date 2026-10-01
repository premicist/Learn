#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// generate-slides.mjs — AI-powered slide YAML generator for notes
// Uses Google Gemini to read a note's markdown and produce structured slides
// that render perfectly (dedicated table, formula, bullets, steps layouts).
//
// Usage:
//   node scripts/generate-slides.mjs content/notes/class11-elasticity-consumer.md
//   node scripts/generate-slides.mjs --all              # process every note
//   node scripts/generate-slides.mjs --all --overwrite  # overwrite existing slides
//
// Prerequisites:
//   1. Copy .env.example to .env and paste your Gemini API key
//   2. npm install (dotenv is already available or the script reads .env itself)
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = path.resolve(import.meta.dirname, '..')

// ── Load .env manually (no external dependency) ────────────────────────────

function loadEnv() {
  try {
    const envPath = path.join(root, '.env')
    const lines = readFileSync(envPath, 'utf8').split(/\r?\n/)
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIndex = trimmed.indexOf('=')
      if (eqIndex === -1) continue
      const key = trimmed.slice(0, eqIndex).trim()
      const value = trimmed.slice(eqIndex + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // .env file not found — rely on environment variables
  }
}
loadEnv()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
  console.error('❌  GEMINI_API_KEY not set. Copy .env.example → .env and paste your key.')
  console.error('   Get a key free at: https://aistudio.google.com/apikey')
  process.exit(1)
}

// ── Gemini API call ────────────────────────────────────────────────────────

const GEMINI_MODEL = 'gemini-2.0-flash'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

async function callGemini(prompt) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  }

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini API ${res.status}: ${errText}`)
  }

  const json = await res.json()
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty Gemini response')
  return text
}

// ── Prompt engineering ─────────────────────────────────────────────────────

function buildPrompt(noteTitle, noteSummary, noteBody) {
  return `You are a professional slide-deck designer for an economics education website.

Given this note, generate a structured slide deck as a JSON array of slide objects.

## Note Title
${noteTitle}

## Note Summary
${noteSummary}

## Note Body (Markdown)
${noteBody}

## Slide Layouts Available

Each slide must have a "layout" field. Choose the best layout for the content:

1. **hero** — Title slide. Use for the very first slide.
   Fields: layout, title, eyebrow, badge, points (1 item — the summary)

2. **concept** — Core concept with bullet points.
   Fields: layout, title, eyebrow, badge, points (2-5 items)

3. **bullets** — Simple bullet list (shorter items).
   Fields: layout, title, eyebrow, badge, points (3-6 items)

4. **table** — Data comparison in a clean table. USE THIS for any comparisons, data, classifications, types, categories.
   Fields: layout, title, eyebrow, badge, table: { headers: [...], rows: [[...], ...] }, note (optional footnote)

5. **formula** — Mathematical formula with explanation.
   Fields: layout, title, eyebrow, badge, formula (LaTeX string WITHOUT $$ delimiters), points (explanations), note (optional)

6. **steps** — Numbered step-by-step process.
   Fields: layout, title, eyebrow, badge, points (each is a step)

7. **comparison** — Comparing two or more things.
   Fields: layout, title, eyebrow, badge, points (each is a comparison point)

8. **exam** — Exam-focused questions or high-yield points.
   Fields: layout, title, eyebrow, badge, points (exam tips or Q&A)

9. **recap** — Summary/conclusion slide. Use for the last slide.
   Fields: layout, title, eyebrow, badge, points (key takeaways)

## Rules

1. Generate 8-20 slides depending on note length.
2. FIRST slide must be layout "hero" with the note title and summary.
3. LAST slide must be layout "recap" with 3-5 key takeaways.
4. When the note has tables or comparisons, ALWAYS use layout "table" — never try to render tables as bullet points.
5. When the note has formulas, use layout "formula" with clean LaTeX (no $$ delimiters).
6. Keep each point concise (under 120 characters when possible).
7. Use eyebrow for section context (e.g., "Elasticity", "Consumer Theory").
8. Use badge for slide type hints (e.g., "📊 Data Breakdown", "📐 Key Formula", "💡 Core Concept").
9. For table cells, you can use **bold** markdown. Keep cells short.
10. Do NOT include markdown code blocks, images, or links in slide content.

## Output Format

Return ONLY a JSON array of slide objects. Nothing else.
Example:
[
  {
    "layout": "hero",
    "title": "Elasticity & Consumer Behaviour",
    "eyebrow": "Unit 2 • Microeconomics",
    "badge": "📘 Chapter Foundation",
    "points": ["Understand responsiveness, utility, consumer choice, and consumer surplus."]
  },
  {
    "layout": "table",
    "title": "Types of Elasticity",
    "eyebrow": "Price Elasticity of Demand",
    "badge": "📊 Data Breakdown",
    "table": {
      "headers": ["Type", "|Ed|", "Example"],
      "rows": [
        ["Elastic", "> 1", "Luxury goods"],
        ["Inelastic", "< 1", "Necessities"],
        ["Unit elastic", "= 1", "Borderline goods"]
      ]
    },
    "note": "Ed is always negative; we use absolute value for classification."
  },
  {
    "layout": "formula",
    "title": "Price Elasticity of Demand",
    "eyebrow": "Elasticity Formulas",
    "badge": "📐 Key Formula",
    "formula": "E_d = \\\\frac{\\\\text{\\\\% change in } Q_d}{\\\\text{\\\\% change in } P}",
    "points": ["The sign is negative because price and quantity move in opposite directions.", "Focus on absolute value for classification."]
  }
]`
}

// ── Process a single note ──────────────────────────────────────────────────

async function processNote(filePath, overwrite = false) {
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  // Skip if slides already exist and not overwriting
  if (Array.isArray(data.slides) && data.slides.length > 0 && !overwrite) {
    console.log(`⏭️  ${path.basename(filePath)} — already has ${data.slides.length} slides (use --overwrite)`)
    return { skipped: true }
  }

  const title = data.title || path.basename(filePath, '.md')
  const summary = data.summary || ''

  console.log(`🤖 Generating slides for: ${title}`)

  const prompt = buildPrompt(title, summary, content.trim())
  const jsonText = await callGemini(prompt)

  let slides
  try {
    slides = JSON.parse(jsonText)
  } catch {
    // Try extracting JSON from markdown code block
    const match = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
    if (match) {
      slides = JSON.parse(match[1])
    } else {
      throw new Error(`Failed to parse Gemini response as JSON:\n${jsonText.slice(0, 500)}`)
    }
  }

  if (!Array.isArray(slides) || slides.length === 0) {
    throw new Error('Gemini returned empty or invalid slides array')
  }

  // Sanitize slides
  const cleanSlides = slides.map((s) => {
    const slide = { layout: s.layout || 'concept', title: s.title || '' }
    if (s.eyebrow) slide.eyebrow = s.eyebrow
    if (s.badge) slide.badge = s.badge
    if (Array.isArray(s.points) && s.points.length > 0) slide.points = s.points.map(String)
    if (s.table && Array.isArray(s.table.headers)) {
      slide.table = {
        headers: s.table.headers.map(String),
        rows: (s.table.rows || []).map((r) => (Array.isArray(r) ? r.map(String) : [])),
      }
    }
    if (s.formula) slide.formula = String(s.formula)
    if (s.note) slide.note = String(s.note)
    return slide
  })

  // Write back to frontmatter
  data.slides = cleanSlides
  data.slidesEnabled = true

  const newContent = matter.stringify(content, data)
  writeFileSync(filePath, newContent, 'utf8')

  console.log(`✅ ${path.basename(filePath)} — ${cleanSlides.length} slides generated and saved`)
  return { slides: cleanSlides.length }
}

// ── CLI entrypoint ─────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const overwrite = args.includes('--overwrite')
  const processAll = args.includes('--all')
  const files = args.filter((a) => !a.startsWith('--'))

  if (!processAll && files.length === 0) {
    console.log(`
📽️  AI Slide Generator — Powered by Gemini

Usage:
  node scripts/generate-slides.mjs <note-file.md>     Generate slides for one note
  node scripts/generate-slides.mjs --all              Generate for all notes (skips existing)
  node scripts/generate-slides.mjs --all --overwrite  Regenerate all (overwrites existing slides)

Prerequisites:
  1. Copy .env.example → .env
  2. Paste your Gemini API key (free at https://aistudio.google.com/apikey)
`)
    process.exit(0)
  }

  let notePaths = []

  if (processAll) {
    const notesDir = path.join(root, 'content', 'notes')
    notePaths = readdirSync(notesDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.join(notesDir, f))
    console.log(`\n📂 Found ${notePaths.length} notes to process\n`)
  } else {
    notePaths = files.map((f) => path.resolve(f))
  }

  let generated = 0
  let skipped = 0
  let failed = 0

  for (const filePath of notePaths) {
    try {
      const result = await processNote(filePath, overwrite)
      if (result.skipped) skipped++
      else generated++
    } catch (error) {
      console.error(`❌ ${path.basename(filePath)}: ${error.message}`)
      failed++
    }

    // Rate limit: 1 second between calls
    if (notePaths.length > 1) {
      await new Promise((r) => setTimeout(r, 1200))
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`✅ Generated: ${generated}  ⏭️ Skipped: ${skipped}  ❌ Failed: ${failed}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
