import { useParams, Link } from 'react-router'
import { getLevelById, getSubjectsByLevel } from '../data/levels'
import SubjectCard from '../components/SubjectCard'

function LevelDetails() {
  const { levelId } = useParams()
  const level = levelId ? getLevelById(levelId) : undefined

  if (!level) {
    return (
      <section>
        <h2>Level not found</h2>
        <Link to="/">Back to Home</Link>
      </section>
    )
  }

  const subjectsForLevel = getSubjectsByLevel(level.id)

  return (
    <section>
      <h2>{level.title}</h2>
      <p>{level.description}</p>

      <div className="subjects-grid">
        {subjectsForLevel.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      <Link to="/" className="back-link">
        Back to Home
      </Link>
    </section>
  )
}

export default LevelDetails
