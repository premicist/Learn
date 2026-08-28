import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { practiceSets as allPracticeSets, scheduledTests } from '../data/content'
import ScheduledTestSummary from '../components/ScheduledTestSummary'
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
        title="Practice | Prem Pokhrel"
        description="Self-paced Practice Sets and occasional Scheduled Tests for economics students."
      />
      <span className="eyebrow">Self-paced practice and scheduled exams</span>
      <h2>Practice</h2>
      <p>Practice Sets are always available and untimed. Scheduled Tests appear here when a teacher publishes an exam window.</p>

      <section className="scheduled-directory" aria-labelledby="scheduled-tests-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Occasional exam-style assessment</p>
            <h3 id="scheduled-tests-heading">Scheduled Tests</h3>
          </div>
          <span className="section-heading__note">Numerical questions · top 10 results</span>
        </div>
        <div className="scheduled-directory__grid">
          {subjects.map((subject) => (
            <ScheduledTestSummary
              key={subject.id}
              subjectTitle={subject.title}
              tests={scheduledTests.filter((test) => test.subjectId === subject.id)}
            />
          ))}
        </div>
      </section>

      <section className="practice-sets-directory" aria-labelledby="practice-sets-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Always available</p>
            <h3 id="practice-sets-heading">Practice Sets</h3>
          </div>
          <span className="section-heading__note">No timer · writing answers saved for teacher review</span>
        </div>

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
        <div className="no-results"><p className="empty-state">No Practice Sets match those filters yet.</p></div>
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
    </section>
  )
}

export default PracticeSets
