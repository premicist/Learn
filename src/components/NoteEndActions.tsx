import { useState } from 'react'
import { useBookmarks } from '../utils/useBookmarks'
import { useLessonProgress } from '../utils/useLessonProgress'

type NoteEndActionsProps = {
  noteId: string
  title: string
  summary?: string
}

export default function NoteEndActions({ noteId, title, summary }: NoteEndActionsProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { isCompleted, toggleLesson } = useLessonProgress()
  const [copied, setCopied] = useState(false)

  const bookmarked = isBookmarked(noteId)
  const completed = isCompleted(noteId)

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleShare = async () => {
    if (typeof window === 'undefined') return

    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary || title,
          url: shareUrl,
        })
        return
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      } catch {
        // clipboard write fallback
      }
    }
  }

  return (
    <div className="note-end-actions" role="region" aria-label="Note actions">
      <div className="note-end-actions__group">
        {/* 1. Bookmark */}
        <button
          type="button"
          onClick={() => toggleBookmark(noteId)}
          className={`note-end-action-btn ${bookmarked ? 'note-end-action-btn--active note-end-action-btn--bookmark' : ''}`}
          aria-pressed={bookmarked}
          title={bookmarked ? 'Remove from bookmarks' : 'Save note to bookmarks'}
        >
          <svg
            className="note-end-action-btn__icon"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>

        {/* 2. Print */}
        <button
          type="button"
          onClick={handlePrint}
          className="note-end-action-btn"
          title="Print or save as PDF"
        >
          <svg
            className="note-end-action-btn__icon"
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
          <span>Print Note</span>
        </button>

        {/* 3. Mark Complete */}
        <button
          type="button"
          onClick={() => toggleLesson(noteId)}
          className={`note-end-action-btn ${completed ? 'note-end-action-btn--active note-end-action-btn--complete' : ''}`}
          aria-pressed={completed}
          title={completed ? 'Completed! Click to mark incomplete' : 'Mark this note as completed'}
        >
          <svg
            className="note-end-action-btn__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{completed ? 'Completed' : 'Mark Complete'}</span>
        </button>

        {/* 4. Share */}
        <button
          type="button"
          onClick={handleShare}
          className={`note-end-action-btn ${copied ? 'note-end-action-btn--active note-end-action-btn--copied' : ''}`}
          title="Share note link"
        >
          {copied ? (
            <svg
              className="note-end-action-btn__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              className="note-end-action-btn__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          )}
          <span>{copied ? 'Link Copied!' : 'Share Note'}</span>
        </button>
      </div>
    </div>
  )
}
