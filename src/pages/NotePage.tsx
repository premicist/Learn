import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { notes } from '../data/content'
import type { Note } from '../data/content'
import { getSubjectById } from '../data/levels'
import NoteMarkdown from '../components/NoteMarkdown'
import Seo from '../components/Seo'
import { getCurriculumBySubject } from '../data/curriculum'
import UnitContext from '../components/UnitContext'
import NoteUnitNavigator from '../components/NoteUnitNavigator'
import NoteSlideViewer from '../components/NoteSlideViewer'
import DictionaryPopover from '../components/DictionaryPopover'
import AccessibilityMenu from '../components/AccessibilityMenu'
import NoteEndActions from '../components/NoteEndActions'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

function legacyVisualBlockMarkdown(block: Note['visualBlocks'][number]) {
  return ['', '```learn-' + block.type, JSON.stringify(block), '```', ''].join('\n')
}

function getNoteBody(note: Note) {
  const legacyBlocks = note.visualBlocks || []
  if (legacyBlocks.length === 0) return note.body
  return `${legacyBlocks.map(legacyVisualBlockMarkdown).join('\n')}\n${note.body}`
}

function getHeadings(content: string, selectedTitles: string[] = []) {
  const headings = content
    .split('\n')
    .map((line) => line.match(/^#{1,2}\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({ title: match[1].replace(/[*_`]/g, '').trim(), id: match[1].toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') }))
  if (selectedTitles.length === 0) return headings
  return selectedTitles
    .map((title) => headings.find((heading) => heading.title.toLowerCase() === title.trim().toLowerCase()))
    .filter((heading): heading is typeof headings[number] => Boolean(heading))
}

function NotePage() {
  const { noteId } = useParams()
  const note = notes.find((item) => item.id === noteId)
  const [isDictOpen, setIsDictOpen] = useState(false)
  const [dictQuery, setDictQuery] = useState('')
  const [dictPos, setDictPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && note) {
      try {
        localStorage.setItem('learn:lastStudiedNoteId', note.id)
        localStorage.setItem('learn:lastStudiedSubjectId', note.subjectId)
      } catch {
        // ignore localStorage errors
      }
    }
  }, [note])

  const handleTextSelection = () => {
    if (typeof window === 'undefined') return
    const selection = window.getSelection()
    const selectedText = selection ? selection.toString().trim() : ''
    if (selectedText && selectedText.length >= 2 && selectedText.length <= 50) {
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null
      const rect = range?.getBoundingClientRect()
      if (rect) {
        setDictPos({ x: rect.left + rect.width / 2, y: rect.bottom })
      } else {
        setDictPos(null)
      }
      setDictQuery(selectedText)
      setIsDictOpen(true)
    }
  }

  if (!note) {
    return (
      <section>
        <Seo title="Note not found | Prem Pokhrel" description="The requested economics note could not be found." />
        <p className="empty-state">This note couldn&apos;t be found.</p>
        <Link to="/notes" className="back-link">← Back to notes</Link>
      </section>
    )
  }

  const subject = getSubjectById(note.subjectId)
  const curriculum = getCurriculumBySubject(note.subjectId)
  const noteBody = getNoteBody(note)
  const headings = getHeadings(note.body, note.toc)
  const noteUnit = curriculum?.units.find(
    (unit) => (note.unitId && unit.id === note.unitId) || unit.lessons.some((lesson) => lesson.resourceType === 'note' && lesson.resourceId === note.id)
  )
  const relatedNotes = notes
    .filter((item) => item.subjectId === note.subjectId && item.id !== note.id)
    .slice(0, 3)

  return (
    <article className="note-page">
      <Seo title={`${note.title} | Prem Pokhrel`} description={note.summary} type="article" image={note.image || undefined} />
      {note.image && <img className="note-page__image" src={note.image} alt={note.imageAlt || ''} loading="lazy" decoding="async" />}

      <section className="note-page__content">
        <div className="note-page__meta">
          <time className="note-page__date" dateTime={note.date}>{formatDate(note.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime(note.body)}</span>
          {subject && (
            <>
              <span aria-hidden="true">·</span>
              <Link to={`/subjects/${subject.id}`} className="note-page__subject">{subject.title}</Link>
            </>
          )}
          {noteUnit && (
            <>
              <span aria-hidden="true">·</span>
              <span className="note-page__unit-tag">{noteUnit.title}</span>
            </>
          )}
        </div>
        <h1>{note.title}</h1>
        <p className="note-page__summary">{note.summary}</p>
        <NoteSlideViewer note={note} />

        {noteUnit && headings.length > 0 && <NoteUnitNavigator unit={noteUnit} headings={headings} />}

        {!noteUnit && headings.length > 0 && (
          <nav className="table-of-contents" aria-label="On this page">
            <strong>On this page</strong>
            <ol>
              {headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}
            </ol>
          </nav>
        )}

        <div
          className="note-page__body"
          onMouseUp={handleTextSelection}
          onTouchEnd={handleTextSelection}
        >
          <NoteMarkdown content={noteBody} />
        </div>

        <NoteEndActions
          noteId={note.id}
          title={note.title}
          summary={note.summary}
        />

        <DictionaryPopover
          isOpen={isDictOpen}
          initialQuery={dictQuery}
          position={dictPos}
          onClose={() => {
            setIsDictOpen(false)
            setDictQuery('')
            setDictPos(null)
          }}
        />

        {curriculum ? (
          <UnitContext curriculum={curriculum} currentResourceType="note" currentResourceId={note.id} subjectTitle={subject?.title || 'this subject'} />
        ) : relatedNotes.length > 0 && (
          <aside className="related-content" aria-labelledby="related-notes-heading">
            <h2 id="related-notes-heading">More in {subject?.title || 'this subject'}</h2>
            <div className="related-content__grid">
              {relatedNotes.map((related) => (
                <Link to={`/notes/${related.id}`} className="related-content__card" key={related.id}>
                  <strong>{related.title}</strong>
                  <span>{related.summary}</span>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <Link to="/notes" className="back-link">← Back to all notes</Link>
      </section>

      <AccessibilityMenu
        contentSelector=".note-page__body"
        contentTitle={note.title}
        noteId={note.id}
        onOpenDictionary={() => {
          setDictQuery('')
          setDictPos(null)
          setIsDictOpen(true)
        }}
      />
    </article>
  )
}

export default NotePage
