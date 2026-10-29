import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} Prem Pokhrel ECON &mdash; Economics learning resources.</p>
        <p className="footer__note">
          Class 11 & 12 &middot; Bachelor&apos;s &middot; Master&apos;s &middot;{' '}
          <Link to="/teacher" className="footer__teacher-link">
            Teacher View
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
