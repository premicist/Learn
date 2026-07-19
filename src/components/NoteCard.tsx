import { useState } from 'react'
import { Link } from 'react-router'
import type { Note } from '../data/content'
import type { Subject } from '../data/levels'

type NoteCardProps = {
  note: Note
  subject?: Subject
  showSubjectTag?: boolean
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function NoteCard({ note, subject, showSubjectTag = true }: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article className="note-card">
      <button
        type="button"
        className="note-card__header"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {note.image ? (
          <img className="note-card__image" src={note.image} alt="" />
        ) : (
          <div
            className="note-card__image note-card__image--placeholder"
            style={{ backgroundColor: subject?.color || 'var(--teal)' }}
          >
            <span>{note.title.charAt(0)}</span>
          </div>
        )}
        <div className="note-card__body">
          <span className="note-card__date">{formatDate(note.date)}</span>
          <h3>{note.title}</h3>
          <p className="note-card__summary">{note.summary}</p>
        </div>
      </button>

      {isOpen && (
        <div className="note-card__expanded">
          <p>{note.body}</p>
        </div>
      )}

      {showSubjectTag && subject && (
        <Link to={`/subjects/${subject.id}`} className="note-card__tag">
          {subject.title}
        </Link>
      )}
    </article>
  )
}

export default NoteCard
