import { useParams, Link } from 'react-router'
import { getLevelById, getSubjectsByLevel } from '../data/levels'
import SubjectCard from '../components/SubjectCard'
import Seo from '../components/Seo'

function LevelDetails() {
  const { levelId } = useParams()
  const level = levelId ? getLevelById(levelId) : undefined

  if (!level) {
    return (
      <section>
        <Seo title="Level not found | Prem Pokhrel" description="The requested economics level could not be found." />
        <h2>Level not found</h2>
        <Link to="/">Back to Home</Link>
      </section>
    )
  }

  const subjectsForLevel = getSubjectsByLevel(level.id)

  return (
    <section>
      <Seo title={`${level.title} | Prem Pokhrel`} description={level.description} />
      <p className="eyebrow">Choose a subject</p>
      <h2>{level.title}</h2>
      <p>{level.description}</p>

      <div className="subjects-grid">
        {subjectsForLevel.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      <Link to="/" className="back-link">
        ← Back to all levels
      </Link>
    </section>
  )
}

export default LevelDetails
