import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'warm'

const THEME_STORAGE_KEY = 'learn.theme'

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
  if (saved && (saved === 'light' || saved === 'dark' || saved === 'warm')) {
    return saved
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  if (theme === 'light') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore localStorage errors in private mode
    }
  }, [theme])

  const toggleNextTheme = () => {
    setTheme((current) => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'warm'
      return 'light'
    })
  }

  return { theme, setTheme, toggleNextTheme }
}
