import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { notes as allNotes } from '../data/content'
import { levels, subjects, getSubjectById, getSubjectsByLevel } from '../data/levels'
import NoteCard from '../components/NoteCard'

function byDateDesc(a: { date: string }, b: { date: string }) {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

function Notes() {
  const [keyword, setKeyword] = useState('')
  const [levelId, setLevelId] = useState('')
  const [subjectId, setSubjectId] = useState('')

  const isSearching = keyword.trim() !== '' || levelId !== '' || subjectId !== ''

  const availableSubjects = levelId ? getSubjectsByLevel(levelId) : subjects

  const searchResults = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    return allNotes
      .filter((note) => {
        const subject = getSubjectById(note.subjectId)
        if (subjectId && note.subjectId !== subjectId) return false
        if (levelId && subject?.levelId !== levelId) return false
        if (kw && !note.title.toLowerCase().includes(kw) && !note.summary.toLowerCase().includes(kw)) {
          return false
        }
        return true
      })
      .sort(byDateDesc)
  }, [keyword, levelId, subjectId])

  return (
    <section>
      <span className="eyebrow">Every note, one place</span>
      <h2>Notes</h2>
      <p>Browse by level and subject below, or search for a keyword.</p>

      <div className="notes-search">
        <input
          type="text"
          className="notes-search__input"
          placeholder="Search notes by keyword…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={levelId} onChange={(e) => { setLevelId(e.target.value); setSubjectId('') }}>
          <option value="">All levels</option>
          {levels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.shortTitle}
            </option>
          ))}
        </select>
        <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          <option value="">All subjects</option>
          {availableSubjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.title}
            </option>
          ))}
        </select>
      </div>

      {isSearching ? (
        <div className="notes-search-results">
          <div className="notes-search-results__header">
            <span>
              {searchResults.length} note{searchResults.length === 1 ? '' : 's'} found
            </span>
            <button
              type="button"
              className="notes-search-clear"
              onClick={() => {
                setKeyword('')
                setLevelId('')
                setSubjectId('')
              }}
            >
              Clear search
            </button>
          </div>
          {searchResults.length === 0 ? (
            <p className="empty-state">No notes match that search yet.</p>
          ) : (
            <div className="note-card-grid">
              {searchResults.map((note) => (
                <NoteCard key={note.id} note={note} subject={getSubjectById(note.subjectId)} />
              ))}
            </div>
          )}
        </div>
      ) : (
        levels.map((level) => {
          const levelSubjects = getSubjectsByLevel(level.id).filter(
            (subject) => allNotes.some((n) => n.subjectId === subject.id),
          )
          if (levelSubjects.length === 0) return null

          return (
            <div className="level-group" key={level.id}>
              <h3 className="level-group__title">{level.title}</h3>
              {levelSubjects.map((subject) => {
                const subjectNotes = allNotes
                  .filter((n) => n.subjectId === subject.id)
                  .sort(byDateDesc)
                  .slice(0, 3)

                return (
                  <div className="subject-notes-section" key={subject.id}>
                    <div className="subject-notes-section__header">
                      <span
                        className="subject-notes-section__bar"
                        style={{ backgroundColor: subject.color }}
                      />
                      <h4>{subject.title}</h4>
                    </div>
                    <div className="note-card-grid">
                      {subjectNotes.map((note) => (
                        <NoteCard key={note.id} note={note} subject={subject} showSubjectTag={false} />
                      ))}
                    </div>
                    <Link to={`/subjects/${subject.id}`} className="see-more-link">
                      See all notes in {subject.title} →
                    </Link>
                  </div>
                )
              })}
            </div>
          )
        })
      )}
    </section>
  )
}

export default Notes
