import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Note } from '../data/content'
import NoteMarkdown from './NoteMarkdown'

type HeadingItem = {
  id: string
  title: string
}

type PrintNoteModalProps = {
  isOpen: boolean
  onClose: () => void
  note: Note
  subjectTitle?: string
  unitTitle?: string
  subUnitTitle?: string
  noteBody: string
  headings?: HeadingItem[]
  unitNotes?: Note[]
  formattedDate: string
  readingTimeStr: string
}

function legacyVisualBlockMarkdown(block: Note['visualBlocks'][number]) {
  return ['', '```learn-' + block.type, JSON.stringify(block), '```', ''].join('\n')
}

function formatNoteContent(n: Note) {
  const legacyBlocks = n.visualBlocks || []
  if (legacyBlocks.length === 0) return n.body
  return `${legacyBlocks.map(legacyVisualBlockMarkdown).join('\n')}\n${n.body}`
}

export default function PrintNoteModal({
  isOpen,
  onClose,
  note,
  subjectTitle,
  unitTitle,
  subUnitTitle,
  noteBody,
  headings = [],
  unitNotes = [],
  formattedDate,
  readingTimeStr,
}: PrintNoteModalProps) {
  const [scope, setScope] = useState<'topic' | 'unit'>('topic')

  // Lock body scrolling when modal is open on screen, handle Esc and Ctrl+P
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        handlePrint()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') return null

  const handlePrint = () => {
    if (typeof window === 'undefined') return

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    // Unconstrain overflow so the browser print engine paginates all pages
    document.body.style.overflow = 'visible'
    document.documentElement.style.overflow = 'visible'
    document.body.classList.add('is-printing-pdf')

    // Clean up any old iframe if present
    const oldFrame = document.getElementById('pdf-isolated-print-frame')
    if (oldFrame) oldFrame.remove()

    window.print()

    setTimeout(() => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.classList.remove('is-printing-pdf')
    }, 1200)
  }

  const hasMultipleUnitNotes = unitNotes.length > 1

  return createPortal(
    <div
      className="pdf-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Printable PDF Note View"
    >
      {/* ── Top Document Toolbar ── */}
      <header className="pdf-modal-toolbar">
        <div className="pdf-modal-toolbar__left">
          <span className="pdf-modal-toolbar__icon" aria-hidden="true">📄</span>
          <div className="pdf-modal-toolbar__meta">
            <span className="pdf-modal-toolbar__badge">PDF Document Note</span>
            <span className="pdf-modal-toolbar__title">
              {scope === 'unit' && unitTitle ? `${unitTitle} (Full Unit Pack)` : note.title}
            </span>
          </div>
        </div>

        {/* Scope Selector: Single Topic vs Full Unit Pack */}
        {hasMultipleUnitNotes && (
          <div className="pdf-scope-selector" role="group" aria-label="Print Scope">
            <button
              type="button"
              className={`pdf-scope-btn ${scope === 'topic' ? 'is-active' : ''}`}
              onClick={() => setScope('topic')}
              title="Show only this note / topic"
            >
              This Topic Note
            </button>
            <button
              type="button"
              className={`pdf-scope-btn ${scope === 'unit' ? 'is-active' : ''}`}
              onClick={() => setScope('unit')}
              title="Compile all lesson notes in this unit into one document"
            >
              Full Unit Pack ({unitNotes.length} Topics)
            </button>
          </div>
        )}

        <div className="pdf-modal-toolbar__right">
          <button
            type="button"
            className="pdf-btn pdf-btn--print"
            onClick={handlePrint}
            title="Print or export as complete PDF file"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print / Save as PDF</span>
          </button>

          <button
            type="button"
            className="pdf-btn pdf-btn--close"
            onClick={onClose}
            title="Close PDF view (Esc)"
            aria-label="Close PDF view"
          >
            ✕ Close
          </button>
        </div>
      </header>

      {/* ── Scrollable PDF Document Canvas ── */}
      <div
        className="pdf-modal-scroll"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <article className="pdf-sheet" id="printable-pdf-note">
          {/* ── Diagonal Watermark Overlay: (c) prempokhrel.com.np ── */}
          <div className="pdf-watermark-overlay" aria-hidden="true">
            <div className="pdf-watermark-grid">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="pdf-watermark-row">
                  <span>© prempokhrel.com.np</span>
                  <span>© prempokhrel.com.np</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── PDF Sheet Content ── */}
          <div className="pdf-sheet__content">
            {/* Academic Document Header */}
            <header className="pdf-header">
              <div className="pdf-header__top">
                <div className="pdf-header__brand">
                  <span className="pdf-header__author">Prem Pokhrel</span>
                  <span className="pdf-header__domain">• prempokhrel.com.np</span>
                </div>
                <span className="pdf-header__badge">ECONOMICS STUDY MATERIAL</span>
              </div>

              {/* Hierarchy: Subject > Unit > Sub-unit */}
              <div className="pdf-header__hierarchy">
                <div className="pdf-hierarchy-badge">
                  <span className="pdf-hierarchy-label">Subject</span>
                  <span className="pdf-hierarchy-val">{subjectTitle || 'Economics'}</span>
                </div>
                {unitTitle && (
                  <div className="pdf-hierarchy-badge">
                    <span className="pdf-hierarchy-label">Unit</span>
                    <span className="pdf-hierarchy-val">{unitTitle}</span>
                  </div>
                )}
                {scope === 'topic' && subUnitTitle && (
                  <div className="pdf-hierarchy-badge">
                    <span className="pdf-hierarchy-label">Sub-Unit</span>
                    <span className="pdf-hierarchy-val">{subUnitTitle}</span>
                  </div>
                )}
                {scope === 'unit' && (
                  <div className="pdf-hierarchy-badge">
                    <span className="pdf-hierarchy-label">Collection</span>
                    <span className="pdf-hierarchy-val">Complete Unit Course Pack</span>
                  </div>
                )}
              </div>

              <h1 className="pdf-title">
                {scope === 'unit' && unitTitle ? unitTitle : note.title}
              </h1>

              {scope === 'topic' && note.summary && (
                <p className="pdf-summary">{note.summary}</p>
              )}

              <div className="pdf-meta">
                <span><strong>Date:</strong> {formattedDate}</span>
                <span>•</span>
                <span><strong>Est. Reading:</strong> {readingTimeStr}</span>
                <span>•</span>
                <span><strong>Source:</strong> https://prempokhrel.com.np/notes/{note.id}</span>
              </div>

              {/* Table of Contents for Single Topic */}
              {scope === 'topic' && headings.length > 1 && (
                <div className="pdf-toc" aria-label="Table of Contents">
                  <div className="pdf-toc__heading">Sections &amp; Key Concepts in This Note</div>
                  <ol className="pdf-toc__list">
                    {headings.map((h, idx) => (
                      <li key={h.id}>
                        <span className="pdf-toc__idx">{idx + 1}.</span>
                        <span className="pdf-toc__label">{h.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Table of Contents for Full Unit Pack */}
              {scope === 'unit' && (
                <div className="pdf-toc" aria-label="Unit Topics Outline">
                  <div className="pdf-toc__heading">Topics Included in This Unit Pack ({unitNotes.length})</div>
                  <ol className="pdf-toc__list">
                    {unitNotes.map((un, idx) => (
                      <li key={un.id}>
                        <span className="pdf-toc__idx">{idx + 1}.</span>
                        <span className="pdf-toc__label">{un.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </header>

            {/* Featured Image (if available) */}
            {scope === 'topic' && note.image && (
              <div className="pdf-featured-image-box">
                <img
                  src={note.image}
                  alt={note.imageAlt || note.title}
                  className="pdf-featured-image"
                />
                {note.imageAlt && <p className="pdf-image-caption">{note.imageAlt}</p>}
              </div>
            )}

            {/* ── Note Content ── */}
            {scope === 'topic' ? (
              <div className="note-page__body pdf-body">
                <NoteMarkdown content={noteBody} />
              </div>
            ) : (
              <div className="pdf-unit-compilation">
                {unitNotes.map((item, itemIdx) => (
                  <section key={item.id} className="pdf-unit-topic-section">
                    <header className="pdf-unit-topic-header">
                      <span className="pdf-unit-topic-number">Topic {itemIdx + 1} of {unitNotes.length}</span>
                      <h2 className="pdf-unit-topic-title">{item.title}</h2>
                      {item.summary && <p className="pdf-summary">{item.summary}</p>}
                    </header>

                    {item.image && (
                      <div className="pdf-featured-image-box">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          className="pdf-featured-image"
                        />
                      </div>
                    )}

                    <div className="note-page__body pdf-body">
                      <NoteMarkdown content={formatNoteContent(item)} />
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Academic Document Footer */}
            <footer className="pdf-footer">
              <div className="pdf-footer__left">
                © Prem Pokhrel • Economics Learning Platform • All Rights Reserved
              </div>
              <div className="pdf-footer__right">
                https://prempokhrel.com.np
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>,
    document.body
  )
}
