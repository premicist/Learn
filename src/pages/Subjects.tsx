import { levels, getSubjectsByLevel } from '../data/levels'
import SubjectCard from '../components/SubjectCard'
import Seo from '../components/Seo'

function Subjects() {
  return (
    <section>
      <Seo title="Economics subjects | Prem Pokhrel" description="Explore economics subjects organized by school, bachelor’s, and master’s level." />
      <h2>All Subjects</h2>
      <p>Every subject, grouped by level.</p>

      {levels.map((level) => {
        const levelSubjects = getSubjectsByLevel(level.id)
        if (levelSubjects.length === 0) return null

        return (
          <div className="level-group" key={level.id}>
            <h3 className="level-group__title">{level.title}</h3>
            <div className="subjects-grid">
              {levelSubjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Subjects
