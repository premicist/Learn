import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { useTheme } from '../utils/useTheme'
import { useSmartboard } from '../utils/useSmartboard'
import QuickSearchModal from './QuickSearchModal'

const links = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/subjects', label: 'Subjects', icon: '📚' },
  { to: '/notes', label: 'Notes', icon: '📝' },
  { to: '/whiteboard', label: 'Whiteboard', icon: '🎨' },
  { to: '/blogs', label: 'Blogs', icon: '✍️' },
  { to: '/quizzes', label: 'Quizzes', icon: '❓' },
  { to: '/practice-sets', label: 'Practice', icon: '💪' },
  { to: '/videos', label: 'Videos', icon: '▶️' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false) // Default closed
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { theme, toggleNextTheme } = useTheme()
  const { isSmartboard, toggleSmartboard } = useSmartboard()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.querySelector('.navbar-sidebar')
      const toggle = document.querySelector('.navbar__toggle')
      if (sidebar && !sidebar.contains(e.target as Node) && 
          toggle && !toggle.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      {/* Top navigation bar */}
      <header className="navbar">
        <div className="navbar__brand">
          <button
            className="navbar__toggle"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="sidebar-navigation"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          >
            <span className="navbar__toggle-icon" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Prem Pokhrel <span className="navbar__brand-mark">ECON</span>
          </NavLink>
        </div>

        {/* Desktop actions */}
        {!isMobile && (
          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__action-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search (Ctrl+K)"
              aria-label="Open search dialog"
            >
              <span className="navbar__action-icon">🔍</span>
              <span className="navbar__action-label">Search</span>
            </button>
            <button
              type="button"
              className={`navbar__action-btn ${isSmartboard ? 'is-active' : ''}`}
              onClick={toggleSmartboard}
              title={isSmartboard ? 'Exit Smart-board Mode (Alt+B)' : 'Smart-board Presentation Mode (Alt+B)'}
              aria-label="Toggle Smart-board Presentation Mode"
              aria-pressed={isSmartboard}
            >
              <span className="navbar__action-icon">🖥️</span>
              <span className="navbar__action-label">Board</span>
            </button>
            <button
              type="button"
              className="navbar__action-btn"
              onClick={toggleNextTheme}
              title={`Theme: ${theme} (Click to switch)`}
              aria-label={`Switch theme, currently ${theme}`}
            >
              <span className="navbar__action-icon">{theme === 'dark' ? '🌙' : theme === 'warm' ? '📖' : '☀️'}</span>
              <span className="navbar__action-label">{theme === 'dark' ? 'Dark' : theme === 'warm' ? 'Warm' : 'Light'}</span>
            </button>
          </div>
        )}

        {/* Mobile actions */}
        {isMobile && (
          <div className="navbar__mobile-actions">
            <button
              type="button"
              className="navbar__mobile-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search (Ctrl+K)"
              aria-label="Open search dialog"
            >
              🔍
            </button>
            <button
              type="button"
              className={`navbar__mobile-btn ${isSmartboard ? 'is-active' : ''}`}
              onClick={toggleSmartboard}
              title="Smart-board mode"
              aria-label="Toggle Smart-board Presentation Mode"
              aria-pressed={isSmartboard}
            >
              🖥️
            </button>
            <button
              type="button"
              className="navbar__mobile-btn"
              onClick={toggleNextTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : theme === 'warm' ? 'dark' : 'warm'} theme`}
              aria-label={`Switch theme, currently ${theme}`}
            >
              {theme === 'dark' ? '🌙' : theme === 'warm' ? '📖' : '☀️'}
            </button>
          </div>
        )}
      </header>

      {/* Sidebar navigation - slides from left */}
      <aside 
        id="sidebar-navigation"
        className={`navbar-sidebar ${isOpen ? 'is-open' : ''}`}
        aria-label="Navigation menu"
      >
        <nav className="navbar-sidebar__nav">
          <ul className="navbar-sidebar__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `navbar-sidebar__link ${isActive ? 'is-active' : ''}`}
                >
                  <span className="navbar-sidebar__icon" aria-hidden="true">{link.icon}</span>
                  <span className="navbar-sidebar__label">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="navbar-sidebar__footer">
            <p>
              <kbd>Ctrl+K</kbd> Search · <kbd>Alt+B</kbd> Board
            </p>
          </div>
        </nav>
      </aside>

      {/* Overlay - visible on all screen sizes when sidebar is open */}
      {isOpen && (
        <div 
          className="navbar__overlay" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

export default Navbar