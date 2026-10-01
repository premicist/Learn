import type { ManualSlide, Note, NoteSlideControls, NoteSlideMode, NoteVisualBlock } from '../data/content'

// ─── Public types ──────────────────────────────────────────────────────────────

export type SlideLayout =
  | 'hero'
  | 'concept'
  | 'bullets'
  | 'table'
  | 'formula'
  | 'steps'
  | 'comparison'
  | 'exam'
  | 'recap'
  | 'visual'
  | 'image'

export type SlideTable = {
  headers: string[]
  rows: string[][]
}

export type NoteSlide = {
  title: string
  eyebrow: string
  badge: string
  points: string[]
  formula?: string
  table?: SlideTable
  note?: string
  mode: NoteSlideMode
  layout: SlideLayout
  visual?: NoteVisualBlock
  /** true = authored manually via slides: frontmatter */
  manual: boolean
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function cleanInline(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeSection(value: string): string {
  return cleanInline(value).toLowerCase()
}

function splitParagraphs(content: string): string[] {
  return content
    .split(/(?:\r?\n\s*){2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}

type ParsedSection = {
  title: string
  subsections: Array<{ subtitle?: string; content: string }>
}

function parseMajorSections(body: string): ParsedSection[] {
  const sections: ParsedSection[] = []
  let currentSection: ParsedSection | null = null
  let currentSub: { subtitle?: string; content: string } | null = null

  const sanitized = body.replace(/```[\s\S]*?```/g, '')

  for (const line of sanitized.split(/\r?\n/)) {
    const h2Match = line.match(/^##\s+(.+)$/)
    if (h2Match) {
      if (currentSub && currentSection) currentSection.subsections.push(currentSub)
      currentSection = { title: cleanInline(h2Match[1]), subsections: [] }
      sections.push(currentSection)
      currentSub = { content: '' }
      continue
    }
    const h3Match = line.match(/^###\s+(.+)$/)
    if (h3Match && currentSection) {
      if (currentSub && currentSub.content.trim()) currentSection.subsections.push(currentSub)
      currentSub = { subtitle: cleanInline(h3Match[1]), content: '' }
      continue
    }
    if (currentSub) {
      currentSub.content += line + '\n'
    } else if (currentSection) {
      currentSub = { content: line + '\n' }
    }
  }

  if (currentSub && currentSection && currentSub.content.trim()) {
    currentSection.subsections.push(currentSub)
  }

  return sections
}

function extractPointsFromText(text: string, mode: NoteSlideMode): string[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith('```') && !/^---+$/.test(l))

  const listItems = lines
    .filter((l) => /^[-*+]\s+/.test(l) || /^\d+[.)]\s+/.test(l) || /^\*\*\d+[.)]/.test(l))
    .map((l) => cleanInline(l.replace(/^([-*+]\s+|\d+[.)]\s+|\*\*\d+[.)]\s*|\*\*\s*)/, '')))
    .filter((l) => l.length > 3)

  if (listItems.length > 0) return listItems

  const cleanParas = splitParagraphs(text)
    .map(cleanInline)
    .filter((p) => p.length > 5 && !p.startsWith('!'))

  if (cleanParas.length > 0) {
    if (mode === 'bullets' || mode === 'recap') {
      return cleanParas.flatMap((p) => p.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 10))
    }
    return cleanParas
  }

  return []
}

