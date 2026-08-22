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
  return (
    <article className="note-card">
      <Link to={`/notes/${note.id}`} className="note-card__header">
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
      </Link>

      {showSubjectTag && subject && (
        <Link to={`/subjects/${subject.id}`} className="note-card__tag">
          {subject.title}
        </Link>
      )}
    </article>
  )
}

export default NoteCard
