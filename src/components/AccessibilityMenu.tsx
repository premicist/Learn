import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../utils/useTheme'
import { useBookmarks } from '../utils/useBookmarks'
import { useSmartboard } from '../utils/useSmartboard'

export type FontSize = 'small' | 'normal' | 'large' | 'xlarge'
export type FontFamily = 'default' | 'serif' | 'sans' | 'dyslexic'

const FONT_SIZE_STORAGE_KEY = 'learn:font-size'
const FONT_FAMILY_STORAGE_KEY = 'learn:font-family'
const ZOOM_STORAGE_KEY = 'learn:zoom'
const DOC_MODE_STORAGE_KEY = 'learn:doc-mode'

const ZOOM_LEVELS = [80, 90, 100, 110, 125, 140, 160]

type AccessibilityMenuProps = {
  contentSelector?: string
  contentTitle?: string
  noteId?: string
  onOpenDictionary?: () => void
}

export default function AccessibilityMenu({
  contentSelector = '.note-page__body, .article-page__body',
  contentTitle,
  noteId,
  onOpenDictionary,
}: AccessibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { isSmartboard, toggleSmartboard, toggleFullscreen } = useSmartboard()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sizing & styling state
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window === 'undefined') return 'normal'
    return (localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSize) || 'normal'
  })

  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    if (typeof window === 'undefined') return 'default'
    return (localStorage.getItem(FONT_FAMILY_STORAGE_KEY) as FontFamily) || 'default'
  })

  const [zoom, setZoom] = useState<number>(() => {
    if (typeof window === 'undefined') return 100
    const saved = Number(localStorage.getItem(ZOOM_STORAGE_KEY))
    return ZOOM_LEVELS.includes(saved) ? saved : 100
  })

  const [isDocMode, setIsDocMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(DOC_MODE_STORAGE_KEY) === 'true'
  })

  // Speech Synthesis (Read Aloud) state
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speechRate, setSpeechRate] = useState<number>(1)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Apply visual settings to the content container
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(contentSelector)
    targets.forEach((target) => {
      // Font size
      target.classList.remove('font-size-small', 'font-size-normal', 'font-size-large', 'font-size-xlarge')
      target.classList.add(`font-size-${fontSize}`)

      // Font family
      target.classList.remove('font-family-serif', 'font-family-sans', 'font-family-dyslexic')
      if (fontFamily !== 'default') {
        target.classList.add(`font-family-${fontFamily}`)
      }

      // Zoom
      if (zoom !== 100) {
        target.style.zoom = `${zoom}%`
      } else {
        target.style.zoom = ''
      }

      // Document mode
      if (isDocMode) {
        target.classList.add('is-document-mode')
      } else {
        target.classList.remove('is-document-mode')
      }
    })
  }, [fontSize, fontFamily, zoom, isDocMode, contentSelector])

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Keyboard navigation for accessibility modal
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Handlers
  const handleFontSize = (size: FontSize) => {
    setFontSize(size)
    try { localStorage.setItem(FONT_SIZE_STORAGE_KEY, size) } catch {}
  }

  const handleFontFamily = (family: FontFamily) => {
    setFontFamily(family)
    try { localStorage.setItem(FONT_FAMILY_STORAGE_KEY, family) } catch {}
  }

  const handleZoom = (newZoom: number) => {
    setZoom(newZoom)
    try { localStorage.setItem(ZOOM_STORAGE_KEY, String(newZoom)) } catch {}
  }

  const handleToggleDocMode = () => {
    setIsDocMode((prev) => {
      const next = !prev
      try { localStorage.setItem(DOC_MODE_STORAGE_KEY, String(next)) } catch {}
      return next
    })
  }

  // ── Speech Synthesis Controls ──
  const handlePlaySpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Speech synthesis is not supported on this browser.')
      return
    }

    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsSpeaking(true)
      return
    }

    window.speechSynthesis.cancel()

    const target = document.querySelector<HTMLElement>(contentSelector)
    if (!target) return

    const titleText = contentTitle ? `${contentTitle}. ` : ''
    const bodyText = target.innerText.replace(/\s+/g, ' ').trim()
    const fullText = `${titleText}${bodyText}`

    const utterance = new SpeechSynthesisUtterance(fullText)
    utterance.rate = speechRate
    utterance.lang = 'en-US'

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
    setIsPaused(false)
  }

  const handlePauseSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsSpeaking(false)
  }

  const handleStopSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  const handleSpeedChange = (rate: number) => {
    setSpeechRate(rate)
    if (isSpeaking && !isPaused) {
      handleStopSpeech()
      setTimeout(() => handlePlaySpeech(), 100)
    }
  }

  const bookmarked = noteId ? isBookmarked(noteId) : false

  if (!mounted) return null

  return createPortal(
    <>
      {/* ── Left-Center Floating Icon-Only Tools Trigger Button ── */}
      <aside className="a11y-floating-anchor" aria-label="Reading tools & accessibility">
        <button
          type="button"
          className={`a11y-trigger-btn ${isOpen ? 'is-open' : ''} ${isSpeaking ? 'is-speaking' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          title="Reading Tools & Accessibility (Document Mode, Text-to-Speech, Zoom, Font Size, Dictionary)"
          aria-label="Reading Tools & Accessibility"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <span className="a11y-trigger-btn__icon" aria-hidden="true">
            {isSpeaking ? '🔊' : '🛠️'}
          </span>
        </button>
      </aside>

      {/* ── Accessibility & Reader Modal / Drawer ── */}
      {isOpen && (
        <div
          className="a11y-modal-backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
        >
          <section
            className="a11y-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-dialog-title"
          >
            <header className="a11y-modal-header">
              <div className="a11y-modal-header__title">
                <span aria-hidden="true">🛠️</span>
                <h3 id="a11y-dialog-title">Reading Tools & Accessibility</h3>
              </div>
              <button
                type="button"
                className="a11y-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close reading tools"
              >
                ×
              </button>
            </header>

            <div className="a11y-modal-body">
              {/* Quick Actions (Dictionary & Bookmark) */}
              {(onOpenDictionary || noteId) && (
                <div className="a11y-section">
                  <div className="a11y-section__header">
                    <span className="a11y-section__icon" aria-hidden="true">⚡</span>
                    <span className="a11y-section__label">Quick Actions</span>
                  </div>
                  <div className="a11y-segmented">
                    {onOpenDictionary && (
                      <button
                        type="button"
                        className="a11y-btn"
                        onClick={() => {
                          setIsOpen(false)
                          onOpenDictionary()
                        }}
                        title="Search Economics Dictionary & Terms"
                      >
                        📖 Economics Dictionary
                      </button>
                    )}
                    {noteId && (
                      <button
                        type="button"
                        className={`a11y-btn ${bookmarked ? 'is-active' : ''}`}
                        onClick={() => toggleBookmark(noteId)}
                        title={bookmarked ? 'Remove Bookmark' : 'Save this Note'}
                      >
                        {bookmarked ? '★ Saved in Bookmarks' : '☆ Save Note'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 1. View as Document */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">📄</span>
                  <span className="a11y-section__label">Document Layout</span>
                </div>
                <div className="a11y-segmented">
                  <button
                    type="button"
                    className={`a11y-btn ${isDocMode ? 'is-active' : ''}`}
                    onClick={handleToggleDocMode}
                    title="Toggle A4 Document / Paper view with clean margins and page borders"
                  >
                    {isDocMode ? '✓ View as Document (Active)' : '📄 View as Document'}
                  </button>
                  <button
                    type="button"
                    className="a11y-btn"
                    onClick={() => window.print()}
                    title="Print article or save as PDF document"
                  >
                    🖨️ Export PDF / Print
                  </button>
                </div>
              </div>

              {/* 2. Classroom & Smart-Board Mode */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">🖥️</span>
                  <span className="a11y-section__label">Classroom &amp; Smart-Board</span>
                </div>
                <div className="a11y-segmented">
                  <button
                    type="button"
                    className={`a11y-btn ${isSmartboard ? 'is-active' : ''}`}
                    onClick={toggleSmartboard}
                    title="Maximize width and scale typography for smart-boards and projectors"
                  >
                    {isSmartboard ? '✓ Smart-Board Mode (Active)' : '🖥️ Smart-Board Mode'}
                  </button>
                  <button
                    type="button"
                    className="a11y-btn"
                    onClick={toggleFullscreen}
                    title="Toggle full screen projection"
                  >
                    ⛶ Fullscreen
                  </button>
                </div>
              </div>

              {/* 2. Read Aloud (Text to Speech) */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">🔊</span>
                  <span className="a11y-section__label">Read Aloud (Text-to-Speech)</span>
                </div>
                <div className="a11y-tts-controls">
                  {!isSpeaking && !isPaused && (
                    <button
                      type="button"
                      className="a11y-btn a11y-btn--primary"
                      onClick={handlePlaySpeech}
                      title="Read this note aloud"
                    >
                      ▶️ Play Speech
                    </button>
                  )}

                  {isSpeaking && (
                    <button
                      type="button"
                      className="a11y-btn"
                      onClick={handlePauseSpeech}
                      title="Pause speech"
                    >
                      ⏸️ Pause
                    </button>
                  )}

                  {isPaused && (
                    <button
                      type="button"
                      className="a11y-btn a11y-btn--primary"
                      onClick={handlePlaySpeech}
                      title="Resume speech"
                    >
                      ▶️ Resume
                    </button>
                  )}

                  {(isSpeaking || isPaused) && (
                    <button
                      type="button"
                      className="a11y-btn"
                      onClick={handleStopSpeech}
                      title="Stop reading"
                    >
                      ⏹️ Stop
                    </button>
                  )}

                  {/* Speed Selector */}
                  <div className="a11y-tts-speed" role="group" aria-label="Speech Speed">
                    {[1, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        className={`a11y-speed-btn ${speechRate === rate ? 'is-active' : ''}`}
                        onClick={() => handleSpeedChange(rate)}
                        title={`Speech speed ${rate}x`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Zoom Controls */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">🔍</span>
                  <span className="a11y-section__label">Page Zoom & Magnification</span>
                </div>
                <div className="a11y-stepper">
                  <button
                    type="button"
                    className="a11y-btn a11y-btn--icon"
                    onClick={() => {
                      const idx = ZOOM_LEVELS.indexOf(zoom)
                      if (idx > 0) handleZoom(ZOOM_LEVELS[idx - 1])
                    }}
                    disabled={zoom <= ZOOM_LEVELS[0]}
                    title="Zoom Out (-10%)"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <span className="a11y-zoom-indicator">{zoom}%</span>
                  <button
                    type="button"
                    className="a11y-btn a11y-btn--icon"
                    onClick={() => {
                      const idx = ZOOM_LEVELS.indexOf(zoom)
                      if (idx < ZOOM_LEVELS.length - 1) handleZoom(ZOOM_LEVELS[idx + 1])
                    }}
                    disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                    title="Zoom In (+10%)"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="a11y-btn a11y-btn--sm"
                    onClick={() => handleZoom(100)}
                    disabled={zoom === 100}
                    title="Reset zoom to 100%"
                  >
                    Reset (100%)
                  </button>
                </div>
              </div>

              {/* 4. Font Size */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">🔠</span>
                  <span className="a11y-section__label">Text Sizing</span>
                </div>
                <div className="a11y-segmented">
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'small' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('small')}
                    title="Small text"
                  >
                    A- (Small)
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'normal' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('normal')}
                    title="Default normal text"
                  >
                    A (Default)
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'large' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('large')}
                    title="Large readable text"
                  >
                    A+ (Large)
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'xlarge' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('xlarge')}
                    title="Extra large text"
                  >
                    A++ (X-Large)
                  </button>
                </div>
              </div>

              {/* 5. Typography Font Family */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">🖋️</span>
                  <span className="a11y-section__label">Font Style</span>
                </div>
                <div className="a11y-segmented">
                  <button
                    type="button"
                    className={`a11y-btn ${fontFamily === 'default' ? 'is-active' : ''}`}
                    onClick={() => handleFontFamily('default')}
                    title="System default font"
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontFamily === 'serif' ? 'is-active' : ''}`}
                    onClick={() => handleFontFamily('serif')}
                    title="Book Serif (Editorial textbook font)"
                  >
                    📖 Book Serif
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontFamily === 'dyslexic' ? 'is-active' : ''}`}
                    onClick={() => handleFontFamily('dyslexic')}
                    title="Dyslexic friendly / High Legibility font"
                  >
                    📝 High Legibility
                  </button>
                </div>
              </div>

              {/* 6. Reading Themes */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__icon" aria-hidden="true">🎨</span>
                  <span className="a11y-section__label">Color & Reading Theme</span>
                </div>
                <div className="a11y-segmented">
                  <button
                    type="button"
                    className={`a11y-btn ${theme === 'light' ? 'is-active' : ''}`}
                    onClick={() => setTheme('light')}
                    title="Light / Paper White theme"
                  >
                    ☀️ Light
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${theme === 'warm' ? 'is-active' : ''}`}
                    onClick={() => setTheme('warm')}
                    title="Warm Sepia Eye-Comfort theme"
                  >
                    📖 Warm Sepia
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${theme === 'dark' ? 'is-active' : ''}`}
                    onClick={() => setTheme('dark')}
                    title="Dark Slate Night theme"
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>
            </div>

            <footer className="a11y-modal-footer">
              <span>Preferences are automatically saved.</span>
              <button
                type="button"
                className="a11y-btn a11y-btn--sm"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </>,
    document.body
  )
}
