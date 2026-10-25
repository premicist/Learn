import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'learn:whiteboard-scene'

function getStoredScene(): { elements: any[]; appState?: { viewBackgroundColor?: string } } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.elements)) {
      return null
    }
    // Only return clean, safe elements and background color
    return {
      elements: parsed.elements,
      appState: parsed.appState?.viewBackgroundColor
        ? { viewBackgroundColor: parsed.appState.viewBackgroundColor }
        : undefined,
    }
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
    if (stored) {
      setInitialData(stored)
    }
  }, [])

  const handleChange = (elements: readonly any[], appState: any) => {
    if (saveRef.current) clearTimeout(saveRef.current)
    saveRef.current = setTimeout(() => {
      try {
        // Excalidraw's appState has hundreds of non-serializable / transient fields.
        // We ONLY store the elements array and viewBackgroundColor to guarantee zero crashes on reload.
        const safePayload = {
          elements: Array.isArray(elements) ? elements : [],
          appState: appState?.viewBackgroundColor
            ? { viewBackgroundColor: appState.viewBackgroundColor }
            : undefined,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safePayload))
      } catch {
        // quota exceeded or storage error — ignore
      }
    }, DEBOUNCE_MS)
  }

  const clearCanvas = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setInitialData({ elements: [] })
  }

  return { initialData, handleChange, clearCanvas }
}
