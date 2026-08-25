import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Note } from '../data/content'
import { buildNoteSlides } from '../utils/noteSlides'
import NoteMarkdown from './NoteMarkdown'
import NoteVisualBlock from './NoteVisualBlock'

type NoteSlideViewerProps = {
  note: Note
}

function NoteSlideViewer({ note }: NoteSlideViewerProps) {
  const [open, setOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const slides = buildNoteSlides(note)
  const slide = slides[slideIndex]

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') setSlideIndex((current) => Math.min(slides.length - 1, current + 1))
      if (event.key === 'ArrowLeft') setSlideIndex((current) => Math.max(0, current - 1))
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.setTimeout(() => triggerRef.current?.focus(), 0)
    }
  }, [open, slides.length])

  if (!note.slidesEnabled || slides.length === 0) return null

  const previousSlide = () => setSlideIndex((current) => Math.max(0, current - 1))
  const nextSlide = () => setSlideIndex((current) => Math.min(slides.length - 1, current + 1))

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="note-slide-trigger"
        onClick={() => {
          setSlideIndex(0)
          setOpen(true)
        }}
      >
        <span aria-hidden="true">▣</span> View in slides
      </button>

      {open && createPortal(
        <div className="note-slide-viewer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <section
            ref={dialogRef}
            className="note-slide-viewer__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-slide-viewer-title"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return
              const endX = event.changedTouches[0]?.clientX ?? touchStartX.current
              const delta = endX - touchStartX.current
              if (Math.abs(delta) > 45) {
                if (delta < 0) nextSlide()
                else previousSlide()
              }
              touchStartX.current = null
            }}
          >
            <header className="note-slide-viewer__header">
              <span className="note-slide-viewer__label">{slide.eyebrow}</span>
              <span className="note-slide-viewer__counter">Slide {slideIndex + 1} of {slides.length}</span>
              <button ref={closeButtonRef} type="button" className="note-slide-viewer__close" onClick={() => setOpen(false)} aria-label="Close slide viewer">×</button>
            </header>

            <div className="note-slide-viewer__progress" aria-hidden="true">
              <span style={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }} />
            </div>

            <div className={`note-slide ${slide.mode === 'recap' ? 'note-slide--recap' : ''}`}>
              <p className="note-slide__eyebrow">{note.title}</p>
              <h2 id="note-slide-viewer-title">{slide.title}</h2>
              {slide.points.length > 0 && <div className="note-slide__points">
                {slide.points.map((point, index) => (
                  <div className="note-slide__point" key={`${slide.title}-${index}`}>
                    <NoteMarkdown content={point} />
                  </div>
                ))}
              </div>}
              {slide.visual && <NoteVisualBlock block={slide.visual} showTitle={false} />}
            </div>

            <footer className="note-slide-viewer__footer">
              <button type="button" className="note-slide-viewer__nav" onClick={previousSlide} disabled={slideIndex === 0}>← Previous</button>
              <span className="note-slide-viewer__hint">Swipe or use ← →</span>
              <button type="button" className="note-slide-viewer__nav note-slide-viewer__nav--next" onClick={nextSlide} disabled={slideIndex === slides.length - 1}>Next →</button>
            </footer>
          </section>
        </div>,
        document.body,
      )}
    </>
  )
}

export default NoteSlideViewer
