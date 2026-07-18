import { NavLink } from 'react-router'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <NavLink to="/">EduSite</NavLink>
      </div>

      <nav className="navbar__links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/subjects" className={({ isActive }) => (isActive ? 'active' : '')}>
          Subjects
        </NavLink>
        <NavLink to="/notes" className={({ isActive }) => (isActive ? 'active' : '')}>
          Notes
        </NavLink>
        <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'active' : '')}>
          Blogs
        </NavLink>
        <NavLink to="/quizzes" className={({ isActive }) => (isActive ? 'active' : '')}>
          Quizzes
        </NavLink>
        <NavLink to="/videos" className={({ isActive }) => (isActive ? 'active' : '')}>
          Videos
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar