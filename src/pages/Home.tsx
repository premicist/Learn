import { Link } from 'react-router'
import { levels, getSubjectsByLevel } from '../data/levels'
import LevelCard from '../components/LevelCard'

function Home() {
  return (
    <>
      <section className="hero-section">
        <h1>Learn Economics, One Level at a Time</h1>
        <p>
          Notes, blog articles, quizzes, and videos covering Economics from Class 11 & 12
          through Bachelor's and Master's level.
        </p>
        <Link to="/subjects" className="hero-cta">
          Browse All Subjects
        </Link>
      </section>

      <section>
        <h2>Choose Your Level</h2>
        <p>Pick where you are in your studies to see relevant subjects.</p>
        <div className="levels-grid">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} subjectCount={getSubjectsByLevel(level.id).length} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
