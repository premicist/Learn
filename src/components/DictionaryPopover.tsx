import { useEffect, useRef, useState } from 'react'
import {
  findLocalDefinition,
  fetchOnlineDefinition,
  type DictionaryEntry,
} from '../data/dictionary'

type DictionaryPopoverProps = {
  isOpen: boolean
  initialQuery?: string
  position?: { x: number; y: number } | null
  onClose: () => void
}

export default function DictionaryPopover({
  isOpen,
  initialQuery = '',
  position = null,
  onClose,
}: DictionaryPopoverProps) {
  const [query, setQuery] = useState(initialQuery)
  const [entry, setEntry] = useState<DictionaryEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      lookupWord(initialQuery)
    }
  }, [initialQuery])

  useEffect(() => {
    if (isOpen && !initialQuery) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [isOpen, initialQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const lookupWord = async (word: string) => {
    const trimmed = word.trim()
    if (!trimmed) {
      setEntry(null)
      setNotFound(false)
      return
    }

    setLoading(true)
    setNotFound(false)

    // 1. Check local economics glossary first (instant)
    const local = findLocalDefinition(trimmed)
    if (local) {
      setEntry(local)
      setLoading(false)
      return
    }

    // 2. Fall back to online dictionary API for general English words
    const online = await fetchOnlineDefinition(trimmed)
    if (online) {
      setEntry(online)
      setNotFound(false)
    } else {
      setEntry(null)
      setNotFound(true)
    }
    setLoading(false)
  }

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) return null

  // On desktop, if position is given, calculate smart placement; on mobile, center/bottom-sheet
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
  const popoverStyle: React.CSSProperties =
    position && !isMobile
      ? {
          position: 'fixed',
          top: Math.min(position.y + 16, window.innerHeight - 280),
          left: Math.max(16, Math.min(position.x - 140, window.innerWidth - 340)),
          zIndex: 1100,
        }
      : {}

  return (
    <div
      className={`dictionary-backdrop ${isMobile ? 'dictionary-backdrop--mobile' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Economics Dictionary"
    >
      <div className="dictionary-card" style={popoverStyle}>
        <div className="dictionary-card__header">
          <div className="dictionary-card__title-row">
            <span className="dictionary-card__icon" aria-hidden="true">📖</span>
            <strong>Quick Dictionary &amp; Glossary</strong>
          </div>
          <button
            type="button"
            className="dictionary-card__close"
            onClick={onClose}
            aria-label="Close dictionary"
          >
            ✕
          </button>
        </div>

        <form
          className="dictionary-card__search"
          onSubmit={(e) => {
            e.preventDefault()
            lookupWord(query)
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Type any word or concept…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="dictionary-card__search-btn">
            Search
          </button>
        </form>

        {loading && (
          <div className="dictionary-card__loading">
            <span>Looking up definition…</span>
          </div>
        )}

        {!loading && entry && (
          <div className="dictionary-card__content">
            <div className="dictionary-card__word-row">
              <h3>{entry.title}</h3>
              <button
                type="button"
                className="dictionary-speak-btn"
                onClick={() => handleSpeak(entry.title)}
                title="Pronounce word"
                aria-label="Listen to pronunciation"
              >
                🔊
              </button>
              {entry.phonetic && <span className="dictionary-phonetic">{entry.phonetic}</span>}
              <span className="dictionary-badge">{entry.category}</span>
            </div>

            {entry.nepali && (
              <p className="dictionary-nepali">
                <strong>नेपाली अर्थ:</strong> {entry.nepali}
              </p>
            )}

            <p className="dictionary-definition">{entry.definition}</p>

            {entry.example && (
              <div className="dictionary-example">
                <strong>Example:</strong>
                <p>{entry.example}</p>
              </div>
            )}
          </div>
        )}

        {!loading && notFound && (
          <div className="dictionary-card__empty">
            <p>No definition found for &ldquo;{query}&rdquo;.</p>
            <small>Try checking the spelling or typing a related economics keyword.</small>
          </div>
        )}
      </div>
    </div>
  )
}
