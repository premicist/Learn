import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { notes, quizzes, practiceSets, videos, blogPosts } from '../data/content'
import { subjects, getSubjectById } from '../data/levels'

type SearchItem = {
  id: string
  type: 'Note' | 'Quiz' | 'Practice' | 'Video' | 'Blog' | 'Subject'
  title: string
  subtitle: string
  url: string
}

type QuickSearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Open handled by Navbar/App
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = []

    subjects.forEach((s) => {
      items.push({
        id: `subject-${s.id}`,
        type: 'Subject',
        title: s.title,
        subtitle: s.description,
        url: `/subjects/${s.id}`,
      })
    })

    notes.forEach((n) => {
      const s = getSubjectById(n.subjectId)
      items.push({
        id: `note-${n.id}`,
        type: 'Note',
        title: n.title,
        subtitle: `${s?.title ? s.title + ' · ' : ''}${n.summary}`,
        url: `/notes/${n.id}`,
      })
    })

    quizzes.forEach((q) => {
      const s = getSubjectById(q.subjectId)
      items.push({
        id: `quiz-${q.id}`,
        type: 'Quiz',
        title: q.title,
        subtitle: `${s?.title ? s.title + ' · ' : ''}${q.questions.length} questions`,
        url: `/quizzes/${q.id}`,
      })
    })

    practiceSets.forEach((p) => {
      const s = getSubjectById(p.subjectId)
      items.push({
        id: `practice-${p.id}`,
        type: 'Practice',
        title: p.title,
        subtitle: `${s?.title ? s.title + ' · ' : ''}${p.questions.length} problems`,
        url: `/practice-sets/${p.id}`,
      })
    })

    videos.forEach((v) => {
      items.push({
        id: `video-${v.id}`,
        type: 'Video',
        title: v.title,
        subtitle: v.description,
        url: `/videos/${v.id}`,
      })
    })

    blogPosts.forEach((b) => {
      items.push({
        id: `blog-${b.id}`,
        type: 'Blog',
        title: b.title,
        subtitle: b.excerpt,
        url: `/blogs/${b.id}`,
      })
    })

    return items
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allItems.slice(0, 8)
    return allItems
      .filter((item) =>
        `${item.title} ${item.subtitle}`.toLowerCase().includes(q)
      )
      .slice(0, 20)
  }, [allItems, query])

  if (!isOpen) return null

  return (
    <div
      className="quick-search-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Search"
    >
      <div className="quick-search-dialog">
        <div className="quick-search-header">
          <span aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="search"
            className="quick-search-input"
            placeholder="Search notes, topics, quizzes, formulas… (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="quick-search-close"
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <div className="quick-search-results">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="quick-search-item"
                onClick={onClose}
              >
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </div>
                <span className="quick-search-item__type">{item.type}</span>
              </Link>
            ))
          ) : (
            <p className="quick-search-empty">
              No results found for &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
