import { useEffect, useState } from 'react'

const PROGRESS_STORAGE_KEY = 'learn:completed-lessons'

function getStoredProgress(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function useLessonProgress() {
  const [completed, setCompleted] = useState<string[]>(getStoredProgress)

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completed))
    } catch {
      // Ignore localStorage errors
    }
  }, [completed])

  const toggleLesson = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const isCompleted = (id: string) => completed.includes(id)

  const getUnitProgress = (lessonIds: string[]) => {
    if (lessonIds.length === 0) return { completed: 0, total: 0, percent: 0 }
    const done = lessonIds.filter((id) => completed.includes(id)).length
    return {
      completed: done,
      total: lessonIds.length,
      percent: Math.round((done / lessonIds.length) * 100),
    }
  }

  return { completed, toggleLesson, isCompleted, getUnitProgress }
}
