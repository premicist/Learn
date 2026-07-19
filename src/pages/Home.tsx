import { Link } from 'react-router'
import { levels, getSubjectsByLevel } from '../data/levels'
import LevelCard from '../components/LevelCard'

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Class 11 &amp; 12 · Bachelor&apos;s · Master&apos;s</span>
          <h1>
            Where supply meets <em>understanding</em>.
          </h1>
          <p>
            Notes, articles, quizzes, and videos in economics — built for students pursuing class 11-12,
            bachelor&apos;s and master&apos;s level coursework.
          </p>
          <div className="hero-actions">
            <Link to="/subjects" className="hero-cta">
              Browse all subjects
            </Link>
            <Link to="/notes" className="hero-secondary">
              Jump straight to notes →
            </Link>
          </div>
        </div>

        <div className="hero-graphic" aria-hidden="true">
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            {/* axes */}
            <line x1="40" y1="20" x2="40" y2="260" stroke="var(--ink-faint)" strokeWidth="1.5" />
            <line x1="40" y1="260" x2="370" y2="260" stroke="var(--ink-faint)" strokeWidth="1.5" />
            <text x="46" y="24" className="curve-label">
              Price
            </text>
            <text x="330" y="278" className="curve-label">
              Quantity
            </text>

            {/* demand curve: downward sloping */}
            <path
              className="curve-path curve-path--demand"
              d="M 60 50 C 140 90, 220 150, 340 230"
            />
            {/* supply curve: upward sloping */}
            <path
              className="curve-path curve-path--supply"
              d="M 60 230 C 140 170, 220 110, 340 50"
            />

            <circle className="curve-point" cx="200" cy="140" r="5" />
            <line
              className="curve-point"
              x1="200"
              y1="140"
              x2="200"
              y2="260"
              stroke="var(--ink-faint)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              className="curve-point"
              x1="40"
              y1="140"
              x2="200"
              y2="140"
              stroke="var(--ink-faint)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text x="206" y="132" className="curve-label" fontWeight="600">
              E
            </text>
            <text x="346" y="234" className="curve-label" fill="var(--teal)" fontWeight="600">
              D
            </text>
            <text x="346" y="54" className="curve-label" fill="var(--gold)" fontWeight="600">
              S
            </text>
          </svg>
        </div>
      </section>

      <section>
        <span className="eyebrow">Your curriculum, in order</span>
        <h2>Choose your level</h2>
        <p>Pick where you are in your studies to see relevant subjects.</p>
        <div className="levels-grid">
          {levels.map((level, index) => (
            <LevelCard
              key={level.id}
              level={level}
              subjectCount={getSubjectsByLevel(level.id).length}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
