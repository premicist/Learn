import { useEffect, useState } from 'react'
import { useTheme } from '../utils/useTheme'
import { useBookmarks } from '../utils/useBookmarks'

export type FontSize = 'small' | 'normal' | 'large' | 'xlarge'

const FONT_SIZE_STORAGE_KEY = 'learn:note-font-size'

type ReadingToolbarProps = {
  noteId: string
  fontSize: FontSize
  onFontSizeChange: (size: FontSize) => void
  onOpenDictionary?: () => void
}

export default function ReadingToolbar({
  noteId,
  fontSize,
  onFontSizeChange,
  onOpenDictionary,
}: ReadingToolbarProps) {
  const { theme, setTheme } = useTheme()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) {
        setScrollProgress(0)
        return
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bookmarked = isBookmarked(noteId)

  return (
    <>
      <div className="reading-progress-bar" aria-hidden="true">
        <div className="reading-progress-bar__fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="reading-toolbar" role="toolbar" aria-label="Reading Controls">
        <div className="reading-toolbar__group">
          <span className="reading-toolbar__label">Text Size:</span>
          <button
            type="button"
            className={`reading-toolbar__btn ${fontSize === 'small' ? 'is-active' : ''}`}
            onClick={() => onFontSizeChange('small')}
            title="Small text"
            aria-label="Small font size"
          >
            A-
          </button>
          <button
            type="button"
            className={`reading-toolbar__btn ${fontSize === 'normal' ? 'is-active' : ''}`}
            onClick={() => onFontSizeChange('normal')}
            title="Default text"
            aria-label="Default font size"
          >
            A
          </button>
          <button
            type="button"
            className={`reading-toolbar__btn ${fontSize === 'large' ? 'is-active' : ''}`}
            onClick={() => onFontSizeChange('large')}
            title="Large text"
            aria-label="Large font size"
          >
            A+
          </button>
          <button
            type="button"
            className={`reading-toolbar__btn ${fontSize === 'xlarge' ? 'is-active' : ''}`}
            onClick={() => onFontSizeChange('xlarge')}
            title="Extra large text"
            aria-label="Extra large font size"
          >
            A++
          </button>
        </div>

        <div className="reading-toolbar__group">
          <span className="reading-toolbar__label">Theme:</span>
          <button
            type="button"
            className={`reading-toolbar__btn ${theme === 'light' ? 'is-active' : ''}`}
            onClick={() => setTheme('light')}
            title="Light Theme"
          >
            ☀️ Light
          </button>
          <button
            type="button"
            className={`reading-toolbar__btn ${theme === 'warm' ? 'is-active' : ''}`}
            onClick={() => setTheme('warm')}
            title="Eye-Comfort Warm Sepia"
          >
            📖 Warm
          </button>
          <button
            type="button"
            className={`reading-toolbar__btn ${theme === 'dark' ? 'is-active' : ''}`}
            onClick={() => setTheme('dark')}
            title="Night Dark Theme"
          >
            🌙 Dark
          </button>
        </div>

        <div className="reading-toolbar__group">
          {onOpenDictionary && (
            <button
              type="button"
              className="reading-toolbar__btn"
              onClick={onOpenDictionary}
              title="Search Dictionary & Economics Terms"
              aria-label="Open economics dictionary"
            >
              📖 Dictionary
            </button>
          )}
          <button
            type="button"
            className={`note-bookmark-btn ${bookmarked ? 'is-bookmarked' : ''}`}
            onClick={() => toggleBookmark(noteId)}
            aria-pressed={bookmarked}
            title={bookmarked ? 'Remove Bookmark' : 'Save this Note'}
          >
            {bookmarked ? '★ Saved' : '☆ Save Note'}
          </button>
        </div>
      </div>
    </>
  )
}

export function getStoredFontSize(): FontSize {
  if (typeof window === 'undefined') return 'normal'
  const saved = localStorage.getItem(FONT_SIZE_STORAGE_KEY) as FontSize | null
  if (saved && ['small', 'normal', 'large', 'xlarge'].includes(saved)) {
    return saved
  }
  return 'normal'
}

export function persistFontSize(size: FontSize) {
  try {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, size)
  } catch {
    // Ignore localStorage errors
  }
}
