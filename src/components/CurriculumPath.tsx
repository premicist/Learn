import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import type { Note } from '../data/content'
import type { Curriculum, CurriculumChapterLink, CurriculumLesson, CurriculumResourceType, CurriculumUnit } from '../data/curriculum'
import { useLessonProgress } from '../utils/useLessonProgress'

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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function hasLinkedResource(lesson: CurriculumLesson) {
  return Boolean(lesson.resourceType && lesson.resourceId)
}

function resourcePath(lesson: CurriculumLesson) {
  if (!hasLinkedResource(lesson)) return null
  return `/${resourceCollections[lesson.resourceType!]}/${lesson.resourceId}`
}

function parseUnitDisplay(unit: CurriculumUnit) {
  const match = unit.title.match(/^(?:Unit\s+)?(\d+(?:\.\d+)?)\s*:\s*(.+)$/i)
  if (match) {
    const num = match[1]
    const cleanTitle = match[2].trim()
    return {
      marker: num,
      eyebrow: unit.unitGroup ? `Sub-unit ${num}` : `Unit ${num}`,
      title: cleanTitle,
    }
  }

  const cleanTitle = unit.title.replace(/^Unit\s+\d+\s*:\s*/i, '').trim()
  return {
    marker: String(unit.order).padStart(2, '0'),
    eyebrow: unit.unitGroup ? 'Sub-unit' : `Unit ${unit.order}`,
    title: cleanTitle,
  }
}

function getChapterLinks(curriculum: Curriculum, units: Curriculum['units']) {
  const titles = curriculum.syllabusChapters
    ?.split(',')
    ?.map((title) => title.trim())
    ?.filter(Boolean) || []
  const chapterLinks = Array.isArray(curriculum.syllabusChapterLinks) ? curriculum.syllabusChapterLinks : []
  
  if (titles.length > 0) {
    return titles.map((title) => {
      const configured = chapterLinks.find((link: CurriculumChapterLink) => link.title.trim().toLowerCase() === title.toLowerCase())
      const unit = units.find((candidate) => candidate.id === configured?.unitId || candidate.title.trim().toLowerCase() === title.toLowerCase() || candidate.unitGroup?.trim().toLowerCase() === title.toLowerCase())
      return { title, url: configured?.url, unit, group: unit?.unitGroup === title ? title : undefined }
    })
  }

  if (chapterLinks.length > 0) {
    return chapterLinks.map((link) => {
      const unit = units.find((candidate) => candidate.id === link.unitId || candidate.title.trim().toLowerCase() === link.title.trim().toLowerCase() || candidate.unitGroup?.trim().toLowerCase() === link.title.trim().toLowerCase())
      return { title: link.title, url: link.url, unit, group: unit?.unitGroup === link.title ? link.title : undefined }
    })
  }

  const uniqueGroupsOrTitles = Array.from(new Set(units.map((unit) => unit.unitGroup || unit.title)))
  return uniqueGroupsOrTitles.map((title) => {
    const unit = units.find((candidate) => (candidate.unitGroup && candidate.unitGroup === title) || candidate.title === title)
    return { title, url: undefined as string | undefined, unit, group: unit?.unitGroup === title ? title : undefined }
  })
}

function addAssignedNotesToUnits(units: CurriculumUnit[], notes: Note[]) {
  const notesByUnit = new Map<string, Note[]>()
  notes.forEach((note) => {
    if (!note.unitId) return
    const assigned = notesByUnit.get(note.unitId) || []
    assigned.push(note)
    notesByUnit.set(note.unitId, assigned)
  })
  return units.map((unit) => {
    const existingNoteIds = new Set(unit.lessons.filter((lesson) => lesson.resourceType === 'note' && lesson.resourceId).map((lesson) => lesson.resourceId))
    const assignedLessons = (notesByUnit.get(unit.id) || [])
      .filter((note) => !existingNoteIds.has(note.id))
      .map((note) => ({
        id: `${unit.id}-${note.id}`,
        title: note.title,
        resourceType: 'note' as const,
        resourceId: note.id,
        estimatedMinutes: 15,
        description: note.summary,
      }))
    return assignedLessons.length > 0 ? { ...unit, lessons: [...unit.lessons, ...assignedLessons] } : unit
  })
}

