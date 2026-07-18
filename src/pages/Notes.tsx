import { useState } from 'react'
import { Link } from 'react-router'
import { notes } from '../data/content'
import { getSubjectById } from '../data/levels'

function Notes() {
  const [openNoteId, setOpenNoteId] = useState<string | null>(null)

  return (
    <section>
      <h2>Notes</h2>
      <p>Browse study notes across every subject, or open a subject page for a focused view.</p>

      <div className="notes-list">
        {notes.map((note) => {
          const subject = getSubjectById(note.subjectId)
          return (
            <div className="note-item" key={note.id}>
              <button
                type="button"
                className="note-item__header"
                onClick={() => setOpenNoteId(openNoteId === note.id ? null : note.id)}
              >
                <span>{note.title}</span>
                <span>{openNoteId === note.id ? '−' : '+'}</span>
              </button>
              <p className="note-item__summary">{note.summary}</p>
              {openNoteId === note.id && <p className="note-item__body">{note.body}</p>}
              {subject && (
                <Link to={`/subjects/${subject.id}`} className="note-item__tag">
                  {subject.title}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Notes
