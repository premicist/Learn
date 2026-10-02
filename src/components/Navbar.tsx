import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { useTheme } from '../utils/useTheme'
import { useSmartboard } from '../utils/useSmartboard'
import QuickSearchModal from './QuickSearchModal'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/subjects', label: 'Subjects' },
  { to: '/notes', label: 'Notes' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/practice-sets', label: 'Practice' },
  { to: '/videos', label: 'Videos' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, toggleNextTheme } = useTheme()
  const { isSmartboard, toggleSmartboard } = useSmartboard()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
      if (e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleSmartboard()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSmartboard])

  return (
    <>
      <header className="navbar">
        <div className="navbar__brand">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Prem Pokhrel <span className="navbar__brand-mark">ECON</span>
          </NavLink>
        </div>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-btn"
            onClick={() => setIsSearchOpen(true)}
            title="Search (Ctrl+K)"
            aria-label="Open search dialog"
          >
            <span>🔍</span>
            <span className="navbar__search-hint">Ctrl+K</span>
          </button>

          <button
            type="button"
            className={`navbar__icon-btn ${isSmartboard ? 'is-active navbar__icon-btn--board' : ''}`}
            onClick={toggleSmartboard}
            title={isSmartboard ? 'Exit Smart-board Mode (Alt+B)' : 'Smart-board Presentation Mode (Alt+B)'}
            aria-label="Toggle Smart-board Presentation Mode"
            aria-pressed={isSmartboard}
          >
            <span>🖥️</span>
            <span className="navbar__mode-text">{isSmartboard ? 'Board On' : 'Board'}</span>
          </button>

          <button
            type="button"
            className="navbar__icon-btn"
            onClick={toggleNextTheme}
            title={`Theme: ${theme} (Click to switch)`}
            aria-label={`Switch theme, currently ${theme}`}
          >
            <span>{theme === 'dark' ? '🌙' : theme === 'warm' ? '📖' : '☀️'}</span>
          </button>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="primary-navigation" className={`navbar__links ${isOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

export default Navbar