function CurriculumPath({ curriculum, notes = [] }: { curriculum: Curriculum; notes?: Note[] }) {
  const { isCompleted, toggleLesson, getUnitProgress } = useLessonProgress()
  const orderedUnits = useMemo(() => addAssignedNotesToUnits([...curriculum.units].sort((a, b) => a.order - b.order), notes), [curriculum.units, notes])
  const chapters = useMemo(() => getChapterLinks(curriculum, orderedUnits), [curriculum, orderedUnits])
  const groupedUnits = useMemo(() => {
    const groups: { groupName?: string; units: CurriculumUnit[] }[] = []
    orderedUnits.forEach((unit) => {
      const lastGroup = groups[groups.length - 1]
      if (lastGroup && lastGroup.groupName === unit.unitGroup) {
        lastGroup.units.push(unit)
      } else {
        groups.push({
          groupName: unit.unitGroup,
          units: [unit],
        })
      }
    })
    return groups
  }, [orderedUnits])
  const [openUnitId, setOpenUnitId] = useState<string | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (!hash) return
      
      const unitMatch = hash.match(/^#curriculum-unit-(.+)$/)
      if (unitMatch && unitMatch[1]) {
        setOpenUnitId(unitMatch[1])
        setTimeout(() => {
          const el = document.getElementById(`curriculum-unit-${unitMatch[1]}`)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 60)
        return
      }

      const groupMatch = hash.match(/^#curriculum-unit-group-(.+)$/)
      if (groupMatch && groupMatch[1]) {
        const groupSlug = groupMatch[1]
        const matchingGroup = groupedUnits.find((g) => g.groupName && slugify(g.groupName) === groupSlug)
        if (matchingGroup && matchingGroup.units[0]) {
          setOpenUnitId(matchingGroup.units[0].id)
        }
        setTimeout(() => {
          const el = document.getElementById(`curriculum-unit-group-${groupSlug}`)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 60)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [groupedUnits])

  function toggleUnit(unitId: string) {
    setOpenUnitId((current) => {
      const next = current === unitId ? null : unitId
      if (next) {
        setTimeout(() => {
          const el = document.getElementById(`curriculum-unit-${unitId}`)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 50)
      }
      return next
    })
  }

  function handleChapterClick(chapter: { unit?: CurriculumUnit; group?: string }) {
    if (chapter.group) {
      const matchingGroup = groupedUnits.find((g) => g.groupName === chapter.group)
      if (matchingGroup && matchingGroup.units[0]) {
        setOpenUnitId(matchingGroup.units[0].id)
      }
      setTimeout(() => {
        const el = document.getElementById(`curriculum-unit-group-${slugify(chapter.group!)}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
      return
    }

    if (chapter.unit) {
      setOpenUnitId(chapter.unit.id)
      setTimeout(() => {
        const el = document.getElementById(`curriculum-unit-${chapter.unit?.id}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    }
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
            const href = chapter.url || (chapter.group ? `#curriculum-unit-group-${slugify(chapter.group)}` : chapter.unit ? `#curriculum-unit-${chapter.unit.id}` : '#curriculum-path-heading')
            return (
              <a
                className="curriculum-chapter"
                href={href}
                key={`${chapter.title}-${href}`}
                onClick={() => handleChapterClick(chapter)}
              >
                <span className="curriculum-chapter__dot" aria-hidden="true" />
                <span>{chapter.title}</span>
              </a>
            )
          })}
        </nav>
      )}

      <div className="curriculum-units">
        {groupedUnits.map((group, groupIndex) => (
          <div
            className={`curriculum-unit-group ${group.groupName ? 'has-group' : ''}`}
            id={group.groupName ? `curriculum-unit-group-${slugify(group.groupName)}` : undefined}
            key={group.groupName || `group-${groupIndex}`}
          >
            {group.groupName && (
              <header className="curriculum-unit-group__header">
                <h3 className="curriculum-unit-group__title">{group.groupName}</h3>
              </header>
            )}
            <div className="curriculum-unit-group__units">
              {group.units.map((unit) => {
                const isOpen = openUnitId === unit.id
                const unitProgress = getUnitProgress(unit.lessons.map((l) => l.id))
                const { marker, eyebrow, title } = parseUnitDisplay(unit)
                return (
                  <article className={`curriculum-unit ${isOpen ? 'is-open' : ''}`} id={`curriculum-unit-${unit.id}`} key={unit.id}>
                    <button
                      type="button"
                      className="curriculum-unit__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`curriculum-unit-panel-${unit.id}`}
                      onClick={() => toggleUnit(unit.id)}
                    >
                      <span className="curriculum-unit__marker" aria-hidden="true">{marker}</span>
                      <span className="curriculum-unit__trigger-copy">
                        <span className="eyebrow">{eyebrow}</span>
                        <strong>{title}</strong>
                      </span>
                      {unitProgress.total > 0 && (
                        <span className="curriculum-unit__progress-pill" title={`${unitProgress.completed} of ${unitProgress.total} lessons completed`}>
                          {unitProgress.completed}/{unitProgress.total} done ({unitProgress.percent}%)
                        </span>
                      )}
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
                          {unit.lessons.map((lesson) => {
                            const path = resourcePath(lesson)
                            const metaType = lesson.resourceType ? resourceLabels[lesson.resourceType] : 'Coming soon'
                            const done = isCompleted(lesson.id)
                            const checkButton = (
                              <button
                                type="button"
                                className={`curriculum-lesson__check ${done ? 'is-checked' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleLesson(lesson.id)
                                }}
                                aria-label={done ? 'Mark lesson incomplete' : 'Mark lesson complete'}
                                title={done ? 'Completed' : 'Mark Complete'}
                              >
                                {done ? '✓' : ''}
                              </button>
                            )
                            const body = (
                              <>
                                <span className="curriculum-lesson__body">
                                  <span className="curriculum-lesson__meta">
                                    <span>{metaType}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{lesson.estimatedMinutes} min</span>
                                  </span>
                                  <strong>{lesson.title}</strong>
                                  <span>{lesson.description}</span>
                                </span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                  {checkButton}
                                  <span className="curriculum-lesson__link">
                                    {path ? <>Open <span aria-hidden="true">→</span></> : 'Coming soon'}
                                  </span>
                                </span>
                              </>
                            )
                            if (path) {
                              return (
                                <Link className="curriculum-lesson" to={path} key={lesson.id}>
                                  {body}
                                </Link>
                              )
                            }
                            return (
                              <div className="curriculum-lesson curriculum-lesson--pending" key={lesson.id} aria-disabled="true">
                                {body}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CurriculumPath
