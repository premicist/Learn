import { useEffect, useState } from 'react'

const BOOKMARKS_STORAGE_KEY = 'learn:bookmarks'

function getStoredBookmarks(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(getStoredBookmarks)

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks))
    } catch {
      // Ignore localStorage errors
    }
  }, [bookmarks])

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  return { bookmarks, toggleBookmark, isBookmarked }
}
