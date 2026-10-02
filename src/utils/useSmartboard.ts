import { useEffect, useState } from 'react'

const SMARTBOARD_STORAGE_KEY = 'learn:smartboard-mode'

export function getStoredSmartboardMode(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(SMARTBOARD_STORAGE_KEY) === 'true'
}

export function useSmartboard() {
  const [isSmartboard, setIsSmartboard] = useState<boolean>(getStoredSmartboardMode)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isSmartboard) {
      document.documentElement.setAttribute('data-display-mode', 'smartboard')
      try {
        localStorage.setItem(SMARTBOARD_STORAGE_KEY, 'true')
      } catch {
        // ignore storage errors
      }
    } else {
      document.documentElement.removeAttribute('data-display-mode')
      try {
        localStorage.setItem(SMARTBOARD_STORAGE_KEY, 'false')
      } catch {
        // ignore storage errors
      }
    }
  }, [isSmartboard])

  const toggleSmartboard = () => {
    setIsSmartboard((prev) => !prev)
  }

  const toggleFullscreen = () => {
    if (typeof window === 'undefined' || !document.documentElement) return
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }

  return {
    isSmartboard,
    toggleSmartboard,
    toggleFullscreen,
  }
}
