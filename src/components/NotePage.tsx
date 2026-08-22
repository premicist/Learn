import { Link, useParams } from 'react-router'
import { notes } from '../data/content'
import { getSubjectById } from '../data/levels'
import NoteMarkdown from '../components/NoteMarkdown'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function NotePage() {
  const { noteId } = useParams()
  const note = notes.find((n) => n.id === noteId)

  if (!note) {
    return (
      <section>
        <p className="empty-state">This note couldn't be found.</p>
        <Link to="/notes" className="back-link">
          ← Back to notes
        </Link>
      </section>
    )
  }

  const subject = getSubjectById(note.subjectId)

  return (
    <article className="note-page">
      {note.image ? (
        <img className="note-page__image" src={note.image} alt="" />
      ) : (
        <div
          className="note-page__image note-page__image--placeholder"
          style={{ backgroundColor: subject?.color || 'var(--teal)' }}
        >
          <span>{note.title.charAt(0)}</span>
        </div>
      )}

      <section className="note-page__content">
        <div className="note-page__meta">
          <span className="note-page__date">{formatDate(note.date)}</span>
          {subject && (
            <Link to={`/subjects/${subject.id}`} className="note-page__subject">
              {subject.title}
            </Link>
          )}
        </div>
        <h1>{note.title}</h1>
        <p className="note-page__summary">{note.summary}</p>

        <div className="note-page__body">
          <NoteMarkdown content={note.body} />
        </div>

        <Link to="/notes" className="back-link">
          ← Back to all notes
        </Link>
      </section>
    </article>
  )
}

export default NotePage
