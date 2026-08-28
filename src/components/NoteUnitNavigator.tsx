import { useEffect, useState } from 'react'
import type { CurriculumUnit } from '../data/curriculum'

type NoteHeading = {
  title: string
  id: string
}

type NoteUnitNavigatorProps = {
  unit: CurriculumUnit
  headings: NoteHeading[]
}

function NoteUnitNavigator({ unit, headings }: NoteUnitNavigatorProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id || '')

  useEffect(() => {
    const updateActiveHeading = () => {
      const current = headings.reduce<NoteHeading | undefined>((visible, heading) => {
        const element = document.getElementById(heading.id)
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.35) return heading
        return visible
      }, undefined)
      setActiveId(current?.id || headings[0]?.id || '')
    }

    updateActiveHeading()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    window.addEventListener('resize', updateActiveHeading)
    return () => {
      window.removeEventListener('scroll', updateActiveHeading)
      window.removeEventListener('resize', updateActiveHeading)
    }
  }, [headings])

  return (
    <details className="note-unit-navigator" open>
      <summary>
        <span className="note-unit-navigator__eyebrow">Unit {unit.order}</span>
        <strong>{unit.title}</strong>
      </summary>
      <div className="note-unit-navigator__panel">
        <p>{unit.summary}</p>
        <ol>
          {headings.map((heading, index) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`} className={heading.id === activeId ? 'is-active' : undefined} aria-current={heading.id === activeId ? 'location' : undefined}>
                <span>{unit.order}.{index + 1}</span>
                <strong>{heading.title}</strong>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </details>
  )
}

export default NoteUnitNavigator
