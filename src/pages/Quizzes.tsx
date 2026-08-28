import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { quizzes as allQuizzes } from '../data/content'
import { getSubjectById, subjects } from '../data/levels'
import SubjectPicker from '../components/SubjectPicker'
import Seo from '../components/Seo'
import { groupByTopic } from '../utils/resourceGrouping'

function readBestScores() {
  if (typeof window === 'undefined') return {}
  const entries: [string, number][] = allQuizzes.map((quiz) => [
    quiz.id,
    Number.parseInt(localStorage.getItem(`learn.quiz.${quiz.id}`) || '-1', 10),
  ])
  return Object.fromEntries(entries.filter(([, score]) => score >= 0)) as Record<string, number>
}

function Quizzes() {
  const [subjectId, setSubjectId] = useState('')
  const [topicTitle, setTopicTitle] = useState('')
  const [keyword, setKeyword] = useState('')
  const [bestScores] = useState<Record<string, number>>(readBestScores)
  const subject = subjectId ? getSubjectById(subjectId) : undefined
  const subjectQuizzes = useMemo(() => allQuizzes.filter((quiz) => quiz.subjectId === subjectId), [subjectId])
  const topicGroups = useMemo(() => groupByTopic(subjectQuizzes, 'quiz', (quiz) => quiz.topic), [subjectQuizzes])
  const selectedTopic = topicGroups.find((group) => group.title === topicTitle)
  const query = keyword.trim().toLowerCase()
  const visibleTopicGroups = topicGroups.filter((group) => !query || `${group.title} ${group.items.map((quiz) => quiz.title).join(' ')}`.toLowerCase().includes(query))
  const visibleSets = (selectedTopic?.items || []).filter((quiz) => {
    if (!query) return true
    return `${quiz.title} ${quiz.setLabel} ${quiz.format} ${quiz.questions.map((question) => question.question).join(' ')}`.toLowerCase().includes(query)
  })

  function chooseSubject(nextSubjectId: string) {
    setSubjectId(nextSubjectId)
    setTopicTitle('')
    setKeyword('')
  }

  function chooseTopic(nextTopic: string) {
    setTopicTitle(nextTopic)
    setKeyword('')
  }

  return (
    <section>
      <Seo title="Economics quizzes | Prem Pokhrel" description="Choose a subject and topic, then practise with focused economics quiz sets and instant feedback." />
      <span className="eyebrow">Recall, practise, improve</span>
      <h1>Quizzes</h1>
      <p>Choose a subject, open a topic, and select the quiz set that matches the kind of practice you need.</p>

      {!subject ? (
        <SubjectPicker subjects={subjects} resourceLabel="quiz" getCount={(id) => allQuizzes.filter((quiz) => quiz.subjectId === id).length} onSelect={chooseSubject} />
      ) : (
        <>
          <div className="discovery-breadcrumbs">
            <button type="button" onClick={() => chooseSubject('')}>All subjects</button>
            <span aria-hidden="true">/</span>
            <strong>{subject.title}</strong>
            {topicTitle && <><span aria-hidden="true">/</span><strong>{topicTitle}</strong></>}
          </div>

          <section className="discovery-header" aria-labelledby="quiz-subject-heading">
            <div>
              <p className="eyebrow">{subject.levelId}</p>
              <h2 id="quiz-subject-heading">{subject.title}</h2>
              <p>{subject.description}</p>
            </div>
            <span className="discovery-count">{subjectQuizzes.length} quiz{subjectQuizzes.length === 1 ? '' : 'zes'}</span>
          </section>

          {!topicTitle ? (
            <section className="topic-directory" aria-labelledby="quiz-topics-heading">
              <div className="discovery-section-heading">
                <div>
                  <p className="eyebrow">Choose a topic</p>
                  <h2 id="quiz-topics-heading">Topics</h2>
                </div>
              </div>
              <label className="discovery-search">
                <span>Search this subject</span>
                <input type="search" placeholder="Search by topic or quiz…" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
              </label>
              {visibleTopicGroups.length > 0 ? (
                <div className="topic-directory__grid">
                {visibleTopicGroups.map((group, index) => (
                  <button type="button" className="topic-directory__card" key={group.title} onClick={() => chooseTopic(group.title)}>
                    <span className="topic-directory__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{group.title}</strong>
                      <span>{group.items.length} quiz set{group.items.length === 1 ? '' : 's'} <span aria-hidden="true">→</span></span>
                    </span>
                  </button>
                ))}
                </div>
              ) : (
                <p className="empty-state">No quiz topics match that search.</p>
              )}
            </section>
          ) : (
            <section className="set-directory" aria-labelledby="quiz-sets-heading">
              <div className="discovery-section-heading">
                <div>
                  <p className="eyebrow">{topicTitle}</p>
                  <h2 id="quiz-sets-heading">Choose a quiz set</h2>
                </div>
                <button type="button" className="text-button" onClick={() => chooseTopic('')}>Change topic</button>
              </div>
              <label className="discovery-search">
                <span>Search this topic</span>
                <input type="search" placeholder="Search by set or question…" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
              </label>
              {visibleSets.length > 0 ? (
                <div className="set-directory__grid">
                  {visibleSets.map((quiz) => (
                    <Link to={`/quizzes/${quiz.id}`} className="set-directory__card" key={quiz.id}>
                      <span className="set-directory__card-topline"><span>{quiz.format} practice</span><span>{quiz.questions.length} questions</span></span>
                      <strong>{quiz.setLabel}</strong>
                      <span>{quiz.title}</span>
                      {bestScores[quiz.id] !== undefined && <small>Best score: {bestScores[quiz.id]} / {quiz.questions.length}</small>}
                      <span className="set-directory__action">Attempt set <span aria-hidden="true">→</span></span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No quiz sets match that search.</p>
              )}
            </section>
          )}
        </>
      )}
    </section>
  )
}

export default Quizzes
