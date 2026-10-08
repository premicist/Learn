import { useState, useEffect, useRef, useId, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type DiagramCardProps = {
  title?: string
  badge?: string
  caption?: string
  children: ReactNode
  rawSvg?: string
  imageSrc?: string
  alt?: string
  className?: string
}

function cleanTitle(raw?: string): string {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (!trimmed) return ''
  // If alt looks like a filename/path, clean it up
  const withoutExt = trimmed.replace(/\.(svg|png|jpg|webp)$/i, '')
  const humanized = withoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\b(diagram|flowchart)\s*\d*\b/gi, '')
    .trim()
  if (!humanized) return trimmed
  // Capitalize words
  return humanized
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function DiagramCard({
  title,
  badge = 'Flowchart',
  caption,
  children,
  rawSvg,
  imageSrc,
  alt,
  className = '',
}: DiagramCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const cardId = useId().replace(/:/g, '')

  const displayTitle = title || cleanTitle(alt) || 'Visual Model'

  // Update scroll states for responsive overflowing indicators
  const updateScrollState = () => {
    const el = viewportRef.current
    if (!el) return
    const isOverflowing = el.scrollWidth > el.clientWidth + 4
    setHasOverflow(isOverflowing)
    setCanScrollLeft(el.scrollLeft > 6)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6)
  }

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    updateScrollState()
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(el)
    window.addEventListener('resize', updateScrollState)
    el.addEventListener('scroll', updateScrollState, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScrollState)
      el.removeEventListener('scroll', updateScrollState)
    }
  }, [children, rawSvg, imageSrc])

  // Handle modal keyboard, wheel zoom, and body overflow locking
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === '+' || e.key === '=') setZoomLevel((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))
      if (e.key === '-' || e.key === '_') setZoomLevel((z) => Math.max(0.6, Number((z - 0.25).toFixed(2))))
      if (e.key === '0') setZoomLevel(1)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleOpen = () => {
    setZoomLevel(1)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setZoomLevel(1)
  }

  const handleWheelZoom = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.15 : -0.15
      setZoomLevel((z) => Math.min(2.5, Math.max(0.6, Number((z + delta).toFixed(2)))))
    }
  }

  const handleDoubleTap = () => {
    setZoomLevel((z) => (z === 1 ? 1.75 : 1))
  }

  return (
    <>
      <figure
        className={`diagram-card ${canScrollLeft ? 'diagram-card--can-scroll-left' : ''} ${canScrollRight ? 'diagram-card--can-scroll-right' : ''} ${className}`.trim()}
        data-inline-content="true"
        aria-labelledby={`${cardId}-title`}
      >
        <div className="diagram-card__header">
          <div className="diagram-card__header-info">
            <span className="diagram-card__badge">{badge}</span>
            <h4 id={`${cardId}-title`} className="diagram-card__title">
              {displayTitle}
            </h4>
          </div>
          <div className="diagram-card__actions">
            {hasOverflow && (
              <span className="diagram-card__hint" aria-hidden="true">
                ↔ Pan
              </span>
            )}
            <button
              type="button"
              className="diagram-card__expand-btn"
              onClick={handleOpen}
              aria-label={`Expand diagram: ${displayTitle}`}
              title="View fullscreen"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h6v6" />
                <path d="M9 21H3v-6" />
                <path d="M21 3l-7 7" />
                <path d="M3 21l7-7" />
              </svg>
              <span>Expand</span>
            </button>
          </div>
        </div>

        <div className="diagram-card__viewport" ref={viewportRef}>
          <div className="diagram-card__canvas">
            {children}
          </div>
        </div>

        {caption && (
          <figcaption className="diagram-card__footer">
            <p>{caption}</p>
          </figcaption>
        )}
      </figure>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="diagram-modal"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          <div
            className="diagram-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${cardId}-modal-title`}
          >
            <div className="diagram-modal__header">
              <div className="diagram-modal__title-group">
                <span className="diagram-card__badge">{badge}</span>
                <h3 id={`${cardId}-modal-title`}>{displayTitle}</h3>
              </div>
              <div className="diagram-modal__controls">
                <div className="diagram-modal__zoom-group" role="group" aria-label="Zoom controls">
                  <button
                    type="button"
                    className="diagram-modal__btn"
                    onClick={() => setZoomLevel((z) => Math.max(0.6, Number((z - 0.25).toFixed(2))))}
                    aria-label="Zoom out"
                    disabled={zoomLevel <= 0.6}
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="diagram-modal__btn diagram-modal__btn--reset"
                    onClick={() => setZoomLevel(1)}
                    aria-label="Reset zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    className="diagram-modal__btn"
                    onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
                    aria-label="Zoom in"
                    disabled={zoomLevel >= 2.5}
                  >
                    +
                  </button>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="diagram-modal__close-btn"
                  onClick={handleClose}
                  aria-label="Close fullscreen view"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="diagram-modal__body" onWheel={handleWheelZoom}>
              <div
                className="diagram-modal__canvas"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                onDoubleClick={handleDoubleTap}
              >
                {rawSvg ? (
                  <div
                    className="diagram-modal__svg-wrap"
                    dangerouslySetInnerHTML={{ __html: rawSvg }}
                  />
                ) : imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={alt || displayTitle}
                    className="diagram-modal__img"
                  />
                ) : (
                  children
                )}
              </div>
            </div>

            {caption && (
              <div className="diagram-modal__footer">
                <p>{caption}</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
