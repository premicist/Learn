import { lazy, Suspense, useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { useTheme } from '../utils/useTheme'
import { useSmartboard } from '../utils/useSmartboard'
const QuickSearchModal = lazy(() => import('./QuickSearchModal'))

const links = [
  { to: '/', label: 'Home', icon: '🏠', end: true },
  { to: '/subjects', label: 'Subjects', icon: '📚' },
  { to: '/notes', label: 'Notes', icon: '📝' },
  { to: '/whiteboard', label: 'Whiteboard', icon: '🎨' },
  { to: '/quizzes', label: 'Quizzes', icon: '❓' },
  { to: '/practice-sets', label: 'Practice', icon: '💪' },
  { to: '/blogs', label: 'Blogs', icon: '✍️' },
  { to: '/videos', label: 'Videos', icon: '▶️' },
  { to: '/about', label: 'About', icon: 'ℹ️' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, toggleNextTheme } = useTheme()
  const { isSmartboard, toggleSmartboard } = useSmartboard()

  // Handle global keyboard shortcuts
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
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSmartboard, isOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          {/* Brand */}
          <div className="navbar__brand">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Prem Pokhrel <span className="navbar__brand-mark">ECON</span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="navbar__desktop-nav" aria-label="Main navigation">
            <ul className="navbar__nav-list">
              {links.filter((l) => !l.end).map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `navbar__nav-link ${isActive ? 'is-active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions & Mobile Hamburger */}
          <div className="navbar__actions">
            {/* Quick Search */}
            <button
              type="button"
              className="navbar__action-btn navbar__action-btn--search"
              onClick={() => setIsSearchOpen(true)}
              title="Search (Ctrl+K)"
              aria-label="Open search dialog"
            >
              <span className="navbar__action-icon">🔍</span>
              <span className="navbar__action-label">Search</span>
              <kbd className="navbar__kbd" aria-hidden="true">Ctrl K</kbd>
            </button>

            {/* Smartboard Toggle (Desktop) */}
            <button
              type="button"
              className={`navbar__action-btn navbar__action-btn--board ${isSmartboard ? 'is-active' : ''}`}
              onClick={toggleSmartboard}
              title={isSmartboard ? 'Exit Smart-board Mode (Alt+B)' : 'Smart-board Presentation Mode (Alt+B)'}
              aria-label="Toggle Smart-board Presentation Mode"
              aria-pressed={isSmartboard}
            >
              <span className="navbar__action-icon">🖥️</span>
              <span className="navbar__action-label">Board</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="navbar__action-btn navbar__action-btn--theme"
              onClick={toggleNextTheme}
              title={`Switch Theme: currently ${theme}`}
              aria-label={`Switch theme, currently ${theme}`}
            >
              <span className="navbar__action-icon">
                {theme === 'dark' ? '🌙' : theme === 'warm' ? '📖' : '☀️'}
              </span>
              <span className="navbar__action-label">
                {theme === 'dark' ? 'Dark' : theme === 'warm' ? 'Warm' : 'Light'}
              </span>
            </button>

            {/* Mobile Hamburger Toggle (Right Aligned) */}
            <button
              type="button"
              className="navbar__mobile-toggle"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`navbar__hamburger ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <nav
        id="mobile-navigation"
        className={`navbar__mobile-menu ${isOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className="navbar__mobile-list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `navbar__mobile-link ${isActive ? 'is-active' : ''}`}
              >
                <span className="navbar__mobile-link-icon" aria-hidden="true">{link.icon}</span>
                <span className="navbar__mobile-link-text">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__mobile-footer">
          <button
            type="button"
            className={`navbar__mobile-footer-btn ${isSmartboard ? 'is-active' : ''}`}
            onClick={() => {
              toggleSmartboard()
              setIsOpen(false)
            }}
          >
            <span>🖥️ Smartboard Mode</span>
            <span className="navbar__mobile-status-tag">{isSmartboard ? 'ON' : 'OFF'}</span>
          </button>
          <div className="navbar__mobile-hint">
            <span>Prem Pokhrel Economics</span>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="navbar__mobile-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {isSearchOpen && (
        <Suspense fallback={null}>
          <QuickSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </Suspense>
      )}
    </>
  )
}

export default Navbar
