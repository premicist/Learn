import { Link } from 'react-router'
import type { Curriculum, CurriculumLesson, CurriculumResourceType } from '../data/curriculum'

type UnitContextProps = {
  curriculum: Curriculum
  currentResourceType: CurriculumResourceType
  currentResourceId: string
  subjectTitle: string
}

const resourceCollections: Record<CurriculumResourceType, string> = {
  note: 'notes',
  blog: 'blogs',
  quiz: 'quizzes',
  video: 'videos',
}

const resourceLabels: Record<CurriculumResourceType, string> = {
  note: 'Note',
  blog: 'Blog',
  quiz: 'Quiz',
  video: 'Video',
}

function resourcePath(lesson: CurriculumLesson) {
  return `/${resourceCollections[lesson.resourceType]}/${lesson.resourceId}`
}

function UnitContext({ curriculum, currentResourceType, currentResourceId, subjectTitle }: UnitContextProps) {
  const units = [...curriculum.units].sort((a, b) => a.order - b.order)
  const sequence = units.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })))
  const currentIndex = sequence.findIndex(({ lesson }) => lesson.resourceType === currentResourceType && lesson.resourceId === currentResourceId)
  if (currentIndex < 0) return null

  const current = sequence[currentIndex]
  const previous = sequence[currentIndex - 1]
  const next = sequence[currentIndex + 1]

  return (
    <>
      <section className="unit-context" aria-labelledby="unit-context-heading">
        <div className="unit-context__header">
          <div>
            <p className="eyebrow">In this unit</p>
            <h2 id="unit-context-heading">Unit {current.unit.order}: {current.unit.title}</h2>
            <p>{current.unit.summary}</p>
          </div>
          <span className="unit-context__count">{currentIndex + 1} of {sequence.length} in path</span>
        </div>
        <div className="unit-context__lessons" aria-label={`Lessons in Unit ${current.unit.order}`}>
          {current.unit.lessons.map((lesson, lessonIndex) => {
            const isCurrent = lesson.id === current.lesson.id
            return (
              <Link
                className={`unit-context__lesson ${isCurrent ? 'is-current' : ''}`}
                to={resourcePath(lesson)}
                aria-current={isCurrent ? 'page' : undefined}
                key={lesson.id}
              >
                <span className="unit-context__lesson-number">{lessonIndex + 1}</span>
                <span className="unit-context__lesson-copy">
                  <span className="unit-context__lesson-meta">{resourceLabels[lesson.resourceType]} · {lesson.estimatedMinutes} min</span>
                  <strong>{lesson.title}</strong>
                </span>
                <span className="unit-context__lesson-state">{isCurrent ? 'You are here' : 'Open'}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {(previous || next) && (
        <aside className="related-content unit-sequence" aria-labelledby="unit-sequence-heading">
          <div className="unit-sequence__header">
            <div>
              <p className="eyebrow">Keep learning</p>
              <h2 id="unit-sequence-heading">More in {subjectTitle}</h2>
            </div>
            <span className="unit-sequence__position">Topic {currentIndex + 1} of {sequence.length}</span>
          </div>
          <div className="related-content__grid">
            {next && (
              <Link to={resourcePath(next.lesson)} className="related-content__card unit-sequence__card unit-sequence__card--next">
                <span className="unit-sequence__label">Next topic</span>
                <strong>{next.lesson.title}</strong>
                <span>{next.lesson.description}</span>
                <span className="unit-sequence__cta">Continue to {resourceLabels[next.lesson.resourceType].toLowerCase()} →</span>
              </Link>
            )}
            {previous && (
              <Link to={resourcePath(previous.lesson)} className="related-content__card unit-sequence__card">
                <span className="unit-sequence__label">Previous topic</span>
                <strong>{previous.lesson.title}</strong>
                <span>{previous.lesson.description}</span>
                <span className="unit-sequence__cta">Review {resourceLabels[previous.lesson.resourceType].toLowerCase()} →</span>
              </Link>
            )}
          </div>
        </aside>
      )}
    </>
  )
}

export default UnitContext
