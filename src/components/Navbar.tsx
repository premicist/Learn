import { useState } from 'react'
import { NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/subjects', label: 'Subjects' },
  { to: '/notes', label: 'Notes' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/quizzes', label: 'Quizzes' },
  { to: '/videos', label: 'Videos' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          Prem Pokhrel <span className="navbar__brand-mark">ECON</span>
        </NavLink>
      </div>

      <button
        className="navbar__toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <nav className={`navbar__links ${isOpen ? 'is-open' : ''}`}>
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
  )
}

export default Navbar
