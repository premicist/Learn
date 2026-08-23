import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import type { Curriculum, CurriculumLesson, CurriculumResourceType } from '../data/curriculum'

const resourceLabels: Record<CurriculumResourceType, string> = {
  note: 'Note',
  blog: 'Blog',
  quiz: 'Quiz',
  video: 'Video',
}

const resourceCollections: Record<CurriculumResourceType, string> = {
  note: 'notes',
  blog: 'blogs',
  quiz: 'quizzes',
  video: 'videos',
}

function resourcePath(lesson: CurriculumLesson) {
  return `/${resourceCollections[lesson.resourceType]}/${lesson.resourceId}`
}

function readCompletedLessons(storageKey: string) {
  if (typeof window === 'undefined') return []
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
    return Array.isArray(saved) && saved.every((item) => typeof item === 'string') ? saved : []
  } catch {
    return []
  }
}

function CurriculumPath({ curriculum }: { curriculum: Curriculum }) {
  const storageKey = `learn.curriculum.${curriculum.id}`
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => readCompletedLessons(storageKey))
  const orderedUnits = useMemo(() => [...curriculum.units].sort((a, b) => a.order - b.order), [curriculum.units])
  const allLessons = useMemo(() => orderedUnits.flatMap((unit) => unit.lessons), [orderedUnits])
  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons])
  const nextLesson = allLessons.find((lesson) => !completedSet.has(lesson.id))
  const completedCount = allLessons.filter((lesson) => completedSet.has(lesson.id)).length
  const progress = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completedLessons))
  }, [completedLessons, storageKey])

  function toggleLesson(lessonId: string) {
    setCompletedLessons((current) => current.includes(lessonId) ? current.filter((id) => id !== lessonId) : [...current, lessonId])
  }

  return (
    <section className="curriculum-path" aria-labelledby="curriculum-path-heading">
      <div className="curriculum-path__header">
        <div>
          <p className="eyebrow">Guided study path</p>
          <h2 id="curriculum-path-heading">{curriculum.title}</h2>
          <p>{curriculum.description}</p>
          <p className="curriculum-path__syllabus">{curriculum.syllabusNote}</p>
        </div>
        <div className="curriculum-path__progress" aria-label={`${completedCount} of ${allLessons.length} lessons complete`}>
          <strong>{progress}%</strong>
          <span>{completedCount} of {allLessons.length} complete</span>
        </div>
      </div>

      <div className="curriculum-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {nextLesson ? (
        <div className="curriculum-next">
          <div>
            <span className="curriculum-next__label">Recommended next</span>
            <strong>{nextLesson.title}</strong>
          </div>
          <Link className="hero-cta curriculum-next__link" to={resourcePath(nextLesson)}>Continue</Link>
        </div>
      ) : (
        <div className="curriculum-complete">
          <strong>Path complete.</strong>
          <span>Review any unit or revisit the resources that need another pass.</span>
        </div>
      )}

      <div className="curriculum-units">
        {orderedUnits.map((unit) => {
          const unitCompleted = unit.lessons.filter((lesson) => completedSet.has(lesson.id)).length
          return (
            <article className="curriculum-unit" key={unit.id}>
              <div className="curriculum-unit__marker" style={{ backgroundColor: 'var(--teal)' }}>{String(unit.order).padStart(2, '0')}</div>
              <div className="curriculum-unit__content">
                <div className="curriculum-unit__topline">
                  <div>
                    <p className="eyebrow">Unit {unit.order}</p>
                    <h3>{unit.title}</h3>
                  </div>
                  <span className="curriculum-unit__time">{unit.estimatedMinutes} min · {unitCompleted}/{unit.lessons.length}</span>
                </div>
                <p className="curriculum-unit__summary">{unit.summary}</p>
                <div className="curriculum-unit__outcomes">
                  <strong>By the end, you can:</strong>
                  <ul>
                    {unit.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                  </ul>
                </div>
                <div className="curriculum-lessons">
                  {unit.lessons.map((lesson) => {
                    const complete = completedSet.has(lesson.id)
                    const recommended = nextLesson?.id === lesson.id
                    return (
                      <div className={`curriculum-lesson ${complete ? 'is-complete' : ''} ${recommended ? 'is-recommended' : ''}`} key={lesson.id}>
                        <label className="curriculum-lesson__check">
                          <input type="checkbox" checked={complete} onChange={() => toggleLesson(lesson.id)} />
                          <span className="sr-only">Mark {lesson.title} complete</span>
                        </label>
                        <div className="curriculum-lesson__body">
                          <div className="curriculum-lesson__meta">
                            <span>{resourceLabels[lesson.resourceType]}</span>
                            <span aria-hidden="true">·</span>
                            <span>{lesson.estimatedMinutes} min</span>
                            {recommended && <span className="curriculum-lesson__recommended">Next</span>}
                          </div>
                          <strong>{lesson.title}</strong>
                          <p>{lesson.description}</p>
                        </div>
                        <Link className="curriculum-lesson__link" to={resourcePath(lesson)}>{complete ? 'Review' : 'Open'}</Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default CurriculumPath
