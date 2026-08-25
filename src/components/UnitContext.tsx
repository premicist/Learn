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

function SequenceLink({
  direction,
  item,
  resourceType,
}: {
  direction: 'previous' | 'next'
  item?: { lesson: CurriculumLesson }
  resourceType: CurriculumResourceType
}) {
  if (!item) {
    return <span className="unit-sequence-dock__item unit-sequence-dock__item--empty" aria-hidden="true" />
  }

  const isNext = direction === 'next'
  const label = isNext ? 'Next topic' : 'Previous topic'
  const action = isNext ? 'Continue to' : 'Review'

  return (
    <Link
      to={resourcePath(item.lesson)}
      className={`unit-sequence-dock__item unit-sequence-dock__item--${direction}`}
      aria-label={`${label}: ${item.lesson.title}`}
    >
      <span className="unit-sequence-dock__label">{label}</span>
      <strong>{item.lesson.title}</strong>
      <span className="unit-sequence-dock__action">{action} {resourceLabels[resourceType].toLowerCase()} <span aria-hidden="true">→</span></span>
    </Link>
  )
}

function UnitContext({ curriculum, currentResourceType, currentResourceId, subjectTitle }: UnitContextProps) {
  const units = [...curriculum.units].sort((a, b) => a.order - b.order)
  const sequence = units.flatMap((unit) => unit.lessons.map((lesson) => ({ unit, lesson })))
  const currentPathIndex = sequence.findIndex(({ lesson }) => lesson.resourceType === currentResourceType && lesson.resourceId === currentResourceId)
  if (currentPathIndex < 0) return null

  const current = sequence[currentPathIndex]
  const sameTypeSequence = sequence.filter(({ lesson }) => lesson.resourceType === currentResourceType)
  const currentIndex = sameTypeSequence.findIndex(({ lesson }) => lesson.resourceType === currentResourceType && lesson.resourceId === currentResourceId)
  const previous = sameTypeSequence[currentIndex - 1]
  const next = sameTypeSequence[currentIndex + 1]

  return (
    <>
      <section className="unit-context" aria-labelledby="unit-context-heading">
        <div className="unit-context__header">
          <div>
            <p className="eyebrow">In this unit</p>
            <h2 id="unit-context-heading">Unit {current.unit.order}: {current.unit.title}</h2>
            <p>{current.unit.summary}</p>
          </div>
          <span className="unit-context__count">Unit {current.unit.order} · {current.unit.lessons.length} resources</span>
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
        <>
          <aside className="related-content unit-sequence" aria-labelledby="unit-sequence-heading">
            <div className="unit-sequence__header">
              <div>
                <p className="eyebrow">Keep learning</p>
                <h2 id="unit-sequence-heading">More in {subjectTitle}</h2>
              </div>
              <span className="unit-sequence__position">{resourceLabels[currentResourceType]} {currentIndex + 1} of {sameTypeSequence.length}</span>
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

          <nav className="unit-sequence-dock" aria-label={`Navigate through ${resourceLabels[currentResourceType].toLowerCase()}s in ${subjectTitle}`}>
            <div className="unit-sequence-dock__inner">
              <SequenceLink direction="previous" item={previous} resourceType={currentResourceType} />
              <span className="unit-sequence-dock__progress" aria-hidden="true">{currentIndex + 1} / {sameTypeSequence.length}</span>
              <SequenceLink direction="next" item={next} resourceType={currentResourceType} />
            </div>
          </nav>
        </>
      )}
    </>
  )
}

export default UnitContext
