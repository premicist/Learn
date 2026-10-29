import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type FontSize = 'small' | 'normal' | 'large' | 'xlarge'
export type FontFamily = 'default' | 'serif' | 'sans' | 'dyslexic'

const FONT_SIZE_STORAGE_KEY = 'learn:font-size'
const FONT_FAMILY_STORAGE_KEY = 'learn:font-family'
const FOCUS_MODE_STORAGE_KEY = 'learn:doc-mode'

type AccessibilityMenuProps = {
  contentSelector?: string
  contentTitle?: string
  noteId?: string
  onOpenDictionary?: () => void
  onOpenPrint?: () => void
}

/**
 * Extracts clean readable prose for speech synthesis, stripping raw KaTeX math,
 * SVG diagrams, tables, and code snippets that sound chaotic in synthetic voice.
 */
function extractSpeechText(element: HTMLElement, title?: string): string {
  const clone = element.cloneNode(true) as HTMLElement

  // Elements that speech engines should skip for note reading
  const dropSelectors = [
    '.katex',
    '.katex-display',
    '.katex-html',
    '.katex-mathml',
    'svg',
    'pre',
    'code',
    'table',
    '.diagram-card',
    '.note-chart',
    '.note-chart-wrapper',
    '.interactive-card',
    '.interactive-market-curve',
    '.quiz-card',
    '.figure-card__actions',
    '.note-table-hint',
    'button',
    'iframe',
    '.sr-only',
    '[aria-hidden="true"]',
  ]

  for (const selector of dropSelectors) {
    clone.querySelectorAll(selector).forEach((el) => el.remove())
  }

  const rawText = clone.textContent || ''
  const sanitized = rawText
    .replace(/\[\d+\]/g, '') // remove footnote references [1]
    .replace(/[#*_`~]/g, '') // remove markdown markers
    .replace(/\s+/g, ' ')
    .trim()

  const heading = title ? `${title.trim()}. ` : ''
  return `${heading}${sanitized}`.trim()
}

export default function AccessibilityMenu({
  contentSelector = '.note-page__body, .article-page__body',
  contentTitle,
  onOpenDictionary,
  onOpenPrint,
}: AccessibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sizing & typography state
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window === 'undefined') return 'normal'
    return (localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSize) || 'normal'
  })

  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    if (typeof window === 'undefined') return 'default'
    return (localStorage.getItem(FONT_FAMILY_STORAGE_KEY) as FontFamily) || 'default'
  })

  const [isFocusMode, setIsFocusMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(FOCUS_MODE_STORAGE_KEY) === 'true'
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

      // Document / Focus mode
      if (isFocusMode) {
        target.classList.add('is-document-mode')
      } else {
        target.classList.remove('is-document-mode')
      }
    })
  }, [fontSize, fontFamily, isFocusMode, contentSelector])

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // Preference handlers
  const handleFontSize = (size: FontSize) => {
    setFontSize(size)
    try {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, size)
    } catch {}
  }

  const handleFontFamily = (family: FontFamily) => {
    setFontFamily(family)
    try {
      localStorage.setItem(FONT_FAMILY_STORAGE_KEY, family)
    } catch {}
  }

  const handleToggleFocusMode = () => {
    setIsFocusMode((prev) => {
      const next = !prev
      try {
        localStorage.setItem(FOCUS_MODE_STORAGE_KEY, String(next))
      } catch {}
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

    const sanitizedSpeech = extractSpeechText(target, contentTitle)
    if (!sanitizedSpeech) return

    const utterance = new SpeechSynthesisUtterance(sanitizedSpeech)
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

  if (!mounted) return null

  return createPortal(
    <>
      {/* ── Floating Reader Tools Pill Trigger Button ── */}
      <aside className="a11y-floating-anchor no-print" aria-label="Reading tools & accessibility">
        <button
          type="button"
          className={`a11y-trigger-btn ${isOpen ? 'is-open' : ''} ${isSpeaking ? 'is-speaking' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          title="Reading Tools (Text Size, Typography, Focus Mode, Read Aloud)"
          aria-label="Reading Tools & Typography"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <span className="a11y-trigger-glyph" aria-hidden="true">
            {isSpeaking ? '🔊' : 'Aa'}
          </span>
          <span className="a11y-trigger-label">
            {isSpeaking ? 'Reading' : 'Reader'}
          </span>
          {isSpeaking && <span className="a11y-trigger-pulse-dot" aria-hidden="true" />}
        </button>
      </aside>

      {/* ── Reading Tools Modal / Tray ── */}
      {isOpen && (
        <div
          className="a11y-modal-backdrop no-print"
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
                <span className="a11y-modal-header__badge" aria-hidden="true">Aa</span>
                <div>
                  <h3 id="a11y-dialog-title">Reading Tools</h3>
                  <p className="a11y-modal-header__sub">Adjust text, styling, and audio reader</p>
                </div>
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
              {/* 1. Text Sizing */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__label">Text Size</span>
                  <span className="a11y-section__hint">Scales note paragraphs</span>
                </div>
                <div className="a11y-segmented a11y-segmented--grid4">
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'small' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('small')}
                    title="Small text (0.95rem)"
                  >
                    <span className="a11y-btn__preview" style={{ fontSize: '0.82rem' }}>A</span>
                    <span>Small</span>
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'normal' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('normal')}
                    title="Default normal text (1.05rem)"
                  >
                    <span className="a11y-btn__preview" style={{ fontSize: '0.95rem' }}>A</span>
                    <span>Normal</span>
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'large' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('large')}
                    title="Large readable text (1.18rem)"
                  >
                    <span className="a11y-btn__preview" style={{ fontSize: '1.1rem' }}>A</span>
                    <span>Large</span>
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn ${fontSize === 'xlarge' ? 'is-active' : ''}`}
                    onClick={() => handleFontSize('xlarge')}
                    title="Extra large text (1.32rem)"
                  >
                    <span className="a11y-btn__preview" style={{ fontSize: '1.25rem' }}>A</span>
                    <span>X-Large</span>
                  </button>
                </div>
              </div>

              {/* 2. Typography Style */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__label">Typography Style</span>
                  <span className="a11y-section__hint">Font family preference</span>
                </div>
                <div className="a11y-segmented a11y-segmented--grid3">
                  <button
                    type="button"
                    className={`a11y-btn a11y-btn--font-opt ${fontFamily === 'default' ? 'is-active' : ''}`}
                    onClick={() => handleFontFamily('default')}
                    title="Clean Sans-serif font (Manrope)"
                  >
                    <span className="a11y-font-sample" style={{ fontFamily: 'var(--font-body)' }}>Ag</span>
                    <span className="a11y-font-name">Modern Sans</span>
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn a11y-btn--font-opt ${fontFamily === 'serif' ? 'is-active' : ''}`}
                    onClick={() => handleFontFamily('serif')}
                    title="Book Serif font (Fraunces / Editorial)"
                  >
                    <span className="a11y-font-sample" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>Ag</span>
                    <span className="a11y-font-name">Book Serif</span>
                  </button>
                  <button
                    type="button"
                    className={`a11y-btn a11y-btn--font-opt ${fontFamily === 'dyslexic' ? 'is-active' : ''}`}
                    onClick={() => handleFontFamily('dyslexic')}
                    title="Dyslexic-friendly weighted font"
                  >
                    <span className="a11y-font-sample" style={{ fontFamily: '"OpenDyslexic", "Comic Sans MS", sans-serif' }}>Ag</span>
                    <span className="a11y-font-name">High Legibility</span>
                  </button>
                </div>
              </div>

              {/* 3. Focus / Document Reading Mode */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__label">Reading Measure</span>
                  <span className="a11y-section__hint">Card layout &amp; line length</span>
                </div>
                <button
                  type="button"
                  className={`a11y-focus-toggle ${isFocusMode ? 'is-active' : ''}`}
                  onClick={handleToggleFocusMode}
                  title="Toggle distraction-free document frame with optimal 68ch line measure"
                >
                  <div className="a11y-focus-toggle__info">
                    <span className="a11y-focus-toggle__title">
                      {isFocusMode ? '✓ Focused Document Frame (Active)' : 'Distraction-Free Focus Frame'}
                    </span>
                    <span className="a11y-focus-toggle__desc">
                      Centers text in an optimal 68ch measure with paper-card borders.
                    </span>
                  </div>
                  <span className={`a11y-switch ${isFocusMode ? 'is-on' : ''}`} aria-hidden="true">
                    <span className="a11y-switch__knob" />
                  </span>
                </button>
              </div>

              {/* 4. Clean Read Aloud (Text to Speech) */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__label">Read Aloud (Voice)</span>
                  <span className="a11y-section__hint">Filters formulas &amp; SVG noise</span>
                </div>

                <div className="a11y-tts-box">
                  <div className="a11y-tts-actions">
                    {!isSpeaking && !isPaused && (
                      <button
                        type="button"
                        className="a11y-btn a11y-btn--primary"
                        onClick={handlePlaySpeech}
                        title="Listen to this note read aloud"
                      >
                        ▶ Listen to Note
                      </button>
                    )}

                    {isSpeaking && (
                      <button
                        type="button"
                        className="a11y-btn a11y-btn--warning"
                        onClick={handlePauseSpeech}
                        title="Pause voice playback"
                      >
                        ⏸ Pause
                      </button>
                    )}

                    {isPaused && (
                      <button
                        type="button"
                        className="a11y-btn a11y-btn--primary"
                        onClick={handlePlaySpeech}
                        title="Resume voice playback"
                      >
                        ▶ Resume
                      </button>
                    )}

                    {(isSpeaking || isPaused) && (
                      <button
                        type="button"
                        className="a11y-btn"
                        onClick={handleStopSpeech}
                        title="Stop voice playback"
                      >
                        ⏹ Stop
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

                  {isSpeaking && (
                    <div className="a11y-tts-status">
                      <span className="a11y-tts-waveform" aria-hidden="true">
                        <span /><span /><span /><span />
                      </span>
                      <span>Reading text aloud (formulas &amp; diagrams skipped)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Study & Document Actions */}
              <div className="a11y-section">
                <div className="a11y-section__header">
                  <span className="a11y-section__label">Study &amp; Document</span>
                </div>
                <div className="a11y-segmented a11y-segmented--grid2">
                  <button
                    type="button"
                    className="a11y-btn a11y-btn--full"
                    onClick={() => {
                      setIsOpen(false)
                      if (onOpenPrint) onOpenPrint()
                      else window.print()
                    }}
                    title="Print or export note as clean academic PDF with header & watermark"
                  >
                    <span>🖨️ Print Note</span>
                  </button>
                  {onOpenDictionary && (
                    <button
                      type="button"
                      className="a11y-btn a11y-btn--full"
                      onClick={() => {
                        setIsOpen(false)
                        onOpenDictionary()
                      }}
                      title="Search economics terms, equations, and definitions"
                    >
                      <span>📖 Dictionary</span>
                    </button>
                  )}
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
                Done
              </button>
            </footer>
          </section>
        </div>
      )}
    </>,
    document.body
  )
}
