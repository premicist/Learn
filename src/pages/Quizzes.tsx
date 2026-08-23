import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { quizzes as allQuizzes } from '../data/content'
import { getSubjectById, getSubjectsByLevel, levels, subjects } from '../data/levels'
import QuizCard from '../components/QuizCard'
import Seo from '../components/Seo'

function readBestScores() {
  if (typeof window === 'undefined') return {}
  const entries: [string, number][] = allQuizzes.map((quiz) => [
    quiz.id,
    Number.parseInt(localStorage.getItem(`learn.quiz.${quiz.id}`) || '-1', 10),
  ])
  return Object.fromEntries(entries.filter(([, score]) => score >= 0)) as Record<string, number>
}

function Quizzes() {
  const [keyword, setKeyword] = useState('')
  const [levelId, setLevelId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [bestScores, setBestScores] = useState<Record<string, number>>(readBestScores)

  const availableSubjects = levelId ? getSubjectsByLevel(levelId) : subjects
  const results = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    return allQuizzes.filter((quiz) => {
      const subject = getSubjectById(quiz.subjectId)
      const searchable = `${quiz.title} ${quiz.questions.map((question) => question.question).join(' ')}`.toLowerCase()
      return (!query || searchable.includes(query))
        && (!subjectId || quiz.subjectId === subjectId)
        && (!levelId || subject?.levelId === levelId)
    })
  }, [keyword, levelId, subjectId])

  const completedCount = Object.keys(bestScores).length

  return (
    <section>
      <Seo
        title="Economics quizzes | Prem Pokhrel"
        description="Practice economics with short quizzes and instant explanations for every answer."
      />
      <span className="eyebrow">Recall, practise, improve</span>
      <h2>Quizzes</h2>
      <p>Test your understanding with short quizzes for each subject. Your best scores are saved on this device.</p>

      <div className="progress-summary" role="status">
        <strong>{completedCount} of {allQuizzes.length}</strong> quizzes attempted
      </div>

      <div className="content-filters" aria-label="Filter quizzes">
        <label>
          <span>Search quizzes</span>
          <input type="search" placeholder="Search by topic or question…" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
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

      {results.length === 0 ? (
        <div className="no-results"><p className="empty-state">No quizzes match those filters.</p></div>
      ) : (
        <div className="quizzes-list">
          {results.map((quiz) => {
            const subject = getSubjectById(quiz.subjectId)
            return (
              <div key={quiz.id}>
                <QuizCard
                  quiz={quiz}
                  onCompleted={(score) => setBestScores((previous) => ({ ...previous, [quiz.id]: Math.max(previous[quiz.id] ?? -1, score) }))}
                />
                <div className="quiz-meta-row">
                  {subject && <Link to={`/subjects/${subject.id}`} className="note-item__tag">{subject.title}</Link>}
                  {bestScores[quiz.id] !== undefined && <span>Best: {bestScores[quiz.id]} / {quiz.questions.length}</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Quizzes
