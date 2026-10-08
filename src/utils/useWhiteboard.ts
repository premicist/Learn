import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'learn:whiteboard-scene'

function getStoredScene(): { elements: any[]; appState: any } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useWhiteboard() {
  const [initialData, setInitialData] = useState<any>(null)
  const saveRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const DEBOUNCE_MS = 600

  useEffect(() => {
    const stored = getStoredScene()
    if (stored) setInitialData(stored)
  }, [])

  const handleChange = (elements: any[], appState: any) => {
    if (saveRef.current) clearTimeout(saveRef.current)
    saveRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ elements, appState }))
      } catch {
        // quota exceeded — ignore
      }
    }, DEBOUNCE_MS)
  }

  const clearCanvas = () => {
    localStorage.removeItem(STORAGE_KEY)
    setInitialData(null)
  }

  return { initialData, handleChange, clearCanvas }
}