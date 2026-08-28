import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import type { Curriculum, CurriculumChapterLink, CurriculumLesson, CurriculumResourceType } from '../data/curriculum'

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

function getChapterLinks(curriculum: Curriculum, units: Curriculum['units']) {
  const titles = curriculum.syllabusChapters
    .split(',')
    .map((title) => title.trim())
    .filter(Boolean)
  const chapterLinks = Array.isArray(curriculum.syllabusChapterLinks) ? curriculum.syllabusChapterLinks : []
  const displayTitles = titles.length > 0
    ? titles
    : chapterLinks.length > 0
      ? chapterLinks.map((link) => link.title).filter(Boolean)
      : units.map((unit) => unit.title)

  return displayTitles.map((title) => {
    const configured = chapterLinks.find((link: CurriculumChapterLink) => link.title.trim().toLowerCase() === title.toLowerCase())
    const unit = units.find((candidate) => candidate.id === configured?.unitId || candidate.title.trim().toLowerCase() === title.toLowerCase())
    return { title, url: configured?.url, unit }
  })
}

function CurriculumPath({ curriculum }: { curriculum: Curriculum }) {
  const orderedUnits = useMemo(() => [...curriculum.units].sort((a, b) => a.order - b.order), [curriculum.units])
  const chapters = useMemo(() => getChapterLinks(curriculum, orderedUnits), [curriculum, orderedUnits])
  const [openUnitId, setOpenUnitId] = useState<string | null>(null)

  function toggleUnit(unitId: string) {
    setOpenUnitId((current) => current === unitId ? null : unitId)
  }

  return (
    <section className="curriculum-path" aria-labelledby="curriculum-path-heading">
      <div className="curriculum-path__header">
        <div>
          <p className="eyebrow">Syllabus chapters</p>
          <h2 id="curriculum-path-heading">{curriculum.title}</h2>
          <p>{curriculum.description}</p>
          <p className="curriculum-path__syllabus">{curriculum.syllabusNote}</p>
        </div>
      </div>

      {chapters.length > 0 && (
        <nav className="curriculum-chapters" aria-label={`${curriculum.title} chapters`}>
          {chapters.map((chapter) => {
            const href = chapter.url || (chapter.unit ? `#curriculum-unit-${chapter.unit.id}` : '#curriculum-path-heading')
            return (
              <a className="curriculum-chapter" href={href} key={`${chapter.title}-${href}`}>
                <span className="curriculum-chapter__dot" aria-hidden="true" />
                <span>{chapter.title}</span>
              </a>
            )
          })}
        </nav>
      )}

      <div className="curriculum-units">
        {orderedUnits.map((unit) => {
          const isOpen = openUnitId === unit.id
          return (
            <article className={`curriculum-unit ${isOpen ? 'is-open' : ''}`} id={`curriculum-unit-${unit.id}`} key={unit.id}>
              <button
                type="button"
                className="curriculum-unit__trigger"
                aria-expanded={isOpen}
                aria-controls={`curriculum-unit-panel-${unit.id}`}
                onClick={() => toggleUnit(unit.id)}
              >
                <span className="curriculum-unit__marker" aria-hidden="true">{String(unit.order).padStart(2, '0')}</span>
                <span className="curriculum-unit__trigger-copy">
                  <span className="eyebrow">Unit {unit.order}</span>
                  <strong>{unit.title}</strong>
                </span>
                <span className="curriculum-unit__toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="curriculum-unit__panel" id={`curriculum-unit-panel-${unit.id}`}>
                  <p className="curriculum-unit__summary">{unit.summary}</p>
                  {unit.outcomes.length > 0 && (
                    <div className="curriculum-unit__outcomes">
                      <strong>By the end, you can:</strong>
                      <ul>
                        {unit.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                      </ul>
                    </div>
                  )}
                  <div className="curriculum-lessons">
                    {unit.lessons.map((lesson) => (
                      <Link className="curriculum-lesson" to={resourcePath(lesson)} key={lesson.id}>
                        <span className="curriculum-lesson__body">
                          <span className="curriculum-lesson__meta">
                            <span>{resourceLabels[lesson.resourceType]}</span>
                            <span aria-hidden="true">·</span>
                            <span>{lesson.estimatedMinutes} min</span>
                          </span>
                          <strong>{lesson.title}</strong>
                          <span>{lesson.description}</span>
                        </span>
                        <span className="curriculum-lesson__link">Open <span aria-hidden="true">→</span></span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default CurriculumPath
