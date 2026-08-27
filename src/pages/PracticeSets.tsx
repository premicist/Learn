import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { practiceSets as allPracticeSets } from '../data/content'
import { levels, subjects, getSubjectById, getSubjectsByLevel } from '../data/levels'
import Seo from '../components/Seo'

function PracticeSets() {
  const [levelId, setLevelId] = useState('')
  const [subjectId, setSubjectId] = useState('')

  const availableSubjects = levelId ? getSubjectsByLevel(levelId) : subjects

  const results = useMemo(() => {
    return allPracticeSets.filter((practiceSet) => {
      const subject = getSubjectById(practiceSet.subjectId)
      if (subjectId && practiceSet.subjectId !== subjectId) return false
      if (levelId && subject?.levelId !== levelId) return false
      return true
    })
  }, [levelId, subjectId])

  return (
    <section>
      <Seo
        title="Practice sets | Prem Pokhrel"
        description="Untimed practice sets with instantly scored numerical questions and teacher-graded writing questions."
      />
      <span className="eyebrow">Work through problems at your own pace</span>
      <h2>Practice</h2>
      <p>Numerical answers are scored the moment you submit. Writing answers are saved for your teacher to grade later.</p>

      <div className="content-filters" aria-label="Filter practice sets">
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

      {results.length === 0 ? (
        <div className="no-results"><p className="empty-state">No practice sets match those filters yet.</p></div>
      ) : (
        <div className="quizzes-list">
          {results.map((practiceSet) => {
            const subject = getSubjectById(practiceSet.subjectId)
            return (
              <div className="resource-card" key={practiceSet.id}>
                <div className="resource-card__body">
                  <span className="resource-card__label">Practice set</span>
                  <h3><Link to={`/practice-sets/${practiceSet.id}`}>{practiceSet.title}</Link></h3>
                  <p>{practiceSet.questions.length} questions{subject ? ` · ${subject.title}` : ''}</p>
                  <Link to={`/practice-sets/${practiceSet.id}`} className="resource-card__action">Start →</Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default PracticeSets
