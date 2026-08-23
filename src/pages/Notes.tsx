import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { notes as allNotes } from '../data/content'
import { levels, subjects, getSubjectById, getSubjectsByLevel } from '../data/levels'
import NoteCard from '../components/NoteCard'
import Seo from '../components/Seo'

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
        const searchable = `${note.title} ${note.summary} ${note.body}`.toLowerCase()
        if (subjectId && note.subjectId !== subjectId) return false
        if (levelId && subject?.levelId !== levelId) return false
        if (kw && !searchable.includes(kw)) return false
        return true
      })
      .sort(byDateDesc)
  }, [keyword, levelId, subjectId])

  function clearSearch() {
    setKeyword('')
    setLevelId('')
    setSubjectId('')
  }

  return (
    <section>
      <Seo
        title="Economics notes | Prem Pokhrel"
        description="Searchable economics notes for Class 11 and 12, bachelor’s, and master’s level study."
      />
      <span className="eyebrow">Every note, one place</span>
      <h2>Notes</h2>
      <p>Browse by level and subject below, or search titles, summaries, and note bodies.</p>

      <div className="content-filters" aria-label="Filter notes">
        <label>
          <span>Search notes</span>
          <input
            type="search"
            placeholder="Search notes by keyword…"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>
        <label>
          <span>Level</span>
          <select value={levelId} onChange={(event) => { setLevelId(event.target.value); setSubjectId('') }}>
            <option value="">All levels</option>
            {levels.map((level) => <option key={level.id} value={level.id}>{level.shortTitle}</option>)}
          </select>
        </label>
        <label>
          <span>Subject</span>
          <select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
            <option value="">All subjects</option>
            {availableSubjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
          </select>
        </label>
      </div>

      {isSearching ? (
        <div className="notes-search-results">
          <div className="filter-summary">
            <span>{searchResults.length} note{searchResults.length === 1 ? '' : 's'} found</span>
            <button type="button" className="text-button" onClick={clearSearch}>Clear filters</button>
          </div>
          {searchResults.length === 0 ? (
            <div className="no-results">
              <p className="empty-state">No notes match those filters.</p>
              <p className="no-results__prompt">Don&apos;t see what you&apos;re looking for?</p>
              <a
                href="https://forms.gle/fwU1Fyxs3RKVEHxT7"
                target="_blank"
                rel="noopener noreferrer"
                className="no-results__cta"
              >
                Request a note on this topic →
              </a>
            </div>
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
            (subject) => allNotes.some((note) => note.subjectId === subject.id),
          )
          if (levelSubjects.length === 0) return null

          return (
            <div className="level-group" key={level.id}>
              <h3 className="level-group__title">{level.title}</h3>
              {levelSubjects.map((subject) => {
                const subjectNotes = allNotes
                  .filter((note) => note.subjectId === subject.id)
                  .sort(byDateDesc)
                  .slice(0, 3)

                return (
                  <div className="subject-notes-section" key={subject.id}>
                    <div className="subject-notes-section__header">
                      <span className="subject-notes-section__bar" style={{ backgroundColor: subject.color }} />
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
