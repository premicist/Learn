import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Note } from '../data/content'
import { buildNoteSlides } from '../utils/noteSlides'
import NoteMarkdown from './NoteMarkdown'
import NoteVisualBlock from './NoteVisualBlock'

type NoteSlideViewerProps = {
  note: Note
}

function formatGoogleSlidesEmbedUrl(url: string): string {
  if (!url) return ''
  const clean = url.trim()
  const match = clean.match(/docs\.google\.com\/presentation\/d\/(e\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=3000`
  }
  if (clean.includes('drive.google.com/file/d/')) {
    const driveMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`
    }
  }
  return clean
}

function NoteSlideViewer({ note }: NoteSlideViewerProps) {
  const [open, setOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const hasGoogleSlides = Boolean(note.googleSlidesUrl && note.googleSlidesUrl.trim())
  const slides = hasGoogleSlides ? [] : buildNoteSlides(note)
  const hasDeckSlides = slides.length > 0

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const slide = slides[slideIndex]

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (!hasGoogleSlides && hasDeckSlides) {
        if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
          event.preventDefault()
          setSlideIndex((current) => Math.min(slides.length - 1, current + 1))
        }
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
          event.preventDefault()
          setSlideIndex((current) => Math.max(0, current - 1))
        }
        if (event.key === 'Home') {
          event.preventDefault()
          setSlideIndex(0)
        }
        if (event.key === 'End') {
          event.preventDefault()
          setSlideIndex(slides.length - 1)
        }
      }
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
  }, [open, slides.length, hasGoogleSlides, hasDeckSlides])

  if (!note.slidesEnabled && !hasGoogleSlides) return null
  if (!hasDeckSlides && !hasGoogleSlides) return null

  const previousSlide = () => setSlideIndex((current) => Math.max(0, current - 1))
  const nextSlide = () => setSlideIndex((current) => Math.min(slides.length - 1, current + 1))

  const googleEmbedUrl = formatGoogleSlidesEmbedUrl(note.googleSlidesUrl || '')

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
        title="Open presentation slides"
      >
        <span aria-hidden="true">📽️</span> View in Slide Deck {hasDeckSlides ? `(${slides.length} Slides)` : ''}
      </button>

      {open && createPortal(
        <div className="note-slide-viewer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
          <section
            ref={dialogRef}
            className={`note-slide-viewer__dialog ${hasGoogleSlides ? 'note-slide-viewer__dialog--google' : `note-slide-viewer__dialog--${slide?.layout || 'concept'}`}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-slide-viewer-title"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null || hasGoogleSlides) return
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
              <div className="note-slide-viewer__badge-group">
                {hasGoogleSlides ? (
                  <>
                    <span className="note-slide-viewer__label">{note.title}</span>
                    <span className="note-slide-viewer__tag">📊 Presentation</span>
                  </>
                ) : (
                  slide && (
                    <>
                      <span className="note-slide-viewer__label">{slide.eyebrow}</span>
                      {slide.badge && <span className="note-slide-viewer__tag">{slide.badge}</span>}
                    </>
                  )
                )}
              </div>

              {!hasGoogleSlides && hasDeckSlides && (
                <span className="note-slide-viewer__counter">Slide {slideIndex + 1} of {slides.length}</span>
              )}

              <button ref={closeButtonRef} type="button" className="note-slide-viewer__close" onClick={() => setOpen(false)} aria-label="Close slide viewer">×</button>
            </header>

            {!hasGoogleSlides && (
              <div className="note-slide-viewer__progress" aria-hidden="true">
                <span style={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }} />
              </div>
            )}

            {hasGoogleSlides && googleEmbedUrl ? (
              <div className="note-slide-viewer__google-container">
                <div className="note-slide-viewer__google-wrap">
                  <iframe
                    src={googleEmbedUrl}
                    title={`${note.title} - Presentation Slides`}
                    allowFullScreen
                    className="note-slide-viewer__google-frame"
                  />
                </div>
              </div>
            ) : (
              slide && (
                <div className={`note-slide note-slide--${slide.layout}`}>
                  <div className="note-slide__header-wrap">
                    <p className="note-slide__eyebrow">{note.title}</p>
                    <h2 id="note-slide-viewer-title">{slide.title}</h2>
                  </div>

                  {/* ── Hero layout ── */}
                  {slide.layout === 'hero' && (
                    <div className="note-slide__hero-box">
                      <div className="note-slide__hero-quote">
                        <span className="note-slide__quote-mark">"</span>
                        <NoteMarkdown content={slide.points[0] || note.summary} />
                      </div>
                      <div className="note-slide__hero-footer">
                        <span>✨ Interactive Visual Study Deck</span>
                        <span>{slides.length} Key Concept Cards</span>
                      </div>
                    </div>
                  )}

                  {/* ── Table layout ── */}
                  {slide.layout === 'table' && slide.table && (
                    <div className="note-slide__table-wrap">
                      <table className="note-slide__table">
                        <thead>
                          <tr>
                            {slide.table.headers.map((h) => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {slide.table.rows.map((row, ri) => (
                            <tr key={ri}>
                              {row.map((cell, ci) => (
                                <td key={ci}><NoteMarkdown content={cell} /></td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {slide.note && <p className="note-slide__footnote">{slide.note}</p>}
                    </div>
                  )}

                  {/* ── Formula layout ── */}
                  {slide.layout === 'formula' && slide.formula && (
                    <div className="note-slide__formula-wrap">
                      <div className="note-slide__formula-box">
                        <NoteMarkdown content={`$$${slide.formula}$$`} />
                      </div>
                      {slide.points.length > 0 && (
                        <div className="note-slide__formula-explain">
                          {slide.points.map((point, i) => (
                            <p key={i}><NoteMarkdown content={point} /></p>
                          ))}
                        </div>
                      )}
                      {slide.note && <p className="note-slide__footnote">{slide.note}</p>}
                    </div>
                  )}

                  {/* ── Points-based layouts ── */}
                  {slide.layout !== 'hero' && slide.layout !== 'table' && slide.layout !== 'formula' && slide.layout !== 'visual' && slide.points.length > 0 && (
                    <div className={`note-slide__points note-slide__points--${slide.layout}`}>
                      {slide.points.map((point, index) => (
                        <div className={`note-slide__point note-slide__point--${slide.layout}`} key={`${slide.title}-${index}`}>
                          <span className="note-slide__point-marker" aria-hidden="true">
                            {slide.layout === 'steps' ? `${index + 1}` : slide.layout === 'comparison' ? '⚖️' : slide.layout === 'exam' ? '🎯' : '•'}
                          </span>
                          <div className="note-slide__point-text">
                            <NoteMarkdown content={point} />
                          </div>
                        </div>
                      ))}
                      {slide.note && <p className="note-slide__footnote">{slide.note}</p>}
                    </div>
                  )}

                  {slide.visual && <NoteVisualBlock block={slide.visual} showTitle={false} />}
                </div>
              )
            )}

            {!hasGoogleSlides && hasDeckSlides && (
              <footer className="note-slide-viewer__footer">
                <button type="button" className="note-slide-viewer__nav" onClick={previousSlide} disabled={slideIndex === 0}>← Previous</button>
                <span className="note-slide-viewer__hint">Swipe or use Space / ← →</span>
                <button type="button" className="note-slide-viewer__nav note-slide-viewer__nav--next" onClick={nextSlide} disabled={slideIndex === slides.length - 1}>Next →</button>
              </footer>
            )}
          </section>
        </div>,
        document.body,
      )}
    </>
  )
}

export default NoteSlideViewer
