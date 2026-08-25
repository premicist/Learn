import type { Note, NoteSlideControls, NoteSlideMode } from '../data/content'

export type NoteSlide = {
  title: string
  eyebrow: string
  points: string[]
  mode: NoteSlideMode
}

function cleanInline(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\\\[|\\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeSection(value: string) {
  return cleanInline(value).toLowerCase()
}

function splitParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
}

function parseSections(body: string) {
  const sections: Array<{ title: string; blocks: string[] }> = []
  let current: { title: string; blocks: string[] } | null = null

  for (const line of body.split('\n')) {
    const heading = line.match(/^#{2,3}\s+(.+)$/)
    if (heading) {
      current = { title: cleanInline(heading[1]), blocks: [] }
      sections.push(current)
      continue
    }
    if (!current) continue
    current.blocks.push(line)
  }

  return sections.map((section) => ({
    title: section.title,
    blocks: splitParagraphs(section.blocks.join('\n')),
  }))
}

function blockToPoints(block: string, mode: NoteSlideMode) {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('```'))
    .filter((line) => !/^---+$/.test(line))

  const listItems = lines
    .filter((line) => /^[-*+]\s+/.test(line) || /^\d+[.)]\s+/.test(line))
    .map((line) => cleanInline(line.replace(/^([-*+]\s+|\d+[.)]\s+)/, '')))
    .filter(Boolean)

  if (listItems.length > 0) return listItems

  const text = cleanInline(lines.join(' '))
  if (!text) return []
  if (mode === 'bullets' || mode === 'recap') {
    return text
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)
  }
  return [text]
}

function controlsFor(note: Note): NoteSlideControls {
  return note.slideControls || {
    mode: 'auto',
    maxPoints: 4,
    includeQuickCheck: true,
    sections: [],
    title: '',
  }
}

export function buildNoteSlides(note: Note): NoteSlide[] {
  const controls = controlsFor(note)
  const mode = controls.mode || 'auto'
  const maxPoints = Math.min(6, Math.max(1, controls.maxPoints || 4))
  const requestedSections = new Set((controls.sections || []).map(normalizeSection).filter(Boolean))
  const sections = parseSections(note.body).filter((section) => {
    if (requestedSections.size === 0) return true
    return requestedSections.has(normalizeSection(section.title))
  })
  const slides: NoteSlide[] = [{
    title: controls.title || note.title,
    eyebrow: 'Quick visual review',
    points: [cleanInline(note.summary)],
    mode,
  }]

  for (const section of sections) {
    if (!controls.includeQuickCheck && normalizeSection(section.title).includes('quick check')) continue
    const points = section.blocks.flatMap((block) => blockToPoints(block, mode))
    if (points.length === 0) continue
    for (let start = 0; start < points.length; start += maxPoints) {
      slides.push({
        title: section.title,
        eyebrow: 'From this note',
        points: points.slice(start, start + maxPoints),
        mode,
      })
    }
  }

  return slides
}
