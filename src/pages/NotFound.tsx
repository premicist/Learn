import { Link } from 'react-router'
import Seo from '../components/Seo'

function NotFound() {
  return (
    <section className="not-found">
      <Seo title="Page not found | Prem Pokhrel" description="The requested economics learning page could not be found." />
      <span className="eyebrow">404</span>
      <h2>That page is not in the syllabus.</h2>
      <p>The link may be outdated, or the resource may have moved.</p>
      <div className="hero-actions">
        <Link to="/" className="hero-cta">Go home</Link>
        <Link to="/subjects" className="hero-secondary">Browse subjects →</Link>
      </div>
    </section>
  )
}

export default NotFound