function detectAutoLayout(title: string): { layout: SlideLayout; badge: string; eyebrow: string } {
  const lower = title.toLowerCase()
  if (lower.includes('comparison') || lower.includes(' vs ') || lower.includes('differences') || lower.includes('matrix')) {
    return { layout: 'comparison', badge: '⚖️ Comparative Breakdown', eyebrow: 'Side-by-Side Analysis' }
  }
  if (lower.includes('exam') || lower.includes('question') || lower.includes('review') || lower.includes('vsaq') || lower.includes('saq')) {
    return { layout: 'exam', badge: '🎯 Exam Focus & Q&A', eyebrow: 'High-Yield Exam Points' }
  }
  if (lower.includes('step') || lower.includes('process') || lower.includes('stages') || lower.includes('how')) {
    return { layout: 'steps', badge: '🔄 Step-by-Step Mechanism', eyebrow: 'Economic Process' }
  }
  if (lower.includes('summary') || lower.includes('conclusion') || lower.includes('recap') || lower.includes('cheat sheet')) {
    return { layout: 'recap', badge: '🎓 Lesson Mastery', eyebrow: 'Core Takeaways' }
  }
  return { layout: 'concept', badge: '💡 Core Principle', eyebrow: 'Essential Concept' }
}

function controlsFor(note: Note): NoteSlideControls {
  return note.slideControls || { mode: 'auto', maxPoints: 4, includeQuickCheck: true, sections: [], title: '' }
}

function manualSlideToNoteSlide(s: ManualSlide, mode: NoteSlideMode): NoteSlide {
  return {
    title: s.title || '',
    eyebrow: s.eyebrow || '',
    badge: s.badge || '',
    points: s.points || [],
    formula: s.formula,
    table: s.table,
    note: s.note,
    mode,
    layout: (s.layout as SlideLayout) || 'concept',
    manual: true,
  }
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function buildNoteSlides(note: Note): NoteSlide[] {
  const controls = controlsFor(note)
  const mode = controls.mode || 'auto'

  // Manual slides take priority — if authored, use them entirely
  if (Array.isArray(note.slides) && note.slides.length > 0) {
    return note.slides.map((s) => manualSlideToNoteSlide(s, mode))
  }

  // Auto-generate from note body
  const maxPoints = Math.min(8, Math.max(1, controls.maxPoints || 4))
  const requestedSections = new Set((controls.sections || []).map(normalizeSection).filter(Boolean))

  const slides: NoteSlide[] = [
    {
      title: controls.title || note.title,
      eyebrow: 'Lesson Overview',
      badge: '📘 Chapter Foundation',
      points: [cleanInline(note.summary)],
      mode,
      layout: 'hero',
      manual: false,
    },
  ]

  for (const visual of note.visualBlocks || []) {
    slides.push({
      title: visual.title,
      eyebrow: visual.type === 'graph' ? 'Python Visual Chart' : 'Interactive Visual Aid',
      badge: '📊 Visual Analysis',
      points: visual.explanation ? [cleanInline(visual.explanation)] : ['Analyze the key relationships and trends illustrated in this visual.'],
      mode,
      layout: 'visual',
      visual,
      manual: false,
    })
  }

  const sections = parseMajorSections(note.body).filter((section) => {
    if (requestedSections.size === 0) return true
    return requestedSections.has(normalizeSection(section.title))
  })

  for (const section of sections) {
    if (!controls.includeQuickCheck && normalizeSection(section.title).includes('quick check')) continue

    const { layout, badge, eyebrow } = detectAutoLayout(section.title)
    let sectionPoints: string[] = []

    for (const sub of section.subsections) {
      if (sub.subtitle) {
        const subPoints = extractPointsFromText(sub.content, mode)
        if (subPoints.length > 0) {
          sectionPoints.push(`**${sub.subtitle}:** ${subPoints[0]}`)
          for (let i = 1; i < subPoints.length; i++) sectionPoints.push(subPoints[i])
        }
      } else {
        sectionPoints.push(...extractPointsFromText(sub.content, mode))
      }
    }

    sectionPoints = Array.from(new Set(sectionPoints)).filter(Boolean)
    if (sectionPoints.length === 0) continue

    for (let start = 0; start < sectionPoints.length; start += maxPoints) {
      slides.push({
        title: section.title,
        eyebrow: start === 0 ? eyebrow : `${eyebrow} (Contd.)`,
        badge,
        points: sectionPoints.slice(start, start + maxPoints),
        mode,
        layout,
        manual: false,
      })
    }
  }

  return slides
}
